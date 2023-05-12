import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerSupabaseClient({
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
  const { url, title } = body;

  if (!url || !title || !user) {
    return NextResponse.json(
      { error: "Missing url, or title" },
      { status: 400 }
    );
  }

  const { error: insertError } = await supabase.from("Links").insert({
    url,
    title,
    user_id: user.id,
  });
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 400 });
  }

  return NextResponse.json({}, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const supabase = createRouteHandlerSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to delete a link!" },
      { status: 401 }
    );
  }

  const linkId = request.nextUrl.searchParams.get("linkId");

  if (!linkId) {
    return NextResponse.json({ error: "Missing link ID" }, { status: 400 });
  }
  const { error: deleteError } = await supabase
    .from("Links")
    .delete()
    .eq("user_id", user.id)
    .eq("id", linkId);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 400 });
  }

  return NextResponse.json({}, { status: 200 });
}
