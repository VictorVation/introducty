"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { QrCodeIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import QRCode from "react-qr-code";
import { useRef } from "react";
import toast from "react-hot-toast";

type Props = {
  siteName: string;
};

export default function SiteActionQrCode({ siteName }: Props) {
  const qrRef = useRef(null);
  function downloadSVG() {
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
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `${siteName}-QRCode`;
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
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
        <div className="p-4 bg-white">
          <QRCode
            ref={qrRef}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`${process.env.NEXT_PUBLIC_BASE_URL}/${siteName}`}
            viewBox={`0 0 256 256`}
          />
        </div>
        <DialogFooter className="gap-1">
          <Button size="sm" onClick={downloadSVG}>
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
