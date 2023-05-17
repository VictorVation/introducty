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
      </div>
    </div>
  );
}
