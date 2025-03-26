"use client";

import { login } from "./actions";

import Form from "next/form";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";

import { outfit } from "@/lib/fonts";

export default function LoginPage() {

  return (

    <>
    
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

      <div className = {`${outfit.className} text-lg flex flex-col items-center`}>

        <Form className = "flex flex-col items-center bg-white shadow-xl rounded-2xl p-10" action = {login}>

          <label htmlFor="email">Email:</label>
          <input className = "w-full my-2 p-2 border rounded-sm" id="email" name="email" type="email" required />

          <label htmlFor="password">Password:</label>
          <input className = "w-full mt-2 p-2 mb-4 border rounded-sm" id="password" name="password" type="password" required />

          <Turnstile siteKey = "0x4AAAAAABBPVejNx7Dn7R6Z" />

          <button className = "my-2 border rounded-sm w-full mt-2 border border-gray-800 hover:bg-gray-800 hover:text-white rounded-md p-2 transition-all" type = "submit">Log in</button>

          <Link href = "/signup">New to Fuzzy Logic?  Sign up here.</Link>


        </Form>

      </div>

    </>

  )

}