// src/utils/mailing-list/actions.ts
"use server"

import { createClient } from "@/utils/supabase/server";

export async function subscribeToMailingList(formData: FormData) {

    const supabase = await createClient();

    const email = formData.get("email") as string;

    // Insert email into database
    const { error } = await supabase
        .from("mailing_list")
        .insert({ email });

    if (error) {
        return { error: "Failed to subscribe. Please try again." };
    }

    return { success: true };
    
}