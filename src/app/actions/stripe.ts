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
  
  }

export async function createCheckoutSession(workshopId: string, userId: string){

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    const getworkshop = async (workshopId: string): Promise<Workshop> => {
    
        const supabase = await createClient();
    
        const { data: workshop, error } = await supabase
          .from("workshops")
          .select("*")
          .eq("id", workshopId)
          .single();
      
        if(error){
      
          throw new Error(`Error fetching workshop: ${error.message}`);
      
        }

        if (!workshop) {
            
            throw new Error(`Workshop not found with ID: ${workshopId}`);
          
        }

        return workshop
    
    }

    // Create temporary booking
    const supabaseAdmin = createAdminClient();

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
    
    const workshop = await getworkshop(workshopId);
    
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
        metadata: {
    
            workshop_id: workshop.id,
            workshop_price: workshop.price,
            user_id: userId
    
        }
    
    })

    return { sessionId: session.id, url: session.url }

}