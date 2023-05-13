import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { LinkCreateButton } from "~/components/LinkCreateButton";
import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { DashboardHeader } from "~/components/DashboardHeader";
// import { PostCreateButton } from "~/components/post-create-button";
// import { LinkItemPostItem } from "~/components/LinkItem";
import { DashboardShell } from "~/components/DashboardShell";
import { LinkItem } from "~/components/LinkItem";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  //   const posts = [{ id: "a", title: "My First Link", createdAt: new Date() }];
  const posts = [];
  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage your links.">
        <LinkCreateButton />
      </DashboardHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <LinkItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No links created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any links yet. Create a link in seconds and
              share it immediately.
            </EmptyPlaceholder.Description>
            <LinkCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
