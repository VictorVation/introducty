import "~/app/globals.css";

import SupabaseProvider from "~/app/supabase-provider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "~/components/ThemeProvider";

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
