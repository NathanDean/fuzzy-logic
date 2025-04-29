import { NextRequest, NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest){

    try {

        console.log("API call received")

        const body = await req.text();

        const signature = (await headers()).get("stripe-signature") as string;

        let event: Stripe.Event;

        try {

            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

            console.log("Constructed event")

        } catch (error) {

            console.error("Webhook signature verification failed:", error);

            return NextResponse.json({ error: `Webhook signature verification failed: ${error}` }, { status: 400 });

        }

        if(event.type === "checkout.session.completed"){

            console.log("Checkout completed")

            const session = event.data.object as Stripe.Checkout.Session;

            console.log(`session: ${session}`)

            const workshopId = session.metadata?.workshop_id;
            const userId = session.metadata?.user_id

            console.log(`workshopId: ${workshopId}, userId: ${userId}`)

            if(workshopId && userId){

                console.log("Creating booking...")
                
                const cookieStore = await cookies()
                
                const supabase = createServerClient(

                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.SUPABASE_SERVICE_ROLE_KEY!,
                    {
                      cookies: {
                        getAll() {
                          return cookieStore.getAll()
                        },
                        setAll(cookiesToSet) {
                          try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                              cookieStore.set(name, value, options)
                            )
                          } catch {
                            // The `setAll` method was called from a Server Component.
                            // This can be ignored if you have middleware refreshing
                            // user sessions.
                          }
                        },
                      },
                    }
                    
                  )

                const { error } = await supabase
                    .from("bookings")
                    .insert({

                        workshop_id: workshopId,
                        user_id: userId,
                        payment_id: session.id,
                        status: "confirmed"

                    })

                console.log("Booking created")

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