import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import getUser from "~/lib/getUser";
import AddLinkCard from "./AddLinkCard";
import LinksPreview from "./LinksPreview";
import { Database } from "~/types/supabase";
import SiteSettingsCard from "./SiteSettingsCard";
import React from "react";
import { EditorContextProvider } from "./EditorContext";

type Props = {
  params: { siteId: string };
};

export default async function Editor({ params }: Props) {
  const authUser = await getUser();
  if (!authUser) {
    redirect("/login");
  }

  const { siteId } = params;
  if (!siteId) {
    redirect("/dashboard");
  }

  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  const { data: site, error: fetchSiteLinksError } = await supabase
    .from("sites")
    .select(`site_name, links(id, title, url)`)
    .eq("id", siteId)
    .single();

  if (fetchSiteLinksError) {
    return notFound();
  }
  const { site_name: siteName } = site;
  const links = Array.isArray(site.links)
    ? site.links
    : site.links != null
    ? [site.links]
    : [];
  return (
    <div
      className={
        "mx-auto grid max-w-screen-lg gap-8 pt-20 md:grid-cols-1 lg:grid-cols-2"
      }
    >
      <EditorContextProvider>
        <SiteSettingsCard siteId={siteId} siteName={siteName} />
        <AddLinkCard siteId={siteId} links={links} />
        <LinksPreview siteName={siteName} links={links} />
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8"
          )}
        >
          <>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
      </EditorContextProvider>
    </div>
  );
}
