"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { cn } from "~/lib/utils";

import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: { id: string; name: string; username: string };
}

type FormData = {
  username: string;
};

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ defaultValues: { username: user.username } });
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const { username } = formData;
    const resp = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({ username }),
    });
    if (resp.ok) {
      router.refresh();
      toast.success("Updated username!");
    } else {
      toast.error("Error updating account. Your changes were not saved.");
    }
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("username")}
            />
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
