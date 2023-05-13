import LinksPreviewComponent from "~/app/links/LinksPreviewComponent";
import LinksSetupComponent from "~/app/links/LinksSetupComponent";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type Props = {};

export default async function Setup({}: Props) {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user.id;

  if (!userId) {
    redirect("/");
  }

  const { data: user, error: fetchUsernameError } = await supabase
    .from("Users")
    .select("*")
    .eq("id", userId)
    .single();

  if (fetchUsernameError) {
    redirect("/");
  }

  const { data: links, error: fetchLinksError } = await supabase
    .from("Links")
    .select("id, title, url")
    .order("id")
    .eq("user_id", userId);
  console.log(links);
  if (fetchLinksError) {
    redirect("/");
  }
  return (
    <div className={"grid lg:grid-cols-2 md:grid-cols-1"}>
      <Link
        href="/dashboard"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <LinksSetupComponent links={links} />
      <LinksPreviewComponent username={user.username} links={links} />
    </div>
  );
}
