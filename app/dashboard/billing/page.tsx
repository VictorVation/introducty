import { redirect } from "next/navigation";

// import { stripe } from "~/lib/stripe";
// import { getUserSubscriptionPlan } from "~/lib/subscription";
import { BillingForm } from "./BillingForm";
import { DashboardHeader } from "~/components/DashboardHeader";
import { DashboardShell } from "~/components/DashboardShell";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
  //   const user = await getCurrentUser();

  //   if (!user) {
  //     redirect(authOptions?.pages?.signIn || "/login");
  //   }

  //   const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  //   if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
  //     const stripePlan = await stripe.subscriptions.retrieve(
  //       subscriptionPlan.stripeSubscriptionId
  //     );
  //     isCanceled = stripePlan.cancel_at_period_end;
  //   }
  const subscriptionPlan = {
    name: "Free",
    description:
      "The free plan is limited to 3 links with a minimum length of 6 characters. Upgrade to the PRO plan for unlimited posts and premium links (3-6 characters).",
    stripePriceId: "123",
    stripeCustomerId: "2",
    stripeSubscriptionId: "1",
  };
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-8">
        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
      </div>
    </DashboardShell>
  );
}
