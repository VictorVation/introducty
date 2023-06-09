import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import getUser from "~/lib/getUser";
import { Database } from "~/types/supabase";
import { verifyCurrentUserHasAccessToSite } from "../sites/[siteId]/route";

const createLinkSchema = z.object({
  siteId: z.string(),
  url: z.string().url({
    message: "Invalid link URL. Make sure to include the http:// or https://",
  }),
  title: z.string(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = createLinkSchema.parse(json);
    const { url, title, siteId } = body;
    const authUser = await getUser();

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToSite(siteId)) || !authUser) {
      return new Response(null, { status: 403 });
    }

    const supabase = createRouteHandlerSupabaseClient<Database>({
      headers,
      cookies,
    });

    const link = await supabase.from("links").insert({
      url: url,
      title: title,
      site_id: siteId,
      user_id: authUser.id,
    });

    return new Response(JSON.stringify(link));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(fromZodError(error).message, { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
