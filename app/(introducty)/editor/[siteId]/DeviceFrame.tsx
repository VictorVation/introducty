import { PropsWithChildren } from "react";

import "~/components/devices.css";

export default function DeviceFrame({ children }: PropsWithChildren) {
  return (
    <div className="device device-iphone-14-pro">
      <div className="device-frame">{children}</div>
      <div className="device-stripe"></div>
      <div className="device-header"></div>
      <div className="device-sensors"></div>
      <div className="device-btns"></div>
      <div className="device-power"></div>
      <div className="device-home"></div>
    </div>
  );
}
