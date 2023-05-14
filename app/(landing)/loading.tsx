import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className="h-screen flex justify-center align-middle">
      <Loader2 className="text-3xl" />
    </div>
  );
}
