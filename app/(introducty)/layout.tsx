import "~/app/globals.css";
import SupabaseProvider from "~/app/supabase-provider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "~/components/ThemeProvider";

export const metadata = {
  title: {
    default: "Introducty - The fastest way to put your link in bio",
    template: `%s | Introducty`,
  },
  description: "Introducty is the fastest way to add your link in bio.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="container">
        <SupabaseProvider session={null}>{children}</SupabaseProvider>
        <Toaster />
      </main>
    </ThemeProvider>
  );
}
