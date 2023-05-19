import * as z from "zod";

import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import getUser from "~/lib/getUser";
import { Database } from "~/types/supabase";
import { fromZodError } from "zod-validation-error";

const routeContextSchema = z.object({
  params: z.object({
    siteId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this site.
    if (!(await verifyCurrentUserHasAccessToSite(params.siteId))) {
      return new Response(null, { status: 403 });
    }

    const authUser = await getUser();
    const supabase = createRouteHandlerSupabaseClient<Database>({
      headers,
      cookies,
    });
    if (!authUser) {
      return new Response(null, { status: 403 });
    }

    // Delete the site.
    const { error: deleteError } = await supabase
      .from("sites")
      .delete()
      .eq("creator_id", authUser.id)
      .eq("id", params.siteId);

    if (deleteError) {
      return new Response(deleteError.message, { status: 400 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(fromZodError(error).message, { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

const patchRequestSchema = z.object({
  siteName: z.string(),
  hideBranding: z.boolean(),
});
export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Get the request body and validate it.
    const json = await req.json();
    const { siteName } = patchRequestSchema.parse(json);

    // Update the post.
    const supabase = createRouteHandlerSupabaseClient<Database>({
      headers,
      cookies,
    });
    const { error: updateError } = await supabase
      .from("sites")
      .update({
        site_name: siteName,
      })
      .eq("id", params.siteId);

    if (updateError) {
      console.error(updateError);
      return new Response(null, { status: 500 });
    }
    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function verifyCurrentUserHasAccessToSite(siteId: string) {
  const authUser = await getUser();
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });
  if (!authUser) {
    return false;
  }
  const { count } = await supabase
    .from("sites")
    .select("*", { count: "exact", head: true })
    .match({ creator_id: authUser.id, id: siteId });

  if (!count) {
    return false;
  }
  return count > 0;
}
