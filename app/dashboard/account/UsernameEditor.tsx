"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";

type Props = {
  username: string;
};

type Form = {
  username: string;
};
export default function UsernameEditor({ username }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>();

  const router = useRouter();

  const saveUsername = async (form: Form) => {
    const { username } = form;
    const resp = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    const json = await resp.json();
    if (json.error) {
      toast.error(json.error);
    } else {
      router.refresh();
      toast.success("Updated username!");
    }
  };

  return (
    <div className={"w-full flex justify-center"}>
      <div
        className={"w-1/2 p-4 flex flex-col gap-2 bg-white rounded-lg border "}
      >
        <p className={"text-4xl mb-4"}>Account</p>
        <form
          className="flex flex-col gap-4 pt-4"
          onSubmit={handleSubmit(saveUsername)}
        >
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-sm text-rose-400">This field is required</p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Link
          </Button>
        </form>
      </div>
    </div>
  );
}
