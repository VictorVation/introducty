import {
  Globe,
  Globe2,
  PaintbrushIcon,
  QrCode,
  QrCodeIcon,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Introducty is the{" "}
            <span className="underline decoration-teal-300">fastest</span> way
            to make a landing page.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Fast, beautiful and minimal by default. Add your links, launch your
            page, and get back to doing what you love.
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Launch your page faster than you can say &ldquo;link in bio&rdquo;.
            With our streamlined designer, adding your links and branding take
            just a few clicks. Plus, our beautifully minimal design ensures your
            content takes center stage.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex flex-col space-y-4 rounded-md p-6">
              <Rocket className="w-12 h-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Instant Page</h3>
                <p className="text-sm text-muted-foreground">
                  Our app is streamlined for a quick setup. Just add your links
                  and branding and launch immediately.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex flex-col space-y-4 rounded-md p-6">
              <QrCodeIcon className="w-12 h-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Link in QR</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with your audience in the real world with QR codes for
                  your landing page. Print and share them anywhere; they'll
                  always be up to date.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex flex-col space-y-4 rounded-md p-6">
              <PaintbrushIcon className="w-12 h-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Beautiful by default</h3>
                <p className="text-sm text-muted-foreground">
                  Your page is beautiful straight out of the box. Easily add
                  your own style with the customization options that matter
                  most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Taxonomy is open source and powered by open source software. <br />{" "}
            The code is available on GitHub .{" "}
          </p>
        </div>
      </section> */}
    </>
  );
}
