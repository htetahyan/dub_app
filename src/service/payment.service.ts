import Stripe from "stripe";
import { prisma } from "~/utils/utils";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const createCheckoutSession = async (user: { id: number; email: string }, priceId: string) => {
  if (!user.id) {
    throw new Error("User ID is required");
  }

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/checkout-success",
      cancel_url: "http://localhost:3000",
      client_reference_id: user.id.toString(),
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_settings: {
          end_behavior: {
            missing_payment_method: "cancel",
          },
        },
      },
    });

    return stripeSession;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};

export const CreateWebhookStripe = async (signature: string, body: string) => {
    let event: Stripe.Event | null = null;
  
    try {
      // Construct Stripe Event
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_KEY!);
      console.log(event, 'event');
  
      // Handle only the checkout session completed event
      if (event.type === 'checkout.session.completed') {
        await handleCheckoutSessionCompleted(event);
      } else {
        console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      console.error('Error parsing webhook:', error);
    }
  };
  
  // Handle checkout session completed event
  const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
    const session = event.data.object as Stripe.Checkout.Session;
  
    try {
      // Retrieve the subscription details
      const subscriptionId = session.subscription as string;
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const product = await stripe.products.retrieve(subscription.items.data[0].price.product as string);
  
      // Determine the credits based on the product or subscription
      // Example: Set credits to 100 for this subscription
      const creditsToAdd = 100; 
     await prisma.user.update({
        where: { id: parseInt(session.client_reference_id ?? '0', 10) },
        data: {
         isSubscribed: true,
        },
     })
      // Update or create Subscription record
      await prisma.subscription.upsert({
        where: { userId: parseInt(session.client_reference_id ?? '0', 10) },
        update: {
            
          userId: parseInt(session.client_reference_id ?? '0', 10),
          stripeId: subscription.id,
          status: subscription.status,
          currentPeriodStart: subscription.current_period_start
            ? new Date(subscription.current_period_start * 1000)
            : undefined,
          currentPeriodEnd: subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000)
            : undefined,
          cancelAtPeriodEnd: subscription.cancel_at_period_end || false,
          isActive: subscription.status === 'active',
          startDate: new Date(), // Set start date to now
          totalCredits: { increment: creditsToAdd }, // Add credits
          credits: { increment: creditsToAdd }, // Add credits
        },
        create: {
          planName: product.name,
          userId: parseInt(session.client_reference_id ?? '0', 10),
          stripeId: subscription.id,
          status: subscription.status,
          currentPeriodStart: subscription.current_period_start
            ? new Date(subscription.current_period_start * 1000)
            : undefined,
          currentPeriodEnd: subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000)
            : undefined,
          cancelAtPeriodEnd: subscription.cancel_at_period_end || false,
          isActive: subscription.status === 'active',
          startDate: new Date(), // Set start date to now
          totalCredits: creditsToAdd, // Set totalCredits initially
          credits: creditsToAdd, // Set credits initially
        },
      });
  
      // Create Payment record
      await prisma.payment.create({
        data: {
          userId: parseInt(session.client_reference_id ?? '0', 10),
          amount: (session.amount_total ?? 0) / 100, // Stripe amount is in cents
          paymentDate: new Date(), // Set payment date to now
          stripeCustomerId: session.customer as string,
          stripeChargeId: session.id, // Assuming session.id is used as charge ID
          status: 'succeeded',
        },
      });
  
    } catch (error) {
      console.error('Error handling checkout session completed event:', error);
    }
  };