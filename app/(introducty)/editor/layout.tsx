import { SiteFooter } from "~/components/SiteFooter";

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
