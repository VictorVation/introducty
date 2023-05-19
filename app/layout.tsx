import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import { cn } from "~/lib/utils";

export const metadata = {
  title: {
    default: "Introducty: Create a landing page in seconds",
    template: `%s | Introducty`,
  },
  description:
    "Introducty is the fastest way to add your link in bio. Create a beautiful, blazing fast landing page. Add your links, launch your page, and then get back to doing what you love.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--ui-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          manrope.variable,
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
