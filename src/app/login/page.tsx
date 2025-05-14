"use client";

import { login } from "@/utils/auth/actions";

import Form from "next/form";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";

import { useState } from "react";

export default function LoginPage() {

  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);

  // Refreshes page to ensure header UI updates correctly
  const handleSubmit = async (formData: FormData) => {

    const result = await login(formData);
    
    if (result?.success) {
  
      window.location.href = "/";
  
    }
  
  };

  return (

    <>
    
      <div className = "text-lg flex flex-col items-center">

        <Form className = "flex flex-col items-center bg-white shadow-xl rounded-2xl p-10" action = {handleSubmit}>

          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />

          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />

          <div className = "mt-2">

            <Turnstile siteKey = {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} onSuccess = {() => setIsTurnstileLoading(false)} />

          </div>

          <button className = {`btn ${isTurnstileLoading ? "btn-disabled" : "btn-primary"}`} type = "submit" disabled = {isTurnstileLoading}>{isTurnstileLoading ? "Loading" : "Log in"}</button>

          <Link href = "/signup">New to Fuzzy Logic?  Sign up here.</Link>
          <Link href = "/reset">Reset your password.</Link>


        </Form>

      </div>

    </>

  )

}