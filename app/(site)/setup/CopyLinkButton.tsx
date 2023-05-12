"use client";

import { ClipboardIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";

type Props = {
  username: string;
};

export default function CopyLinkButton({ username }: Props) {
  return (
    <div
      className="flex items-center hover:cursor-pointer"
      onClick={async (event) => {
        event.preventDefault();
        await navigator.clipboard.writeText(
          `https://${process.env.NEXT_PUBLIC_BASE_URL}/${username}`
        );
        toast.success("Link copied!", { id: "clipboard" });
      }}
    >
      <p className="mb-4 text-lg font-bold">{`${process.env.NEXT_PUBLIC_BASE_URL}/${username}`}</p>
      {/* <Button className="mb-4 ml-4 flex rounded-md border bg-brand-500 px-4 py-2 text-white shadow-sm hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2">
        <ClipboardIcon className="h-6 w-6" /> Copy Link
      </Button> */}
      <Button>
        <ClipboardIcon className="h-6 w-6" /> Copy Link
      </Button>
    </div>
  );
}
