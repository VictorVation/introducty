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
import { fromZodError } from "zod-validation-error";
import { startTransition } from "react";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: { id: string; name: string; email: string };
}

type FormData = {
  name: string;
  email: string;
};

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { name: user.name, email: user.email },
  });
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const { name, email } = formData;
    const resp = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({ name, email }),
    });
    if (resp.ok) {
      startTransition(() => {
        router.refresh();
      });
      toast.success("Updated account!");
    } else {
      const message = await resp?.text();
      toast.error(message);
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
          <CardTitle>Account</CardTitle>
          <CardDescription>Update your account details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 w-full">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="w-[400px]"
              size={32}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
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
