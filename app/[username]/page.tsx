import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  params: { username: string };
};

export default async function CreatorPage({ params: { username } }: Props) {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !username) {
    redirect("/");
  }
  const { data: user, error: fetchUsernameError } = await supabase
    .from("Users")
    .select("*")
    .eq("username", username)
    .single();

  if (fetchUsernameError) {
    redirect("/");
  }

  const { data: links, error: fetchLinksError } = await supabase
    .from("Links")
    .select("*")
    .eq("user_id", user.id);

  if (fetchLinksError) {
    redirect("/");
  }
  return (
    <div className={"mt-36 flex min-h-screen flex-col items-center"}>
      <h1 className={"text-2xl font-bold"}>{username}</h1>
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
