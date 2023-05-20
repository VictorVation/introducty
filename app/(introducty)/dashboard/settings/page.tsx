import { redirect } from "next/navigation";

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { DashboardHeader } from "~/components/DashboardHeader";
import { DashboardShell } from "~/components/DashboardShell";
import getUser from "~/lib/getUser";
import { UserNameForm } from "./UserNameForm";

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
    .from("users")
    .select("id, name, email")
    .eq("id", authUser.id)
    .single();

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
          user={{ id: user.id, name: user.name, email: user.email || "" }}
        />
      </div>
    </DashboardShell>
  );
}
