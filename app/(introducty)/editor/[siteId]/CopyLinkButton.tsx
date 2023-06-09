"use client";
import { ClipboardCopy } from "lucide-react";

import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";

type Props = {
  siteName: string;
};

export default function CopyLinkButton({ siteName }: Props) {
  return (
    <div
      className="flex items-center justify-center hover:cursor-pointer"
      onClick={async (event) => {
        event.preventDefault();
        await navigator.clipboard.writeText(
          `https://${process.env.NEXT_PUBLIC_BASE_URL}/${siteName}`
        );
        toast.success("Link copied!", { id: "clipboard" });
      }}
    >
      <p className="mr-2 text-lg font-bold">{`${process.env.NEXT_PUBLIC_BASE_URL}/${siteName}`}</p>
      <Button>
        <ClipboardCopy className="pr-2" /> Copy Link
      </Button>
    </div>
  );
}
