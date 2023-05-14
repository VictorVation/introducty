"use client";

import { ArrowRight, CreditCard, FileText, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ComponentType;
} & {
  href: string;
  items?: never;
};
// | {
//     href?: string;
//     items: NavLink[];
//   }

const SIDE_NAV_ITEMS = [
  {
    title: "Sites",
    href: "/dashboard",
    icon: FileText,
    disabled: false,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
    disabled: false,
  },
  {
    title: "Account",
    href: "/dashboard/account",
    icon: Settings,
    disabled: false,
  },
];
export function SideNav() {
  const path = usePathname();

  if (!SIDE_NAV_ITEMS?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {SIDE_NAV_ITEMS.map((item, index) => {
        const Icon = item.icon ?? ArrowRight;
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
