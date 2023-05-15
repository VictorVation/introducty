import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import { userNameSchema } from "~/lib/validations/user";
import { Database } from "~/types/supabase";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const supabase = createRouteHandlerSupabaseClient<Database>({
      headers,
      cookies,
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || params.userId !== user.id) {
      return new Response(null, { status: 403 });
    }

    const body = await req.json();
    const payload = userNameSchema.parse(body);

    // Update the user.
    const { error: updateError } = await supabase
      .from("users")
      .update({
        name: payload.name,
        email: payload.email,
      })
      .eq("id", user.id);
    if (updateError) {
      return new Response(JSON.stringify(updateError.message), {
        status: 500,
      });
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(fromZodError(error).message, { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
