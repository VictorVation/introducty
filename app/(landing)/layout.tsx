import Link from "next/link";

import { cn } from "~/lib/utils";
import { Button, buttonVariants } from "~/components/ui/button";
import { MainNav } from "~/components/MainNav";
import { SiteFooter } from "~/components/SiteFooter";
import getUser from "~/lib/getUser";

interface LandingLayoutProps {
  children: React.ReactNode;
}
const MAIN_NAV_ITEMS = [
  //   {
  //     title: "Pricing",
  //     href: "/pricing",
  //   },
  //   {
  //     title: "Blog",
  //     href: "/blog",
  //   },
  //   {
  //     title: "Documentation",
  //     href: "/docs",
  //   },
];
export default async function LandingLayout({ children }: LandingLayoutProps) {
  const authUser = await getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={[]} />
          <nav>
            {authUser ? (
              <Button size="sm">
                <Link href="/dashboard">Account Dashboard</Link>
              </Button>
            ) : (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter className="border-t" />
    </div>
  );
}
