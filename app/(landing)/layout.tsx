import Link from "next/link";

import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { MainNav } from "~/components/MainNav";
import { SiteFooter } from "~/components/SiteFooter";

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
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={[]} />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}