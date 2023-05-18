import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { headers, cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Database } from "~/types/supabase";

type Props = {
  params: { siteName: string };
};

export default async function CreatorPage({ params: { siteName } }: Props) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  const { data, error: fetchLinksError } = await supabase
    .from("sites")
    .select("site_name, links(id, title, url)")
    .eq("site_name", siteName)
    .single();
  if (fetchLinksError) {
    return notFound();
  }
  const links = Array.isArray(data.links)
    ? data.links
    : data.links != null
    ? [data.links]
    : [];
  return (
    <div className={"flex min-h-screen flex-col items-center p-24"}>
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
    </div>
  );
}
