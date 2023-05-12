import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "~/types/supabase";

type Data = {
  error?: string;
  user?: Database["public"]["Tables"]["Users"]["Row"];
};

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to create a link!" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { username: newUsername } = body;

  if (!newUsername) {
    return NextResponse.json(
      { error: "Missing new username" },
      { status: 400 }
    );
  }

  const { error: updateError } = await supabase
    .from("Users")
    .update({
      username: newUsername,
    })
    .eq("id", user.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  return NextResponse.json({}, { status: 200 });
}
