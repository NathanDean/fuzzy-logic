// src/utils/mailing-list/actions.ts
'use server';

import { createClient } from '@/lib/supabase/serverClient';
import { z } from 'zod';

const mailingListSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export async function subscribeToMailingList(
  formData: FormData
): Promise<{ error: string } | { success: true }> {
  const supabase = await createClient();

  // Validate form input with Zod
  const validatedFields = mailingListSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0].message,
    };
  }

  // Extract validated input
  const { email } = validatedFields.data;

  // Insert email into database
  const { error } = await supabase.from('mailing_list').insert({ email });

  // Handle error
  if (error) {
    return { error: 'Failed to subscribe. Please try again.' };
  }

  return { success: true };
}
