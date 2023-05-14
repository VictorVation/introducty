import { redirect } from "next/navigation";

import { DashboardHeader } from "~/components/DashboardHeader";
import { DashboardShell } from "~/components/DashboardShell";
import { UserNameForm } from "./UserNameForm";
import getUser from "~/lib/getUser";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const authUser = await getUser();
  if (!authUser) {
    redirect("/login");
  }

  const supabase = createServerComponentSupabaseClient({ headers, cookies });
  const { data: user, error: fetchUsernameError } = await supabase
    .from("Users")
    .select("*")
    .eq("id", authUser.id)
    .single();
  console.log(user);
  if (fetchUsernameError) {
    redirect("/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm
          user={{ id: user.id, name: user.name, username: user.username || "" }}
        />
      </div>
    </DashboardShell>
  );
}
