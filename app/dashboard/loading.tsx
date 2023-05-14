import { DashboardHeader } from "~/components/DashboardHeader";
import { LinkItem } from "~/components/LinkItem";
import { DashboardShell } from "~/components/DashboardShell";
import { LinkCreateButton } from "~/components/LinkCreateButton";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage posts.">
        <LinkCreateButton />
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
