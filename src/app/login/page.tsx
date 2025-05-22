"use client";

import { login } from "@/utils/auth/actions";

import Form from "next/form";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { useState } from "react";
import { createCheckoutSession } from "@/app/actions/stripe";
import { createClient } from "@/utils/supabase/client";
import Loading from "@/components/Loading";

function LoginForm(){

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const workshopId = searchParams.get("workshopId")

  const handleSubmit = async (formData: FormData) => {

    setErrorMessage("");

    const result = await login(formData);
    
    if (result?.error) {

      setErrorMessage(result.error)

    }

    if (result?.success) {

      if(redirectTo === "workshop" && workshopId) {

        try {

          const supabase = createClient();
          const { data } = await supabase.auth.getUser();
          if(data.user){
            
            const user = data.user
            const { url } = await createCheckoutSession(workshopId, user.id)

            if(url){

              window.location.href = url;
              return;

            }

          }

        } catch (error) {

          console.error("Error creating checkout session:", error);

        }

      }

      window.location.href = "/";
    
    };

  }

  return (

    <>

        <Form action = {handleSubmit}>

          {redirectTo === "workshop" && workshopId && (
        
            <p className="text-center">Please login to complete your booking</p>
        
          )}

          { errorMessage && <p className = "error">{errorMessage}</p>}

          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />

          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />

          <div className = "turnstile">

            <Turnstile siteKey = {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} onSuccess = {() => setIsTurnstileLoading(false)} />

          </div>

          <button className = {`btn ${isTurnstileLoading ? "btn-disabled" : "btn-primary"}`} type = "submit" disabled = {isTurnstileLoading}>{isTurnstileLoading ? "Loading" : "Log in"}</button>

          <Link href = "/signup">New to Fuzzy Logic?  Sign up here.</Link>
          <Link href = "/reset">Reset your password.</Link>


        </Form>

    </>

  )

}


// Needs to be wrapped in suspense boundary to access URL params
export default function LoginPage() {

  return (
  
    <Suspense fallback = {<Loading />}>

      <LoginForm />

    </Suspense>

  )

}