import Link from "next/link";
import CopyLinkButton from "./CopyLinkButton";
import { Link as LinkType } from "~/types/supabase";
import DeviceFrame from "./DeviceFrame";

type Props = {
  siteName: string;
  links?: Array<Pick<LinkType, "id" | "title" | "url">>;
};

export default function LinksPreviewComponent({ links, siteName }: Props) {
  const renderedLinks = links ?? [];
  return (
    <div className="">
      <DeviceFrame>
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
      </DeviceFrame>
    </div>
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
