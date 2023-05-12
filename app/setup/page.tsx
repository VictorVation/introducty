import LinksPreviewComponent from "~/app/setup/LinksPreviewComponent";
import LinksSetupComponent from "~/app/setup/LinksSetupComponent";
import Header from "~/components/Header";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

type Props = {};

export default async function Setup({}: Props) {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user.id;

  if (!userId) {
    redirect("/");
  }

  const { data: user, error: fetchUsernameError } = await supabase
    .from("Users")
    .select("*")
    .eq("id", userId)
    .single();

  if (fetchUsernameError) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: links, error: fetchLinksError } = await supabase
    .from("Links")
    .select("id, title, url")
    .eq("user_id", userId);

  if (fetchLinksError) {
    redirect("/");
  }
  return (
    <div className={"min-h-screen"}>
      <Header />
      <div className={"grid lg:grid-cols-2 md:grid-cols-1"}>
        <LinksSetupComponent links={links} />
        <LinksPreviewComponent username={user.username} links={links} />
      </div>
    </div>
  );
}
