"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
<<<<<<< HEAD
import { verifyTurnstileToken } from "@/utils/turnstile";

=======
>>>>>>> main

export async function signup(formData: FormData) {

  const supabase = await createClient()

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const turnstileToken = formData.get("cf-turnstile-response");

  
  //Validation

  if(!email || typeof email != "string"){

    throw new Error("Email is required");

  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) {
  
    throw new Error("Please enter a valid email address");

  }

  if(!password || typeof password != "string"){

    throw new Error("Password is required");

  }

  if (password.length < 8) {

    throw new Error("Password must be 8 or more characters long");

  }

  if (!turnstileToken || typeof turnstileToken !== "string") {

    throw new Error("CAPTCHA verification failed: Missing token");

  }


  // Sign up with Supabase Auth
  const { error } = await supabase.auth.signUp({

    email: email as string,
    password: password as string,
    options: {
      captchaToken: turnstileToken,
      data: {
        first_name: firstName as string,
        last_name: lastName as string
      }
    }

  });

  if (error) {

    console.log("Error signing up:")
    console.error(error);
    redirect("/error");

  }

  revalidatePath("/", "layout")

  redirect("/")

}


export async function login(formData: FormData) {

  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");
  const turnstileToken = formData.get("cf-turnstile-response");

  
  //Validation

  if(!email || typeof email != "string"){

    throw new Error("Email is required");

  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) {
  
    throw new Error("Please enter a valid email address");

  }

  if(!password || typeof password != "string"){

    throw new Error("Password is required");

  }

  if (password.length < 8) {

    throw new Error("Password must be 8 or more characters long");

  }

  if (!turnstileToken || typeof turnstileToken !== "string") {

    throw new Error("CAPTCHA verification failed: Missing token");

  }

<<<<<<< HEAD
  const isTurnstileTokenValid = await verifyTurnstileToken(turnstileToken);

  if (!isTurnstileTokenValid) {

    throw new Error("CAPTCHA verification failed: Invalid token");

  }

=======
>>>>>>> main

  // Supabase sign in function
  const { error } = await supabase.auth.signInWithPassword({
    
    email,
    password,
    options: {
      captchaToken: turnstileToken
    }

  });

  if (error) {

    console.log("Error logging in:")
    console.error(error);
    redirect("/error");

  }

  revalidatePath("/", "layout");

  redirect("/");

}


export async function resetPassword(formData: FormData){

  const supabase = await createClient();

  const email = formData.get("email");
  const turnstileToken = formData.get("cf-turnstile-response");

  
  //Validation

  if(!email || typeof email != "string"){

    throw new Error("Email is required");

  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) {
  
    throw new Error("Please enter a valid email address");

  }

  if (!turnstileToken || typeof turnstileToken !== "string") {

    throw new Error("CAPTCHA verification failed: Missing token");

  }

<<<<<<< HEAD
  const isTurnstileTokenValid = await verifyTurnstileToken(turnstileToken);

  if (!isTurnstileTokenValid) {

    throw new Error("CAPTCHA verification failed: Invalid token");

  }
=======
>>>>>>> main

  // Supabase password reset function
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    captchaToken: turnstileToken,
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`
  });

  if (error) {

    console.log("Error resetting password:")
    console.error(error);
    redirect("/error");

  }

  revalidatePath("/", "layout");

  redirect("/");

}

export async function updatePassword(formData: FormData){

  const supabase = await createClient();
  const password = formData.get("password");
<<<<<<< HEAD
  const turnstileToken = formData.get("cf-turnstile-response");
=======
>>>>>>> main
  
  if(!password || typeof password != "string"){

    throw new Error("Password is required");

  }

  if (password.length < 8) {

    throw new Error("Password must be 8 or more characters long");

  }

<<<<<<< HEAD
  if (!turnstileToken || typeof turnstileToken !== "string") {

    throw new Error("CAPTCHA verification failed: Missing token");

  }

  const isTurnstileTokenValid = await verifyTurnstileToken(turnstileToken);

  if (!isTurnstileTokenValid) {

    throw new Error("CAPTCHA verification failed: Invalid token");

  }
=======
>>>>>>> main

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {

    console.log("Error updating password:");
    console.error(error);
    redirect("/error");

  }

  revalidatePath("/", "layout");

  redirect("/login");

}