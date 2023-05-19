import Link from "next/link";

import { buttonVariants } from "~/components/ui/button";
import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";

export default function NotFound() {
  return (
    <EmptyPlaceholder className="mx-auto max-w-[800px] h-screen">
      <EmptyPlaceholder.Icon name="warning" />
      <EmptyPlaceholder.Title>Uh oh! Not Found</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        This site cound not be found. Please try again.
      </EmptyPlaceholder.Description>
      <Link
        href="/dashboard"
        className={buttonVariants({ variant: "default" })}
      >
        Go to Dashboard
      </Link>
    </EmptyPlaceholder>
  );
}
