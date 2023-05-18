"use client";

import Link from "next/link";
import CopyLinkButton from "./CopyLinkButton";
import { Link as LinkType } from "~/types/supabase";
import DeviceFrame from "./DeviceFrame";
import { EditorContext } from "./EditorContext";
import { useContext } from "react";
import { cn } from "~/lib/utils";
import { cva } from "class-variance-authority";

type Props = {
  siteName: string;
  links?: Array<Pick<LinkType, "id" | "title" | "url">>;
};

const gradients = cva(["bg-gradient-to-br"], {
  variants: {
    gradientId: {
      1: ["from-amber-300", "to-rose-400"], // OrangeRed
      2: ["from-pink-400", "to-rose-400"], // RosePink
      3: ["from-cyan-300", "to-blue-600"], // Sky
      4: ["from-emerald-400", "to-cyan-500"], // CyanGreen
      5: ["from-purple-600", "to-blue-500"], // BluePurple
      6: ["from-green-600", "to-green-800"], // GreenGreen
      7: ["from-fuchsia-300", "to-red-400"], // LightPink
      8: ["from-purple-300", "to-blue-400"], // GreenGreen
    },
  },
});
export default function LinksPreviewComponent({ links, siteName }: Props) {
  const {
    solid,
    setSolid,
    gradientId,
    setGradientId,
    backgroundType,
    setBackgroundType,
  } = useContext(EditorContext);

  const renderedLinks = links ?? [];
  return (
    <DeviceFrame>
      <div
        className={cn(
          "h-full w-full rounded-[68px] bg-background",
          gradients({ gradientId: 8 })
        )}
      >
        <div className="grid gap-8 p-10 pt-32">
          <h4 className="text-md text-center font-bold">{siteName}</h4>
          <div className="grid gap-2">
            {renderedLinks.map((link) => (
              <Link
                className={
                  "w-full rounded-lg border bg-background p-4 text-center"
                }
                key={link.id}
                href={link.url}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

/* <CopyLinkButton siteName={siteName} />
      <div
        className="radius-1/2 relative overflow-hidden rounded-3xl border-8 border-foreground p-2 text-center"
        style={{ height: "844px", width: "390px" }}
      >
        <div className="radius-1/2 flex h-full w-full flex-col justify-center overflow-y-scroll rounded-2xl">
          {renderedLinks.map((link) => (
            <Link
              className={"w-full rounded-lg border bg-background p-8"}
              key={link.id}
              href={link.url}
            >
              {link.title}
            </Link>
          ))}
      </div>
        </div> */
