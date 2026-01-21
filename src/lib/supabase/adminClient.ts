import { type Database } from '@/types/database.types';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export const createAdminClient = (): SupabaseClient => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
};
