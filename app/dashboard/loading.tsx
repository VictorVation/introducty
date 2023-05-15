import { DashboardHeader } from "~/components/DashboardHeader";
import { LinkItem } from "~/components/LinkItem";
import { DashboardShell } from "~/components/DashboardShell";
import { SiteCreateButton } from "~/app/dashboard/(sites)/SiteCreateButton";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="links" text="Create and manage posts.">
        <SiteCreateButton />
        Create
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
