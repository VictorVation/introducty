import { redirect } from "next/navigation";

import { DashboardHeader } from "~/components/DashboardHeader";
import { DashboardShell } from "~/components/DashboardShell";
import { UserNameForm } from "~/components/UserNameForm";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  //   const user = await getCurrentUser();

  //   if (!user) {
  //     redirect(authOptions?.pages?.signIn || "/login");
  //   }
  const user = { id: "fake", name: "Faketor Szeto" };
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>
    </DashboardShell>
  );
}
