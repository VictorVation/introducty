import * as z from "zod";

import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import getUser from "~/lib/getUser";
import { Database } from "~/types/supabase";
import { fromZodError } from "zod-validation-error";

const routeContextSchema = z.object({
  params: z.object({
    siteDesignId: z.string(),
  }),
});

const patchRequestSchema = z.object({
  gradientId: z.string(),
  backgroundType: z.string(),
  solid: z.string(),
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
    const { gradientId, backgroundType, solid } =
      patchRequestSchema.parse(json);

    // Update the post.
    const supabase = createRouteHandlerSupabaseClient<Database>({
      headers,
      cookies,
    });
    const { error: updateError } = await supabase
      .from("site_design")
      .update({
        gradient_id: gradientId,
        background_type: backgroundType,
        solid,
      })
      .eq("id", parseInt(params.siteDesignId));

    if (updateError) {
      console.error(updateError);
      return new Response(null, { status: 500 });
    }
    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(fromZodError(error).message, { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
