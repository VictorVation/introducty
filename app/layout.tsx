import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import SupabaseProvider from "~/app/supabase-provider";
import { Toaster } from "react-hot-toast";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/ThemeProvider";

export const metadata = {
  title: {
    default: "Introducty - The fastest way to put your link in bio",
    template: `%s | Introducty`,
  },
  description: "Introducty is the fastest way to add your link in bio.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--ui-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          manrope.variable,
          inter.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="container">
            <SupabaseProvider session={null}>{children}</SupabaseProvider>
            <Toaster />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
