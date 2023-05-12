"use client";

import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  links?: {
    id: number;
    url: string;
    title: string;
  }[];
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
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const refreshPage = () => router.refresh();

  const addLink = async () => {
    try {
      if (!user) {
        alert("You must be logged in to add a link");
        return;
      }
      console.log({
        url,
        title,
        userId: user.id,
      });
      const resp = await fetch("/api/links", {
        method: "POST",
        body: JSON.stringify({
          url,
          title,
          userId: user.id,
        }),
      });
      const json = await resp.json();
      if (json.error) {
        alert(json.error);
      } else {
        resetState();
        void refreshPage();
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const deleteLink = async (linkId: number) => {
    try {
      if (!user) {
        alert("You must be logged in to delete a link");
        return;
      }

      const resp = await fetch(
        `/api/links?userId=${user.id}&linkId=${linkId}`,
        {
          method: "DELETE",
        }
      );
      const json = await resp.json();
      if (json.error) {
        alert(json.error);
      } else {
        void refreshPage();
        resetState();
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const resetState = () => {
    setUrl("");
    setTitle("");
  };

  return (
    <div className={"w-1/2"}>
      <div className={"m-8 w-full rounded-lg border bg-white p-8"}>
        <p className={"text-4xl"}>Enter URL and Title</p>
        <form onSubmit={handleSubmit(addLink)}>
          <input
            className="mt-8 w-full rounded-md border py-4 text-gray-900 shadow-sm"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors.title && <span>This field is required</span>}
          <input
            className="mt-8 w-full rounded-md border py-4 text-gray-900 shadow-sm"
            placeholder="URL"
            {...register("url", { required: true })}
          />
          {errors.url && <span>This field is required</span>}
          <button
            type="submit"
            className="mt-8 rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Link
          </button>
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
          <button onClick={() => deleteLink(link.id)}>
            <XMarkIcon className="h-12 w-12 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
}
