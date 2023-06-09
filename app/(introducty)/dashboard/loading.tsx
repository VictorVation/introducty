import { DashboardHeader } from "~/components/DashboardHeader";
import { LinkItem } from "~/app/(introducty)/dashboard/(sites)/SiteLinkItem";
import { DashboardShell } from "~/components/DashboardShell";
import { SiteCreateButton } from "~/app/(introducty)/dashboard/(sites)/SiteCreateButton";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Sites" text="Create and manage your sites.">
        <SiteCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
