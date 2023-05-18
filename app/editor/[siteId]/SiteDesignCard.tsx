"use client";

import { Loader2, Palette, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Badge } from "~/components/ui/badge";

import { Button, buttonVariants } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Site as SiteType } from "types/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "~/components/ui/card";
import { useContext } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

type Props = {
  siteId: string;
};

type Inputs = {
  backgroundColor: string;
};

const _gradients = {
  1: ["from-amber-300", "to-rose-400"], // OrangeRed
  2: ["from-pink-400", "to-rose-400"], // RosePink
  3: ["from-cyan-300", "to-blue-600"], // Sky
  4: ["from-emerald-400", "to-cyan-500"], // CyanGreen
  5: ["from-purple-600", "to-blue-500"], // BluePurple
  6: ["from-green-600", "to-green-800"], // GreenGreen
  7: ["from-fuchsia-300", "to-red-400"], // LightPink
  8: ["from-purple-300", "to-blue-400"], // GreenGreen
  9: ["from-sky-300", "to-sky-800"], // GreenGreen
};
type GradientIds = keyof typeof _gradients;
const gradients = cva(["bg-gradient-to-br"], {
  variants: {
    gradientId: _gradients,
  },
});

export default function SiteDesignCard({ siteId }: Props) {
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
  } = useForm<Inputs>({ defaultValues: {} });

  const { solid, setSolid } = useContext(EditorContext);

  const { onChange, ...backgroundColorFields } = register("backgroundColor", {
    required: "This field is required",
    validate: (v) =>
      (v.startsWith("#") && validHex(v)) || "Invalid background color",
  });

  function updateSiteDesign(data: Inputs) {
    toast("Editing design coming soon!");
  }

  return (
    <div className="w-sm row-span-2 transition-all duration-500 ">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Site Design</CardTitle>
          <CardDescription>Select a background for your site.</CardDescription>
        </CardHeader>
        <CardContent className="grid w-full gap-4">
          <form
            className="flex flex-col gap-4 pt-4"
            onSubmit={handleSubmit(updateSiteDesign)}
          >
            <Tabs defaultValue="gradient">
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
                  <RadioGroup className="grid-cols-3" defaultValue="1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i: number) => (
                      <Label
                        key={i}
                        htmlFor={`gradient-${i}`}
                        className={cn(
                          "flex aspect-square flex-col rounded-md border-2 border-muted bg-popover hover:border-black hover:text-accent-foreground [&:has([data-state=checked])]:border-black",
                          gradients({ gradientId: i as GradientIds })
                        )}
                      >
                        <RadioGroupItem
                          className="sr-only border-primary-foreground text-primary-foreground"
                          value={`${i}`}
                          id={`gradient-${i}`}
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
                      placeholder="#000000"
                      onChange={(e) => {
                        setSolid?.(e.currentTarget.value);
                        onChange(e);
                      }}
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
                          color={watch("backgroundColor")}
                          onChange={(color) => {
                            setSolid?.(color);
                            setValue("backgroundColor", color);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {errors.backgroundColor && (
                    <p className="text-sm text-rose-400">
                      {errors.backgroundColor.message}
                    </p>
                  )}
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
                    toast.error("PRO subscription requred to upload Images!", {
                      id: "img-pro",
                    })
                  }
                >
                  <Button variant="secondary" disabled>
                    Select File
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
