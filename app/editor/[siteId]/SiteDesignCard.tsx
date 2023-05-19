"use client";

import { Loader2, Palette, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Controller, useController, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Badge } from "~/components/ui/badge";

import { Button, buttonVariants } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { SiteDesign, Site as SiteType } from "types/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "~/components/ui/card";
import { SyntheticEvent, useContext } from "react";
import { HexColorPicker } from "react-colorful";
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
import { Tabs, TabsList, TabsContent, TabsTrigger } from "~/components/ui/tabs";
import { Alert, AlertDescription } from "~/components/ui/alert";

type Props = {
  //   siteDesign: Pick<
  //     SiteDesign,
  //     "id" | "background_type" | "gradient_id" | "solid"
  //   >;
  siteDesignId: number;
};
type Inputs = {
  solid: string;
  backgroundType: string;
  gradientId: string;
};

const _gradients = {
  "1": ["from-amber-300", "to-rose-400"], // OrangeRed
  "2": ["from-pink-400", "to-rose-400"], // RosePink
  "3": ["from-cyan-300", "to-blue-600"], // Sky
  "4": ["from-emerald-400", "to-cyan-500"], // CyanGreen
  "5": ["from-purple-600", "to-blue-500"], // BluePurple
  "6": ["from-green-400", "to-green-900"], // GreenGreen
  "7": ["from-fuchsia-300", "to-red-400"], // LightPink
  "8": ["from-purple-300", "to-blue-400"], // GreenGreen
  "9": ["from-purple-500", "to-rose-500"], // GreenGreen
};
export type GradientIds = keyof typeof _gradients;
export const gradients = cva(["bg-gradient-to-br"], {
  variants: {
    gradientId: _gradients,
  },
});

export default function SiteDesignCard({ siteDesignId }: Props) {
  const router = useRouter();
  const {
    solid,
    setSolid: setSolidContext,
    gradientId,
    setGradientId: setGradientIdContext,
    backgroundType,
    setBackgroundType,
  } = useContext(EditorContext);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>({
    defaultValues: { solid, backgroundType, gradientId: `${gradientId}` },
  });

  const { onChange: onSolidInputChange, ...backgroundColorFields } = register(
    "solid",
    {
      validate: (v) =>
        v == null ||
        (v.startsWith("#") && validHex(v)) ||
        "Invalid background color",
    }
  );

  const {
    field: { onChange: onChangeBackgroundType, ...backgroundTypeFieldProps },
  } = useController({ name: "backgroundType", control });
  const {
    field: { onChange: onChangeGradientId, ...gradientIdFieldProps },
  } = useController({ name: "gradientId", control });

  const handleSolidChange = (e: SyntheticEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setSolidContext?.(e.currentTarget.value);
    onSolidInputChange(e);
  };

  async function updateSiteDesign(data: Inputs) {
    const res = await fetch(`/api/siteDesign/${siteDesignId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      if (res.status === 422) return toast.error(await res.text());
      console.error(res);
      toast.error("Error, site design wasn't updated. Please try again");
    } else {
      router.refresh();
      toast.success(`Updated site design!`);
    }
    toast("Editing design coming soon!");
  }

  return (
    <div className="w-sm row-span-2 transition-all duration-500">
      <Card>
        <form onSubmit={handleSubmit(updateSiteDesign)}>
          <CardHeader className="pb-2">
            <CardTitle>Site Design</CardTitle>
            <CardDescription>
              Select a background for your site.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid w-full gap-4">
            <div className="flex flex-col gap-4 pt-4">
              <Tabs
                defaultValue={backgroundType}
                onValueChange={(v) => {
                  onChangeBackgroundType(v);
                  setBackgroundType(v);
                }}
                {...backgroundTypeFieldProps}
              >
                <TabsList className="w-full">
                  <TabsTrigger className="w-full" value="gradient">
                    Gradient
                  </TabsTrigger>
                  <TabsTrigger className="w-full" value="solid">
                    Color
                  </TabsTrigger>
                  <TabsTrigger className="w-full" value="image">
                    <Badge className="mr-2 " variant="outline">
                      PRO
                    </Badge>
                    Image
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="gradient">
                  <div className="grid w-full items-center gap-1.5">
                    <RadioGroup
                      className="grid-cols-3"
                      defaultValue={gradientId}
                      onValueChange={(gradientId) => {
                        onChangeGradientId(gradientId);
                        setGradientIdContext?.(gradientId);
                      }}
                      {...gradientIdFieldProps}
                    >
                      {Object.keys(_gradients).map((gradientId: string) => (
                        <Label
                          key={gradientId}
                          htmlFor={gradientId}
                          className={cn(
                            "flex aspect-square flex-col rounded-md border-2 border-muted bg-popover hover:border-black hover:text-accent-foreground [&:has([data-state=checked])]:border-black",
                            gradients({ gradientId: gradientId as GradientIds })
                          )}
                        >
                          <RadioGroupItem
                            className="sr-only border-primary-foreground text-primary-foreground"
                            value={gradientId}
                            id={gradientId}
                          />
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                </TabsContent>
                <TabsContent value="solid">
                  <div className="grid w-full items-center gap-1.5">
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        type="text"
                        id="backgroundColor"
                        placeholder="#f1f5f9"
                        onChange={handleSolidChange}
                        {...backgroundColorFields}
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="p-4 py-6" variant="outline">
                            <Palette />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto bg-background p-2">
                          <HexColorPicker
                            color={watch("solid")}
                            onChange={(solid) => {
                              setValue("solid", solid, {
                                shouldValidate: true,
                              });
                              setSolidContext?.(solid);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="image" className="cursor-not-allowed">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Image uploading is only available for PRO users.
                    </AlertDescription>
                  </Alert>
                  <div
                    className="mt-2 flex aspect-square select-none flex-col items-center justify-center rounded-md border-2 border-dashed border-border align-middle text-muted-foreground"
                    onClick={() =>
                      toast.error(
                        "PRO subscription requred to upload Images!",
                        {
                          id: "img-pro",
                        }
                      )
                    }
                  >
                    {/* <Button variant="secondary" disabled>
                      Select File
                    </Button> */}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
