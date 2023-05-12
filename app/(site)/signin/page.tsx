"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSupabase } from "~/app/supabase-provider";

export default function SignInPage() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const userEmail = session?.user.email;
      const userId = session?.user.id;
      if (event === "SIGNED_IN" && userId && userEmail) {
        router.push(`/setup`);
      }
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabase.auth]);

  const isNewUser = searchParams?.get("action") === "new_user";
  return (
    <div className="flex h-screen flex-col justify-center">
      <h1 className="flex w-full h-full justify-center">
        <div className="flex-col min-h-full items-center justify-center py-12 w-96">
          <p> Welcome to Introducty.</p>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            view={isNewUser ? "sign_up" : "sign_in"}
          />
        </div>
      </h1>
    </div>
  );
}
