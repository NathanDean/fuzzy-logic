import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createAdminClient } from "@/utils/supabase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest){

    try {

      // Get Stripe request info  
      const body = await req.text();

        const signature = (await headers()).get("stripe-signature") as string;

        let event: Stripe.Event;

        try {

            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

        } catch (error) {

            console.error("Webhook signature verification failed:", error);

            return NextResponse.json({ error: `Webhook signature verification failed: ${error}` }, { status: 400 });

        }

        // If payment completed
        if(event.type === "checkout.session.completed"){

            const session = event.data.object as Stripe.Checkout.Session;

            const workshopId = session.metadata?.workshop_id;
            const userId = session.metadata?.user_id

            if(workshopId && userId){

              const supabase = createAdminClient();
         
                // Find matching "in progress" booking, update to "confirmed" and add payment_id
                const { error } = await supabase
                    .from("bookings")
                    .update({

                        payment_id: session.id,
                        status: "confirmed"

                    })
                    .match({

                      workshop_id: workshopId,
                      user_id: userId,
                      status: "in progress"
                      
                    })
                    .select()

                if(error){

                    console.error("Error saving booking:", error);

                }

            }

        }

        return NextResponse.json({ received: true });

    } catch (error) {

        console.error("Webhook error:", error);

        return NextResponse.json(

            { error: "Webhook handler failed" },
            { status: 500 }

        )

    }

}