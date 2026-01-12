// Handles user after confirming email
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

import { type EmailOtpType } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/serverClient';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    try {
      const supabase = await createClient();

      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      if (!error) {
        // redirect user to specified redirect URL or root of app
        redirect(next);
      }
    } catch {
      redirect(`/error?message=email-verification-failed`);
    }
  }

  redirect('/error?message=invalid-verification-link');
}
