"use client";

import { resetPassword } from "../login/actions";

import Form from "next/form";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";

import { useState } from "react";

import { outfit } from "@/lib/fonts";

export default function ResetPassword() {

  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);
  
  return (

    <>
    
      <div className = {`${outfit.className} text-lg flex flex-col items-center`}>

        <Form className = "flex flex-col items-center bg-white shadow-xl rounded-2xl p-10" action = {resetPassword}>

          <label htmlFor="email">Email:</label>
          <input className = "w-full my-2 p-2 border rounded-sm" id="email" name="email" type="email" required />

          <Turnstile siteKey = {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} onSuccess = {() => setIsTurnstileLoading(false)} />

          <button className = "my-2 border rounded-sm w-full mt-2 border border-gray-800 hover:bg-gray-800 hover:text-white rounded-md p-2 transition-all" type = "submit" disabled = {isTurnstileLoading}>{isTurnstileLoading ? "Loading" : "Reset password"}</button>

          <Link href = "/signup">New to Fuzzy Logic?  Sign up here.</Link>

        </Form>

      </div>

    </>

  )

}