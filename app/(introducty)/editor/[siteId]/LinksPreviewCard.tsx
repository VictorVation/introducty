"use client";

import Link from "next/link";
import { Link as LinkType } from "~/types/supabase";
import DeviceFrame from "./DeviceFrame";
import { EditorContext } from "./EditorContext";
import { PropsWithChildren, useContext } from "react";
import { cn } from "~/lib/utils";
import { GradientIdsType, gradientVariant } from "~/lib/gradients";

type Props = PropsWithChildren<{
  siteName: string;
  links?: Array<Pick<LinkType, "id" | "title" | "url">>;
}>;

export default function LinksPreviewComponent({
  links,
  siteName,
  children,
}: Props) {
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
        {children}
      </div>
    </DeviceFrame>
  );
}
