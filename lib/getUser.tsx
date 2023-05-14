import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export default async function getUser() {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user;
}
