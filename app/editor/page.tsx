import { redirect } from "next/navigation";

export default async function EditorPage() {
  return redirect("/dashboard");
}
