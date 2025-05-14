"use client";

import { resetPassword } from "@/utils/auth/actions";

import Form from "next/form";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";

import { useState } from "react";

export default function ResetPassword() {

  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);
  
  return (

        <Form className = "flex flex-col items-center bg-white shadow-xl rounded-2xl p-10" action = {resetPassword}>

          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />

          <Turnstile siteKey = {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} onSuccess = {() => setIsTurnstileLoading(false)} />

          <button className = {`btn ${isTurnstileLoading ? "btn-disabled" : "btn-primary"}`} type = "submit" disabled = {isTurnstileLoading}>{isTurnstileLoading ? "Loading" : "Reset password"}</button>

          <Link href = "/signup">New to Fuzzy Logic?  Sign up here.</Link>

        </Form>

  )

}