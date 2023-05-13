"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSupabase } from "~/app/supabase-provider";

export default function LoginForm() {
  const { supabase } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const userEmail = session?.user.email;
      const userId = session?.user.id;
      if (event === "SIGNED_IN" && userId && userEmail) {
        toast.success("Signed in!");
        router.push(`/dashboard`);
      }
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabase.auth]);

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "#14b8a6",
              brandAccent: "#14b8a6",
            },
          },
        },
      }}
      providers={[]}
    />
  );
}
