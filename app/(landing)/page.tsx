import {
  CodeIcon,
  MonitorSmartphoneIcon,
  PaletteIcon,
  QrCodeIcon,
  Rocket,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Button } from "~/components/ui/button";

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
            Introducty is the{" "}
            <span className="underline decoration-teal-300">fastest</span> way
            to make a landing page.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Create a beautiful, blazing fast landing page. Add your links,
            launch your page, and then get back to doing what you love.
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
        className="container space-y-6  bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            Our features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"></p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <FeatureCell>
            <Rocket className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-bold">Speedy Setup</h3>
              <p className="text-sm text-muted-foreground">
                Launch your page faster than you can say &ldquo;link in
                bio&rdquo;.
              </p>
            </div>
          </FeatureCell>
          <FeatureCell>
            <QrCodeIcon className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-bold">Scan for Links</h3>
              <p className="text-sm text-muted-foreground">
                Connect with your audience in the real world with QR codes for
                your landing page.
                {/* Print and share them anywhere; they'll
                  always be up to date. */}
              </p>
            </div>
          </FeatureCell>
          <FeatureCell>
            <PaletteIcon className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-bold">Design by Default</h3>
              <p className="text-sm text-muted-foreground">
                Your page is modern and beautiful, right out of the box.
              </p>
            </div>
          </FeatureCell>
          <FeatureCell>
            <ZapIcon className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-bold">Modern and Performant</h3>
              <p className="text-sm text-muted-foreground">
                Your page is blazing fast and loads and updates instantly.
              </p>
            </div>
          </FeatureCell>
          <FeatureCell>
            <MonitorSmartphoneIcon className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-bold">Mobile Optimized Editor</h3>
              <p className="text-sm text-muted-foreground">
                Update your site from anywhere: at home or from your phone.
              </p>
            </div>
          </FeatureCell>
          <FeatureCell>
            <CodeIcon className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-bold">Boutique Software</h3>
              <p className="text-sm text-muted-foreground">
                Coded with care by a small team in NYC.{" "}
                <a
                  className="cursor-pointer underline"
                  href="mailto:hello@introducty.com"
                >
                  Get in touch
                </a>
                !
              </p>
            </div>
          </FeatureCell>
        </div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-xl leading-[1.1] sm:text-xl md:text-4xl">
            <span className="text-muted-foreground">introducty.com</span>
            <span className="underline decoration-teal-300 decoration-dashed">
              /yourname
            </span>
          </h2>
          <div className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            <Link href="/login">
              <Button size="sm">Create Site</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCell({ children }: PropsWithChildren) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="flex flex-col space-y-4 rounded-md p-2 md:p-6">
        {children}
      </div>
    </div>
  );
}
