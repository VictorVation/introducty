"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "~/lib/utils";
import { ButtonProps, buttonVariants } from "~/components/ui/button";
import { FilePlus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface SiteCreateButtonProps extends ButtonProps {}

export function SiteCreateButton({
  className,
  variant,
  ...props
}: SiteCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function createNewSite() {
    setIsLoading(true);
    const response = await fetch("/api/sites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //
      }),
    });
    setIsLoading(false);
    if (!response.ok) {
      //     if (!response?.ok) {
      //       if (response.status === 402) {
      //         return toast({
      //           title: "Limit of 3 posts reached.",
      //           description: "Please upgrade to the PRO plan.",
      //           variant: "destructive",
      //         });
      //       }

      //       return toast({
      //         title: "Something went wrong.",
      //         description: "Your post was not created. Please try again.",
      //         variant: "destructive",
      //       });
      //     }
      toast.error("Error creating new site. Please try again");
    }

    toast.success("Site created!");
    router.refresh();
  }

  return (
    <button
      onClick={() => createNewSite()}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <FilePlus className="mr-2 h-4 w-4" />
      )}
      New site
    </button>
  );
}
