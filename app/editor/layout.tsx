import { Link, ChevronLeft, ChevronLeftIcon } from "lucide-react";
import { SiteFooter } from "~/components/SiteFooter";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface EditorProps {
  children?: React.ReactNode;
}

export default function EditorLayout({ children }: EditorProps) {
  return (
    <>
      {children}
      <SiteFooter className="border-t" />
    </>
  );
}
