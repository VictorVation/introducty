import * as z from "zod";

// import { postPatchSchema } from "~/lib/validations/post";
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
      .from("Sites")
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

// export async function PATCH(
//   req: Request,
//   context: z.infer<typeof routeContextSchema>
// ) {
//   try {
//     // Validate route params.
//     const { params } = routeContextSchema.parse(context);

//     // Check if the user has access to this post.
//     if (!(await verifyCurrentUserHasAccessToSite(params.postId))) {
//       return new Response(null, { status: 403 });
//     }

//     // Get the request body and validate it.
//     const json = await req.json();
//     const body = postPatchSchema.parse(json);

//     // Update the post.
//     // TODO: Implement sanitization for content.
//     await db.post.update({
//       where: {
//         id: params.postId,
//       },
//       data: {
//         title: body.title,
//         content: body.content,
//       },
//     });

//     return new Response(null, { status: 200 });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return new Response(JSON.stringify(error.issues), { status: 422 });
//     }

//     return new Response(null, { status: 500 });
//   }
// }

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
    .from("Sites")
    .select("*", { count: "exact", head: true })
    .match({ creator_id: authUser.id, id: siteId });

  if (!count) {
    return false;
  }
  return count > 0;
}
