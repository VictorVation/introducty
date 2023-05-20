import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ChevronLeft } from "lucide-react";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { buttonVariants } from "~/components/ui/button";
import getUser from "~/lib/getUser";
import { cn } from "~/lib/utils";
import { Database } from "~/types/supabase";
import AddLinkCard from "./AddLinkCard";
import { EditorContextProvider } from "./EditorContext";
import LinksPreviewCard from "./LinksPreviewCard";
import SiteDesignCard from "./SiteDesignCard";
import SiteSettingsCard from "./SiteSettingsCard";

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
    .select(
      `site_name, links(id, title, url), design:site_design!sites_design_fkey(background_type, gradient_id, solid, id)`
    )
    .eq("id", siteId)
    .single();

  if (fetchSiteLinksError) {
    console.error(fetchSiteLinksError);
    return notFound();
  }
  const { site_name: siteName } = site;
  const links = Array.isArray(site.links)
    ? site.links
    : site.links != null
    ? [site.links]
    : [];

  const siteDesign = Array.isArray(site.design) ? site.design[0] : site.design;

  return (
    <EditorContextProvider
      solid={siteDesign?.solid}
      backgroundType={siteDesign?.background_type}
      gradientId={siteDesign?.gradient_id}
    >
      <div
        className={
          "mx-auto flex max-w-screen-xl flex-wrap justify-between gap-2 py-20 md:flex-nowrap"
        }
      >
        <div className=" mx-auto grid grid-cols-1 gap-4 xl:grid-cols-2">
          <SiteSettingsCard siteId={siteId} siteName={siteName} />
          {siteDesign && <SiteDesignCard siteDesignId={siteDesign.id} />}
          <AddLinkCard siteId={siteId} links={links} />
        </div>
        <div className="mx-auto">
          <LinksPreviewCard siteName={siteName} links={links}>
            <div className="grid gap-8 p-10 pt-32">
              <h4 className="text-md text-black text-center font-bold">
                {siteName}
              </h4>
              <div className="grid gap-2">
                {links.map((link) => (
                  <Link
                    className={
                      "w-full rounded-lg border bg-slate-50 border-slate-200 text-black p-4 text-center"
                    }
                    key={link.id}
                    href={link.url}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </LinksPreviewCard>
        </div>
      </div>
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
  );
}
