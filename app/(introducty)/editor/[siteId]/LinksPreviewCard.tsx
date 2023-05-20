"use client";

import { PropsWithChildren, useContext } from "react";
import { GradientIdsType, gradientVariant } from "~/lib/gradients";
import { cn } from "~/lib/utils";
import { Link as LinkType } from "~/types/supabase";
import DeviceFrame from "./DeviceFrame";
import { EditorContext } from "./EditorContext";

type Props = PropsWithChildren<{
  siteName: string;
  links?: Array<Pick<LinkType, "id" | "title" | "url">>;
}>;

export default function LinksPreviewComponent({ links, children }: Props) {
  const { solid, gradientId, backgroundType } = useContext(EditorContext);
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
