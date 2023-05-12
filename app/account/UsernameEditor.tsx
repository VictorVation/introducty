"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSupabase } from "~/app/supabase-provider";

type Props = {
  username: string;
};
export default function UsernameEditor({ username }: Props) {
  const [newUsername, setNewUsername] = useState(username);
  const { session } = useSupabase();
  const router = useRouter();

  const user = session?.user;

  const saveUsername = async () => {
    try {
      const resp = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          username: newUsername,
        }),
      });
      const json = await resp.json();
      if (json.error) {
        alert(json.error);
      } else {
        router.refresh();
        alert("Saved!");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={"w-full flex justify-center"}>
      <div
        className={"w-1/2 p-4 flex flex-col gap-2 bg-white rounded-lg border "}
      >
        <p className={"text-4xl mb-4"}>Account</p>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="w-full rounded-md border p-4 text-gray-900 shadow-sm"
            placeholder="Title"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <button
          className="w-full mt-8 rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={saveUsername}
        >
          Save
        </button>
      </div>
    </div>
  );
}
