import Link from "next/link";
import CopyLinkButton from "./CopyLinkButton";

type Props = {
  username: string;
  links: {
    id: number;
    url: string;
    title: string;
  }[];
};

export default function LinksPreviewComponent({ links, username }: Props) {
  return (
    <div className="flex w-1/2 flex-col items-center">
      <CopyLinkButton username={username} />
      <div
        className="radius-1/2 rounded-3xl p-2 border-8 border-black text-center relative overflow-hidden"
        style={{ height: "844px", width: "390px" }}
      >
        <div className="flex h-full rounded-2xl radius-1/2 w-full flex-col justify-center overflow-y-scroll">
          {links.map((link) => (
            <Link
              className={"w-full rounded-lg border bg-white p-8"}
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
