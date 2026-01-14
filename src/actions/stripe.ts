'use server';

import { PostgrestError } from '@supabase/supabase-js';
import Stripe from 'stripe';

import { createAdminClient } from '@/utils/supabase/adminClient';
import { createClient } from '@/utils/supabase/serverClient';
import type { Booking } from '@/utils/types/Booking';
import type { WorkshopWithRemainingPlaces } from '@/utils/types/Workshop';

async function getWorkshop(
  workshopId: string
): Promise<WorkshopWithRemainingPlaces | { error: string }> {
  const supabase = await createClient();

  // Get workshop details from Supabase
  const { data: workshop, error } = await supabase
    .from('workshops')
    .select('*, bookings:bookings(count)')
    .eq('id', workshopId)
    .single();

  if (error) {
    return { error: 'Error fetching workshop, please try again.' };
  }

  if (!workshop) {
    return { error: `Workshop not found with ID: ${workshopId}.` };
  }

  // Check whether there are places remaining on the workshop
  const places_remaining =
    workshop.max_places_available - (workshop.bookings?.[0]?.count || 0);

  return { ...workshop, places_remaining };
}

export async function createCheckoutSession(
  workshopId: string,
  userId: string
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();
  const result = await getWorkshop(workshopId);

  if ('error' in result) {
    return { error: 'Error creating checkout session, please try again' };
  }

  const workshop = result;

  // Check whether the workshop has places remaining
  if (workshop.places_remaining <= 0) {
    return { error: 'Sorry, this workshop is now sold out.' };
  }

  // Check for existing in progress booking
  const { data: existingBooking, error: existingBookingError } = (await supabase
    .from('bookings')
    .select('*')
    .match({
      workshop_id: workshopId,
      user_id: userId,
      status: 'in progress',
    })
    .limit(1)) as { data: Booking[] | null; error: PostgrestError | null };

  if (existingBookingError) {
    return { error: 'Error finding existing booking, please try again.' };
  }

  // If existing in progress booking has an active checkout session, retrieve it
  if (
    existingBooking &&
    existingBooking.length > 0 &&
    existingBooking[0].session_id
  ) {
    try {
      // Check for existing checkout session
      const existingSession = await stripe.checkout.sessions.retrieve(
        existingBooking[0].session_id
      );

      // If the session is active, return and continue to its checkout URL
      if (
        existingSession.status !== 'expired' &&
        existingSession.status !== 'complete'
      ) {
        return { url: existingSession.url };
      }
    } catch {
      return { error: 'Error retrieving checkout session, please try again' };
    }
  }

  // Otherwise, create new checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: workshop.class_name,
            description: workshop.description,
          },

          unit_amount: workshop.price * 100,
        },

        quantity: 1,
      },
    ],

    mode: 'payment',
    allow_promotion_codes: true,

    // URLs for redirection after session completed or cancelled
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,

    // Expire checkout session after 30 mins
    expires_at: Math.floor(Date.now() / 1000) + 60 * 30,

    // Pass workshop and user metadata to Stripe (to update booking after payment)
    metadata: {
      workshop_id: workshop.id,
      workshop_price: workshop.price,
      user_id: userId,
    },
  });

  // If existing in progress booking exists update it with new session ID
  if (existingBooking && existingBooking.length > 0) {
    const { error } = await supabaseAdmin
      .from('bookings')
      .update({ session_id: session.id })
      .match({
        workshop_id: workshopId,
        user_id: userId,
        status: 'in progress',
      });

    if (error) {
      return { error: `Error processing booking: ${error.message}` };
    }

    // Otherwise create new in progress booking
  } else {
    const { error } = await supabaseAdmin.from('bookings').insert({
      workshop_id: workshopId,
      user_id: userId,
      session_id: session.id,
      status: 'in progress',
    });

    if (error) {
      return { error: `Error processing booking: ${error.message}` };
    }
  }

  return { url: session.url };
}
