"use client"

import { signup } from "../login/actions";
import Link from "next/link";
import Form from "next/form";
import { Turnstile } from "@marsidev/react-turnstile";

import { useState } from "react";

import { outfit } from "@/lib/fonts";


export default function SignUpPage() {

  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);
  

  return (

    <div className = {`${outfit.className} text-lg flex flex-col items-center`}>

      <Form className = "flex flex-col items-center bg-white shadow-xl rounded-2xl p-10" action = {signup}>

        <label htmlFor="firstName">First name:</label>
        <input className = "w-full my-2 p-2 border rounded-sm" id="firstName" name="firstName" type="text" required />

        <label htmlFor="lastName">Last name:</label>
        <input className = "w-full my-2 p-2 border rounded-sm" id="lastName" name="lastName" type="text" required />
        
        <label htmlFor="email">Email:</label>
        <input className = "w-full my-2 p-2 border rounded-sm" id="email" name="email" type="email" required />

        <label htmlFor="password">Password:</label>
        <input className = "w-full my-2 p-2 border rounded-sm" id="password" name="password" type="password" required />

        <label htmlFor="confirmPassword">Confirm password:</label>
        <input className = "w-full mt-2 mb-4 p-2 border rounded-sm" id="confirmPassword" name="confirmPassword" type="password" required />

        <Turnstile siteKey = {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} onSuccess = {() => setIsTurnstileLoading(false)} />

        <button className = "my-2 border rounded-sm w-full mt-2 border border-gray-800 hover:bg-gray-800 hover:text-white rounded-md p-2 transition-all" type = "submit" disabled = {isTurnstileLoading}>{isTurnstileLoading ? "Loading" : "Sign up"}</button>

        <Link href = "/login">Already have an account?  Log in here.</Link>

      </Form>

    </div>

  )

}