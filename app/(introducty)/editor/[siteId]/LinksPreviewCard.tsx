"use client";

import Link from "next/link";
import { Link as LinkType } from "~/types/supabase";
import DeviceFrame from "./DeviceFrame";
import { EditorContext } from "./EditorContext";
import { useContext } from "react";
import { cn } from "~/lib/utils";
import { GradientIdsType, gradientVariant } from "~/lib/gradients";

type Props = {
  siteName: string;
  links?: Array<Pick<LinkType, "id" | "title" | "url">>;
};

export default function LinksPreviewComponent({ links, siteName }: Props) {
  const { solid, gradientId, backgroundType } = useContext(EditorContext);

  const renderedLinks = links ?? [];
  return (
    <DeviceFrame>
      <div
        className={cn(
          "h-full w-full rounded-[68px]",
          backgroundType === "gradient" &&
            gradientVariant({ gradientId: gradientId as GradientIdsType })
        )}
        style={{
          backgroundColor: backgroundType === "solid" ? solid : undefined,
        }}
      >
        <div className="grid gap-8 p-10 pt-32">
          <h4 className="text-md text-black text-center font-bold">
            {siteName}
          </h4>
          <div className="grid gap-2">
            {renderedLinks.map((link) => (
              <Link
                className={
                  "w-full rounded-lg border bg-slate-50 border-slate-200 text-black p-4 text-center"
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
