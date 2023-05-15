import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import getUser from "~/lib/getUser";
import LinksSetupComponent from "./LinksSetupComponent";
import LinksPreviewComponent from "./LinksPreviewComponent";
import { Site, Link as LinkType, Database } from "~/types/supabase";

type Props = {
  params: { siteId: string };
};

export default async function Setup({ params }: Props) {
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
    .from("Sites")
    .select(`site_name, Links(id, title, url)`)
    .eq("id", siteId)
    .single();

  if (fetchSiteLinksError) {
    return notFound();
  }
  const { site_name: siteName, Links: rawLinks } = site;
  const links = Array.isArray(rawLinks)
    ? rawLinks
    : rawLinks != null
    ? [rawLinks]
    : [];
  return (
    <div className={"grid lg:grid-cols-2 md:grid-cols-1"}>
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
      <LinksSetupComponent siteId={siteId} links={links} />
      <LinksPreviewComponent siteName={siteName} links={links} />
    </div>
  );
}
