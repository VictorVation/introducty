import QRCode from "react-qr-code";

export function QRCodeRenderer() {
  return (
    <QRCode
      size={256}
      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      value={"https://google.com"}
      viewBox={`0 0 256 256`}
    />
  );
}
