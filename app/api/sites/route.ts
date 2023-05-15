import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { headers, cookies } from "next/headers";
import * as z from "zod";
import { fromZodError } from "zod-validation-error";
import getUser from "~/lib/getUser";
import { Database } from "~/types/supabase";

// import { RequiresProPlanError } from "@/lib/exceptions";
// import { getUserSubscriptionPlan } from "@/lib/subscription";

const siteCreateSchema = z.object({
  site_name: z.string().min(6, { message: "Must be 6" }).trim().optional(),
  // content: z.string().optional(),
});

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return new Response("Unauthorized", { status: 403 });
//     }

//     const { user } = session;
//     const sites = await db.site.findMany({
//       select: {
//         id: true,
//         title: true,
//         published: true,
//         createdAt: true,
//       },
//       where: {
//         authorId: user.id,
//       },
//     });

//     return new Response(JSON.stringify(sites));
//   } catch (error) {
//     return new Response(null, { status: 500 });
//   }
// }

export async function POST(req: Request) {
  try {
    const authUser = await getUser();
    if (!authUser) {
      return new Response("Unauthorized", { status: 403 });
    }

    const supabase = createRouteHandlerSupabaseClient<Database>({
      headers,
      cookies,
    });

    // const { user } = session;
    const subscriptionPlan = { isPro: false }; // await getUserSubscriptionPlan(user.id);

    // If user is on a free plan.
    // Check if user has reached limit of 3 sites.
    // if (!subscriptionPlan?.isPro) {
    //   const count = await supabase.from("sites").select(*).

    //   if (count >= 3) {
    //     throw new RequiresProPlanError();
    //   }
    // }

    const json = await req.json();
    const body = siteCreateSchema.parse(json);

    const siteName =
      body.site_name ??
      uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        style: "capital",
        separator: "",
      });
    const site = await supabase.from("sites").insert({
      site_name: siteName,
      creator_id: authUser.id,
    });

    return new Response(JSON.stringify(site));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(fromZodError(error).message, { status: 422 });
    }

    // if (error instanceof RequiresProPlanError) {
    //   return new Response("Requires Pro Plan", { status: 402 });
    // }

    return new Response(null, { status: 500 });
  }
}
