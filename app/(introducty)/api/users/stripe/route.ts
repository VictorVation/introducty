import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import getUser from "~/lib/getUser";

import { stripe } from "~/lib/stripe";
import { getUserSubscriptionPlan } from "~/lib/getUserSubscriptionPlan";
// import { absoluteUrl } from "@/lib/utils";

const billingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/billing`;

export async function GET(req: Request) {
  try {
    const authUser = await getUser();
    if (!authUser) {
      return new Response(null, { status: 403 });
    }

    const subscriptionPlan = await getUserSubscriptionPlan(authUser.id);

    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      return new Response(JSON.stringify({ url: stripeSession.url }));
    }

    // The user is on the free plan.
    // Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url:
        billingUrl + "/?success=true&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: billingUrl + "/?canceled=true",
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: authUser.email,
      line_items: [
        {
          price: "price_1NBkWwFCei1YZE2rb3mHzq4t",
          quantity: 1,
        },
      ],
      metadata: {
        userId: authUser.id,
      },
    });

    return new Response(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(fromZodError(error).message, { status: 422 });
    }
    console.error(error);
    return new Response(null, { status: 500 });
  }
}
