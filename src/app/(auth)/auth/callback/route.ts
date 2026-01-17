import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import { createClient } from '@/utils/supabase/serverClient';

export async function GET(request: NextRequest) {
  // Get the code parameter from the URL
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  // If there's no code, redirect to error
  if (!code) {
    redirect('/auth/error?message=no-code');
  }

  // Initialize Supabase client
  const supabase = await createClient();

  // Exchange the code for a session
  // This establishes the auth state in the user's browser
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error('Error exchanging code for session:', error);
    redirect('/auth/error?message=error-exchanging-code-for-session');
  }

  // Redirect to the update password page
  // The auth session is now established with recovery state
  redirect('/update');
}
