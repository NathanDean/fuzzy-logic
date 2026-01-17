// src/utils/mailing-list/actions.ts
'use server';

import { createClient } from '@/lib/supabase/serverClient';

export async function subscribeToMailingList(
  formData: FormData
): Promise<{ error: string } | { success: boolean }> {
  const supabase = await createClient();

  const email = formData.get('email') as string;

  // Insert email into database
  const { error } = await supabase.from('mailing_list').insert({ email });

  if (error) {
    return { error: 'Failed to subscribe. Please try again.' };
  }

  return { success: true };
}
