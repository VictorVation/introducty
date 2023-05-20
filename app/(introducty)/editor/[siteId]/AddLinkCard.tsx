"use client";

import { ChevronsUpDownIcon, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useState } from "react";
import { Link as LinkType } from "types/supabase";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";

type EditorLinkType = Pick<LinkType, "id" | "title" | "url">;
type Props = {
  links?: Array<EditorLinkType>;
  siteId: string;
};

type Inputs = {
  title: string;
  url: string;
};

export default function AddLinkCard({ links, siteId }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const [isShowLinks, setIsShowLinks] = useState(true);

  const refreshPage = () => router.refresh();

  const addLink = async (data: Inputs) => {
    const { url, title } = data;
    const res = await fetch(`/api/links`, {
      method: "POST",
      body: JSON.stringify({
        url,
        siteId,
        title,
      }),
    });
    if (!res.ok) {
      if (res.status === 422) return toast.error(await res.text());
      toast.error("Error, your link was not added. Please try again");
    } else {
      refreshPage();
      reset();
      toast.success(`Added ${title}`);
    }
  };

  const deleteLink = async (link: EditorLinkType) => {
    const { id, title, url } = link;
    const res = await fetch(`/api/links/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      if (res.status === 422) return toast.error(await res.text());
      toast.error("Error, your link was not deleted. Please try again");
    } else {
      refreshPage();
      reset();
      toast.success(
        <span>
          Deleted {link.title}.{" "}
          <a
            className="text-brand-500 cursor-pointer underline"
            onClick={() => {
              addLink({ title, url });
              toast.dismiss(title);
            }}
          >
            Undo
          </a>
        </span>,
        { id: title, duration: 4000 }
      );
    }
  };

  return (
    <div className="row-span-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Add Links</CardTitle>
          <CardDescription>Enter a title and URL.</CardDescription>
        </CardHeader>
        <CardContent className="grid w-full gap-4">
          <form
            className="flex flex-col gap-4 pt-4"
            onSubmit={handleSubmit(addLink)}
          >
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-sm text-rose-400">This field is required</p>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="url">URL</Label>
              <Input
                type="text"
                id="url"
                placeholder="URL"
                {...register("url", { required: true })}
              />
              {errors.url && (
                <p className="text-sm text-rose-400">This field is required</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add Link
            </Button>
          </form>
          <Separator />
          <Collapsible
            className="grid w-full gap-2"
            open={isShowLinks}
            onOpenChange={setIsShowLinks}
          >
            <CollapsibleTrigger asChild>
              <div className="flex cursor-pointer items-center justify-between space-x-4 rounded-lg border bg-muted px-4">
                <h4 className="text-sm font-semibold">
                  {isShowLinks ? "Hide" : "Show"} {links?.length ?? 0} Links
                </h4>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDownIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="grid gap-2">
              {(links ?? []).map((link) => {
                const { id, title, url } = link;
                return (
                  <div
                    className="flex flex-col items-center justify-between gap-2 rounded-lg border bg-background p-4 sm:flex-row"
                    key={id}
                  >
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {title}
                        </p>
                        <p className="break-all text-sm text-muted-foreground">
                          {url
                            .replace(/^(https?:|)\/\/(www\.?)?/, "")
                            .replace(/\?.*$/, "")}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteLink(link)}
                    >
                      <X className="h-6 w-6 text-destructive" />
                    </Button>
                  </div>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
      {/* {(links ?? []).map((link) => (
        <div
          key={link.id}
          className={
            "m-8 flex w-full justify-between rounded-lg border bg-background p-8"
          }
        >
          <div>
            <p className={"text-4xl"}> {link.title}</p>
            <p className={"text-2xl"}> {link.url}</p>
          </div>
          <button onClick={() => deleteLink(link)}>
            <X className="h-12 w-12 text-red-500" />
          </button>
        </div>
      ))} */}
    </div>
  );
}
