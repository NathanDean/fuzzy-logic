"use server"

import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

interface Workshop {

    id: string,
    created_at: string,
    class_name: string,
    date: string,
    start_time: string,
    end_time: string,
    venue: string,
    description: string,
    price: number
    places_remaining: number
  
  }

export async function createCheckoutSession(workshopId: string, userId: string){

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    const supabase = await createClient();
    const supabaseAdmin = createAdminClient();

    const getworkshop = async (workshopId: string): Promise<Workshop> => {
    
        // Get workshop details from Supabase
        const { data: workshop, error } = await supabase
          .from("workshops")
          .select("*, bookings:bookings(count)")
          .eq("id", workshopId)
          .single();
      
        if(error){
      
          throw new Error(`Error fetching workshop: ${error.message}`);
      
        }

        if (!workshop) {
            
            throw new Error(`Workshop not found with ID: ${workshopId}`);
          
        }

        // Check whether there are places remaining on the workshop
        const places_remaining = workshop.max_places_available - (workshop.bookings?.[0]?.count || 0);

        return { ...workshop, places_remaining }
    
    }
    
    const workshop = await getworkshop(workshopId);

    if(workshop.places_remaining <= 0){

        throw new Error("Sorry, this workshop is now sold out.")

    }

    // Create in progress booking if one does not already exist
    const { data: existingBooking, error: existingBookingError } = await supabase
        .from("bookings")
        .select("*")
        .match({
            workshop_id: workshopId,
            user_id: userId,
            status: "in progress"
        })

    if(existingBookingError){

        throw new Error(`Error checking for existing in progress booking: ${existingBookingError.message}`)

    }

    if(!existingBooking || existingBooking.length === 0){

        const { error } = await supabaseAdmin
        .from("bookings")
        .insert({
            workshop_id: workshopId,
            user_id: userId,
            status: "in progress"
        });
                  
        if(error){
            
            throw new Error(`Error processing booking: ${error.message}`);
                
        }

    }
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
    
        payment_method_types: ["card"],
        line_items: [
    
            {
    
                price_data: {
    
                    currency: "gbp",
                    product_data: {
    
                        name: workshop.class_name,
                        description: workshop.description
    
                    },
    
                    unit_amount: workshop.price * 100
    
                },
    
                quantity: 1
    
            }
    
        ],
    
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
        
        // Pass workshop and user metadata to Stripe (to update booking after payment)
        metadata: {
    
            workshop_id: workshop.id,
            workshop_price: workshop.price,
            user_id: userId
    
        }
    
    })

    return { sessionId: session.id, url: session.url }

}