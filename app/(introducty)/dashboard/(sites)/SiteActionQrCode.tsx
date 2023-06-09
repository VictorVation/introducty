"use client";

import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { DownloadCloudIcon, QrCodeIcon } from "lucide-react";

import { SyntheticEvent, useRef, useTransition } from "react";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type Props = {
  siteName: string;
};

export default function SiteActionQrCode({ siteName }: Props) {
  const qrRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  async function downloadSVG(e: SyntheticEvent) {
    e.preventDefault();
    startTransition(() => {
      const svg = qrRef.current;
      if (!svg) {
        toast.error("Error saving QR code. Please refresh and try again");
        return;
      }
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        if (ctx) {
          canvas.width = img.width + 32;
          canvas.height = img.height + 32;
          ctx.drawImage(img, 16, 16);
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = `${siteName}-QRCode`;
          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        }
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
      console.log(img.src);
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          <QrCodeIcon className="pr-2" /> Get QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{siteName} QR Code</DialogTitle>
        </DialogHeader>
        <DialogDescription>{`${process.env.NEXT_PUBLIC_BASE_URL}/${siteName}`}</DialogDescription>
        <div className="bg-white p-4">
          <QRCode
            ref={qrRef}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`${process.env.NEXT_PUBLIC_BASE_URL}/${siteName}`}
            viewBox={`0 0 256 256`}
          />
        </div>
        <DialogFooter className="gap-1">
          <Button size="sm" onClick={async (e) => downloadSVG(e)}>
            <DownloadCloudIcon className="pr-2" />
            Download
          </Button>
          <DialogClose asChild>
            <Button size="sm" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
