'use server';

import { createAdminClient } from '@/lib/supabase/adminClient';
import { createClient } from '@/lib/supabase/serverClient';
import type { Booking } from '@/types/Booking';
import type { Workshop } from '@/types/Workshop';
import Stripe from 'stripe';

import { formatWorkshop } from '@/utils/transformers/formatWorkshop';

type BookingResult = { error: string } | void;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Get workshop details from Supabase
async function getWorkshop(
  workshopId: string
): Promise<Workshop | { error: string }> {
  const supabase = await createClient();

  const { data: workshopData, error } = await supabase
    .from('workshops')
    .select('*, bookings:bookings(count)')
    .eq('id', workshopId)
    .single();

  if (error) {
    return { error: 'Error fetching workshop, please try again.' };
  }

  if (!workshopData) {
    return { error: `Workshop not found with ID: ${workshopId}.` };
  }

  const workshop = formatWorkshop(workshopData);

  return workshop;
}

// Get details of existing booking from Supabase
async function getBooking(
  workshopId: string,
  userId: string
): Promise<Booking | { error: string } | void> {
  const supabase = await createClient();

  const { data: booking, error } = await supabase
    .from('bookings')
    .select('*')
    .match({
      workshop_id: workshopId,
      user_id: userId,
      status: 'in progress',
    })
    .maybeSingle(); // Returns 0 or 1 result

  if (error) {
    return { error: 'Error finding existing booking, please try again.' };
  }

  if (booking) {
    return booking;
  }
}

async function retrieveSession(
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
}

function getBookingDetails(
  workshop: Workshop,
  userId: string
): Stripe.Checkout.SessionCreateParams {
  return {
    // Basic details
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

    // Allow promotional codes
    allow_promotion_codes: true,

    // URLs for redirection after checkout session
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
  };
}

async function createSession(
  bookingDetails: Stripe.Checkout.SessionCreateParams
): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create(bookingDetails);
  return session;
}

// Create new booking in Supabase
async function createBooking(
  sessionId: string,
  workshopId: string,
  userId: string
): Promise<BookingResult> {
  const supabaseAdmin = createAdminClient();

  const { error } = await supabaseAdmin.from('bookings').insert({
    workshop_id: workshopId,
    user_id: userId,
    session_id: sessionId,
    status: 'in progress',
  });

  if (error) {
    return { error: `Error processing booking: ${error.message}` };
  }
}

// Update existing Supabase booking with new Stripe checkout session ID
async function updateBooking(
  sessionId: string,
  workshopId: string,
  userId: string
): Promise<BookingResult> {
  const supabaseAdmin = createAdminClient();
  const { error } = await supabaseAdmin
    .from('bookings')
    .update({ session_id: sessionId })
    .match({
      workshop_id: workshopId,
      user_id: userId,
      status: 'in progress',
    });

  if (error) {
    return { error: `Error processing booking: ${error.message}` };
  }
}

// Initialise Stripe checkout session
export async function getCheckoutSession(
  workshopId: string,
  userId: string
): Promise<{ error: string } | { url: string | null }> {
  // Get workshop details
  const workshop = await getWorkshop(workshopId);
  if ('error' in workshop) {
    return { error: workshop.error };
  }

  // Check if workshop is sold it
  if (workshop.is_sold_out) {
    return { error: 'Sorry, this workshop is now sold out.' };
  }

  // Check for existing in progress booking for workshop from current user
  const result = await getBooking(workshopId, userId);

  // If booking exists
  if (result) {
    if ('error' in result) {
      return { error: 'Error retrieving booking.' };
    }
    const booking = result;
    const sessionId = booking.session_id;

    // Check for matching active checkout session
    if (sessionId) {
      try {
        const session = await retrieveSession(sessionId);
        if (session.status !== 'expired' && session.status !== 'complete') {
          return { url: session.url };
        }
      } catch {
        return { error: 'Error retrieving checkout session, please try again' };
      }
    }

    // If no checkout session exists, create new session and add it to existing booking
    const bookingDetails = getBookingDetails(workshop, userId);
    const session = await createSession(bookingDetails);
    const updateBookingResult = await updateBooking(
      session.id,
      workshopId,
      userId
    );
    if (updateBookingResult && 'error' in updateBookingResult) {
      return { error: 'Error updating booking, please try again.' };
    }

    // Return checkout session URL
    return { url: session.url };
  }

  // If no booking exists, create new checkout session add to new booking
  const bookingDetails = getBookingDetails(workshop, userId);
  const session = await createSession(bookingDetails);
  const newBookingResult = await createBooking(session.id, workshopId, userId);
  if (newBookingResult && 'error' in newBookingResult) {
    return { error: 'Error creating booking, please try again.' };
  }

  // Return checkout session URL
  return { url: session.url };
}
