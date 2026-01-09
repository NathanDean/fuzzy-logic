import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { PostgrestError } from '@supabase/supabase-js';
import Stripe from 'stripe';

import { createAdminClient } from '@/utils/supabase/admin';

interface Booking {
  id: string;
  created_at: string;
  workshop_id: string;
  user_id: string;
  status: string;
  session_id: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
  const supabase = createAdminClient();

  try {
    // Get Stripe request info
    const body = await req.text();

    const signature = (await headers()).get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('Event type:', event.type);
    } catch (error) {
      console.error('Webhook signature verification failed:', error);

      return NextResponse.json(
        { error: `Webhook signature verification failed: ${error}` },
        { status: 400 }
      );
    }

    // If payment completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const workshopId = session.metadata?.workshop_id;
      const userId = session.metadata?.user_id;

      if (workshopId && userId) {
        // Find matching "in progress" booking, update to "confirmed" and add payment_id
        const { error } = (await supabase
          .from('bookings')
          .update({
            session_id: session.id,
            status: 'confirmed',
          })
          .match({
            workshop_id: workshopId,
            user_id: userId,
            status: 'in progress',
          })) as { error: PostgrestError | null };

        if (error) {
          console.error('Error saving booking:', error);
        }
      }
    }

    // If payment expires or fails
    else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      const workshopId = session.metadata?.workshop_id;
      const userId = session.metadata?.user_id;
      const sessionId = session.id;

      if (workshopId && userId) {
        // Look for matching in progress booking
        const { data: existingBooking, error: existingBookingError } =
          (await supabase
            .from('bookings')
            .select('*')
            .match({
              workshop_id: workshopId,
              user_id: userId,
              status: 'in progress',
              session_id: sessionId,
            })
            .limit(1)) as {
            data: Booking[] | null;
            error: PostgrestError | null;
          };

        if (existingBookingError) {
          console.error(
            'Error finding existing booking:',
            existingBookingError
          );
          return;
        }

        // If the existing booking exists and has matching session ID, delete the booking
        if (existingBooking && existingBooking.length > 0) {
          const { error } = await supabase.from('bookings').delete().match({
            workshop_id: workshopId,
            user_id: userId,
            status: 'in progress',
            session_id: existingBooking[0].session_id,
          });

          if (error) {
            console.error('Error deleting booking:', error);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);

    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
