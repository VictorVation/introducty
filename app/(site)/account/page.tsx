import Header from "~/components/Header";
import UsernameEditor from "./UsernameEditor";
import { headers, cookies } from "next/headers";

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export default async function Account() {
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
    redirect("/");
  }

  const username = user.username;
  return (
    <div className={"min-h-screen"}>
      <UsernameEditor username={username} />
    </div>
  );
}
