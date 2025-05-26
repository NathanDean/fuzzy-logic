"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {

  const supabase = await createClient()

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const turnstileToken = formData.get("cf-turnstile-response");

  
  //Validation

  if(!email || typeof email != "string"){

    return { error: "Email is required" };

  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) {
  
    return { error: "Please enter a valid email address" };

  }

  if(!password || typeof password != "string"){

    return { error: "Password is required" };

  }

  if (password.length < 8) {

    return { error: "Password must be 8 or more characters long" };

  }

  if (password !== confirmPassword) {

    return { error: "Passwords must match" };

  }

  if (!turnstileToken || typeof turnstileToken !== "string") {

    return { error: "CAPTCHA verification failed: Missing token" };

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

    console.error("Error signing up:", error)

    if(error.code?.includes("captcha_failed")){

      return { error: "Captcha verification failed, please refresh the page and try again."}

    }

    if(error.code?.includes("rate_limit")){

      return { error: "Too many requests, please try again in a few minutes."}

    }

    return { error: "Error signing up, please refresh the page and try again." }

  }

  revalidatePath("/", "layout")

  redirect("/auth/success?message=signup-successful")

}


export async function login(formData: FormData) {

  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");
  const turnstileToken = formData.get("cf-turnstile-response");

  
  //Validation

  if(!email || typeof email != "string"){

    return { error: "Email is required" };

  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) {
  
    return { error: "Please enter a valid email address" };

  }

  if(!password || typeof password != "string"){

    return { error: "Password is required" };

  }

  if (password.length < 8) {

    return { error: "Password must be 8 or more characters long" };

  }

  if (!turnstileToken || typeof turnstileToken !== "string") {

    return { error: "CAPTCHA verification failed: Missing token" };

  }

  // Supabase sign in function
  const { error } = await supabase.auth.signInWithPassword({
    
    email,
    password,
    options: {
      captchaToken: turnstileToken
    }

  });

  if (error) {

    console.error("Error logging in", error);

    if(error.code?.includes("invalid_credentials")){

      return { error: "Invalid email or password, please try again."}

    }

    if(error.code?.includes("email_not_confirmed")){

      return { error: "Email address not confirmed, please check your inbox for a confirmation email."}

    }

    if(error.code?.includes("captcha_failed")){

      return { error: "Captcha verification failed, please refresh the page and try again."}

    }

    return { error: "Error logging in, please refresh the page and try again." };

  }

  return { success: true };

}


export async function resetPassword(formData: FormData){

  const supabase = await createClient();

  const email = formData.get("email");
  const turnstileToken = formData.get("cf-turnstile-response");

  
  //Validation

  if(!email || typeof email != "string"){

    return { error: "Email is required" };

  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) {
  
    return { error: "Please enter a valid email address" };

  }

  if (!turnstileToken || typeof turnstileToken !== "string") {

    return { error: "CAPTCHA verification failed: Missing token" };

  }


  // Supabase password reset function
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    captchaToken: turnstileToken,
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`
  });

  if (error) {

    console.error("Error resetting password:", error);

    if(error.code?.includes("captcha_failed")){

      return { error: "Captcha verification failed, please refresh the page and try again."}

    }

    if(error.code?.includes("rate_limit")){

      return { error: "Too many requests, please try again in a few minutes."}

    }

    return { error: "Error requesting password reset, please refresh the page and try again" };

  }

  revalidatePath("/", "layout");
  redirect("/auth/success?message=password-reset-request-successful")

}

export async function updatePassword(formData: FormData){

  const supabase = await createClient();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  
  if(!password || typeof password != "string"){

    return { error: "Password is required" };

  }

  if (password.length < 8) {

    return { error: "Password must be 8 or more characters long" };

  }

  if (password !== confirmPassword) {

    return { error: "Passwords must match" };

  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {

    console.error("Error updating password:", error);

    if(error.code?.includes("same_password")){

      return { error: "New password must be different to previous password."}

    }

    if(error.code?.includes("invalid_credentials") || error.code?.includes("user_not_found")){

      return { error: "Your session has expired, please request a new password reset email."}

    }

    return { error: "Error updating password, please refresh the page and try again" };

  }

  revalidatePath("/", "layout");

  redirect("/auth/success?message=password-update-successful");

}