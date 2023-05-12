"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabase } from "~/app/supabase-provider";

export default function Header() {
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };

  const navigateToAccountPage = async () => {
    router.push("/account");
  };

  return (
    <header
      className={
        "flex justify-between items-center p-4 m-8 border-2 border-black rounded-full"
      }
    >
      <Link href="/setup" aria-label="My projects">
        <p className={"text-4xl font-bold"}>Introducty</p>
      </Link>
      <div className={"flex items-center gap-8"}>
        <button
          className={`rounded-lg p-4 font-semibold hover:bg-red-200`}
          onClick={navigateToAccountPage}
        >
          My Account
        </button>

        <button
          className={`rounded-lg p-4 font-semibold hover:bg-red-200`}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
