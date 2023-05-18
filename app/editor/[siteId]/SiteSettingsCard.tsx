"use client";

import {
  X,
  Loader2,
  ChevronsUpDownIcon,
  Palette,
  ClipboardCopy,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button, buttonVariants } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Site as SiteType } from "types/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { useContext, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { validHex } from "~/lib/validateHex";
import { EditorContext } from "./EditorContext";
import { cva } from "class-variance-authority";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { cn } from "~/lib/utils";

type Props = {
  siteId: string;
  siteName: string;
};

type Inputs = {
  siteName: string;
};

async function copyLinkToClipboard(e: React.SyntheticEvent, siteName: string) {
  e.preventDefault();
  await navigator.clipboard.writeText(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${siteName}`
  );
  toast.success("Link copied!", { id: "clipboard" });
}

export default function SiteSettingsCard({ siteName, siteId }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    reset,
    watch,
    formState: { errors },
    formState: { isSubmitting },
  } = useForm<Inputs>({ defaultValues: { siteName } });

  function updateSite(data: Inputs) {
    toast("Editing settings coming soon!");
  }

  return (
    <div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Site Settings</CardTitle>
          {/* <CardDescription>Enter a title and URL.</CardDescription> */}
        </CardHeader>
        <CardContent className="grid w-full gap-4">
          <form
            className="flex flex-col gap-4 pt-4"
            onSubmit={handleSubmit(updateSite)}
          >
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="siteName">Site Name</Label>

              <div className="flex w-full items-center space-x-2">
                <div
                  className={
                    "text-md h-13 flex w-full flex-row justify-start rounded-md border border-input bg-transparent px-3 align-middle ring-offset-background"
                  }
                >
                  <label
                    htmlFor="siteName"
                    className="m-auto hidden cursor-text  select-none text-muted-foreground md:block"
                  >
                    introducty.com/
                  </label>
                  <Input
                    type="text"
                    id="siteName"
                    placeholder="Title"
                    className="block border-none pl-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...register("siteName", { required: true })}
                  />
                </div>
                <Button
                  className="p-4 py-6"
                  variant="outline"
                  onClick={(e) => copyLinkToClipboard(e, siteName)}
                >
                  <ClipboardCopy />
                </Button>
              </div>
              {errors.siteName && (
                <p className="text-sm text-rose-400">This field is required</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
