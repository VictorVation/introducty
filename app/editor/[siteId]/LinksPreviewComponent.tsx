import Link from "next/link";
import CopyLinkButton from "./CopyLinkButton";
import { Link as LinkType } from "~/types/supabase";

type Props = {
  siteName: string;
  links?: Array<Pick<LinkType, "id" | "title" | "url">>;
};

export default function LinksPreviewComponent({ links, siteName }: Props) {
  const renderedLinks = links ?? [];
  return (
    <div className="flex flex-col items-center">
      <CopyLinkButton siteName={siteName} />
      <div
        className="radius-1/2 rounded-3xl p-2 border-8 border-foreground text-center relative overflow-hidden"
        style={{ height: "844px", width: "390px" }}
      >
        <div className="flex h-full rounded-2xl radius-1/2 w-full flex-col justify-center overflow-y-scroll">
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
      </div>
    </div>
  );
}
