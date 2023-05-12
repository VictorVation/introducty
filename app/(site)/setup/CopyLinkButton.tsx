"use client";

import { ClipboardIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";

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
          `${process.env.NEXT_PUBLIC_BASE_URL}/${username}`
        );
        toast.success("Link copied!", { id: "clipboard" });
      }}
    >
      <p className="mb-4 text-lg font-bold">{`${process.env.NEXT_PUBLIC_BASE_URL}/${username}`}</p>
      <button className="mb-4 ml-4 flex rounded-md border bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <ClipboardIcon className="h-6 w-6" /> Copy Link
      </button>
    </div>
  );
}
