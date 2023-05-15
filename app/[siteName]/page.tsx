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
    <div className={"mt-36 flex min-h-screen flex-col items-center"}>
      <h1 className={"text-2xl font-bold"}>{siteName}</h1>
      <div className="m-8 flex h-full w-96 flex-col justify-center gap-8 overflow-hidden">
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
    </div>
  );
}
