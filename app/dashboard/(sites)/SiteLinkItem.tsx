import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";
import { formatDate } from "~/lib/utils";
import { SiteLinkMoreActions } from "~/app/dashboard/(sites)/SiteLinkMoreActions";
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
    <div className="flex items-center justify-between flex-col sm:flex-row gap-2 p-4">
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
        <div className="flex flex-col sm:flex-row gap-2">
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
