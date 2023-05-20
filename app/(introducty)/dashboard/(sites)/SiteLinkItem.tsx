import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { SiteLinkMoreActions } from "~/app/(introducty)/dashboard/(sites)/SiteLinkMoreActions";
import { buttonVariants } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { cn, formatDate } from "~/lib/utils";
import { Site } from "~/types/supabase";
import SiteActionCopyLink from "./SiteActionCopyLink";
import SiteActionQrCode from "./SiteActionQrCode";

interface LinkItemProps {
  site: Pick<Site, "id" | "site_name" | "created_at">;
  linkCount: any;
}

export function LinkItem({ site, linkCount }: LinkItemProps) {
  const { site_name: siteName, created_at: createdAt } = site;
  return (
    <div className="flex flex-col items-center justify-between gap-2 p-4 sm:flex-row">
      <div className="flex flex-col gap-4">
        <div>
          <Link
            href={`/editor/${site.id}`}
            className="font-semibold hover:underline"
          >
            {siteName}
          </Link>
          <p className="text-sm text-muted-foreground">
            {Number.isFinite(linkCount) && linkCount === 1
              ? `1 link`
              : `${linkCount} links`}{" "}
            &middot; Created {formatDate(createdAt)}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/editor/${site.id}`}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            <PencilIcon className="pr-2" />
            Edit Site
          </Link>
          <SiteActionCopyLink siteName={siteName} />
          <SiteActionQrCode siteName={siteName} />
        </div>
      </div>
      <SiteLinkMoreActions site={{ id: site.id, site_name: siteName }} />
    </div>
  );
}

LinkItem.Skeleton = function LinkItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
