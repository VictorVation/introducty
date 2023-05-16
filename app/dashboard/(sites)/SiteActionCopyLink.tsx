"use client";

import { ClipboardCopy } from "lucide-react";

import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";

type Props = {
  siteName: string;
};

export default function SiteActionCopyLink({ siteName }: Props) {
  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={async (e) => {
        e.preventDefault();
        await navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${siteName}`
        );
        toast.success("Link copied!", { id: "clipboard" });
      }}
    >
      <ClipboardCopy className="pr-2" /> Copy Link
    </Button>
  );
}
