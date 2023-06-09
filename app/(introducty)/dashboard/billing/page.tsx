import { redirect } from "next/navigation";

// import { stripe } from "~/lib/stripe";
// import { getUserSubscriptionPlan } from "~/lib/subscription";
import { DashboardHeader } from "~/components/DashboardHeader";
import { DashboardShell } from "~/components/DashboardShell";
import getUser from "~/lib/getUser";
import { getUserSubscriptionPlan } from "~/lib/getUserSubscriptionPlan";
import { BillingForm } from "./BillingForm";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    // // const stripePlan = await stripe.subscriptions.retrieve(
    // //   subscriptionPlan.stripeSubscriptionId
    // // );
    // isCanceled = stripePlan.cancel_at_period_end;
  }
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
