import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";
import { formatDate } from "~/lib/utils";
import { SitesActions } from "~/components/SitesActions";
import { Site } from "~/types/supabase";

interface LinkItemProps {
  site: Pick<Site, "id" | "site_name" | "created_at">;
}

export function LinkItem({ site }: LinkItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${site.id}`}
          className="font-semibold hover:underline"
        >
          {site.site_name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(site.created_at)}
          </p>
        </div>
      </div>
      <SitesActions site={{ id: site.id, site_name: site.site_name }} />
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
