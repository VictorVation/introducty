import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { headers, cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Database } from "~/types/supabase";
import { cn } from "~/lib/utils";
import { GradientIdsType, gradientVariant } from "~/config/gradients";

type Props = {
  params: { siteName: string };
};

export default async function CreatorPage({ params: { siteName } }: Props) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  const { data: site, error: fetchSiteError } = await supabase
    .from("sites")
    .select(
      `site_name, hideBranding, links(id, title, url), design:site_design!sites_design_fkey(background_type, gradient_id, solid, id)`
    )
    .eq("site_name", siteName)
    .single();
  if (fetchSiteError) {
    return notFound();
  }
  const links = Array.isArray(site.links)
    ? site.links
    : site.links != null
    ? [site.links]
    : [];
  const siteDesign = Array.isArray(site.design) ? site.design[0] : site.design;

  const backgroundType = siteDesign?.background_type;
  const solid = siteDesign?.solid;
  const gradientId = siteDesign?.gradient_id;

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center p-24",
        backgroundType === "gradient" &&
          gradientVariant({ gradientId: gradientId as GradientIdsType })
      )}
      style={{
        backgroundColor:
          backgroundType === "solid" && solid != null ? solid : undefined,
      }}
    >
      <h1 className={"text-2xl font-bold"}>{siteName}</h1>
      <div className="m-8 flex h-full w-96 flex-col justify-center gap-4 overflow-hidden">
        {links.map((link) => (
          <Link
            className={"w-full rounded-lg border bg-white p-8 text-center"}
            key={link.id}
            href={link.url}
          >
            {link.title}
          </Link>
        ))}
      </div>
      {site?.hideBranding && (
        <footer className="mt-auto">
          <div className="container bottom-0 mt-8 flex flex-col items-center gap-4 py-10 pb-16 text-sm md:h-24 md:flex-row md:py-0">
            <div className="flex flex-col items-center gap-4 px-8 text-center md:flex-row md:gap-2 md:px-0">
              <p className="text-md text-secondary-foreground sm:inline-block">
                Powered by{" "}
                <Link className="font-semibold underline" href="/">
                  Introducty
                </Link>
                .
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
