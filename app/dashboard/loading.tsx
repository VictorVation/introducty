import { DashboardHeader } from "~/components/DashboardHeader";
// import { PostCreateButton } from "@/components/post-create-button";
import { LinkItem } from "~/components/LinkItem";
import { DashboardShell } from "~/components/DashboardShell";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage posts.">
        {/* <PostCreateButton /> */}
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
