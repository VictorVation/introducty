import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import getUser from "~/lib/getUser";
import { Database } from "~/types/supabase";

const routeContextSchema = z.object({
  params: z.object({
    linkId: z.string(),
  }),
});
export async function DELETE(
  _: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);
    const { linkId } = params;

    const authUser = await getUser();
    const supabase = createRouteHandlerSupabaseClient<Database>({
      headers,
      cookies,
    });
    if (!authUser) {
      return new Response(null, { status: 403 });
    }

    const { data, error: deleteError } = await supabase
      .from("links")
      .delete()
      .eq("id", linkId);

    if (deleteError) {
      console.error(deleteError);
      return new Response(null, { status: 500 });
    }
    return new Response(JSON.stringify(data));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(fromZodError(error).message, { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
