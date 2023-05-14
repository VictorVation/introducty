import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";

import { MainNav } from "~/components/MainNav";
import { SideNav } from "~/components/SideNav";
import { SiteFooter } from "~/components/SiteFooter";
import { UserAccountNav } from "~/components/UserAccountNav";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const authUser = session?.user;
  const { data: user } = await supabase
    .from("Users")
    .select("id, name, email")
    .eq("id", authUser?.id)
    .single();

  if (!user) {
    return notFound();
  }
  console.log(user);
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={[]} />
          <UserAccountNav user={{ name: user.name, email: user.email }} />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SideNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
