import { redirect } from "next/navigation";
import { SiteCreateButton } from "~/app/dashboard/(sites)/SiteCreateButton";
import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { DashboardHeader } from "~/components/DashboardHeader";
import { DashboardShell } from "~/components/DashboardShell";
import { LinkItem } from "~/app/dashboard/(sites)/SiteLinkItem";

import getUser from "~/lib/getUser";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { Database } from "~/types/supabase";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const authUser = await getUser();
  if (!authUser) {
    redirect("/login");
  }

  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  const { data: sites, error: fetchSitesError } = await supabase
    .from("sites")
    .select("created_at, site_name, id, links(count)")
    .eq("creator_id", authUser.id);

  if (fetchSitesError) {
    console.error(fetchSitesError);
    redirect("/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Sites" text="Create and manage your sites.">
        <SiteCreateButton className="" />
      </DashboardHeader>
      <div>
        {sites?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {sites.map((site) => (
              <LinkItem
                key={site.id}
                site={site}
                linkCount={
                  Array.isArray(site?.links)
                    ? site?.links?.[0].count
                    : site?.links?.count
                }
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No sites created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any site yet. Create a site in seconds to
              start sharing your links immediately.
            </EmptyPlaceholder.Description>
            <SiteCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
