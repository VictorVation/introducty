"use client";

import { X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

type Link = {
  id: number;
  url: string;
  title: string;
};

type Props = {
  links?: Array<Link>;
};

type Inputs = {
  title: string;
  url: string;
};

export default function LinksSetupComponent({ links }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const refreshPage = () => router.refresh();

  const addLink = async (data: Inputs) => {
    const { url, title } = data;
    const res = await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify({
        url,
        title,
      }),
    });
    const json = await res.json();

    if (json.error) {
      toast.error(json.error);
    } else {
      refreshPage();
      reset();
      toast.success(`Added ${title}`);
    }
  };

  const deleteLink = async (link: Link) => {
    const { id, title, url } = link;
    const res = await fetch(`/api/links?linkId=${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (json.error) {
      toast.error(json.error);
    } else {
      refreshPage();
      reset();
      toast.success(
        <span>
          Deleted {link.title}.{" "}
          <a
            className="underline text-brand-500 cursor-pointer"
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
    <div>
      <div className={"m-8 w-full rounded-lg border bg-white p-8"}>
        <p className={"text-4xl"}>Enter URL and Title</p>
        <form
          className="flex flex-col gap-4 pt-4"
          onSubmit={handleSubmit(addLink)}
        >
          {/* <input
            className="mt-8 w-full rounded-md border py-4 text-gray-900 shadow-sm"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors.title && <span>This field is required</span>}
          <input
            className="mt-8 w-full rounded-md border py-4 text-gray-900 shadow-sm"
            placeholder="URL"
            {...register("url", { required: true })}
          /> */}
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
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Link
          </Button>
        </form>
      </div>
      {(links ?? []).map((link) => (
        <div
          key={link.id}
          className={
            "m-8 flex w-full justify-between rounded-lg border bg-white p-8"
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
      ))}
    </div>
  );
}
