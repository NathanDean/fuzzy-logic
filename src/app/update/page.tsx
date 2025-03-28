"use client";

import { updatePassword } from "../login/actions";
import Form from "next/form";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { outfit } from "@/lib/fonts";

export default function UpdatePassword() {

  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      // Not logged in or in recovery state, redirect to login
      router.push("/login");
    }
  }, [isLoading, user, router]);

  return (

    <>
    
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

      <div className = {`${outfit.className} text-lg flex flex-col items-center`}>

        <Form className = "flex flex-col items-center bg-white shadow-xl rounded-2xl p-10" action = {updatePassword}>

          <label htmlFor="password">New password:</label>
          <input className = "w-full mt-2 p-2 mb-4 border rounded-sm" id="password" name="password" type="password" required />

          <Turnstile siteKey = {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} />

          <button className = "my-2 border rounded-sm w-full mt-2 border border-gray-800 hover:bg-gray-800 hover:text-white rounded-md p-2 transition-all" type = "submit">Update password</button>

          <Link href = "/signup">New to Fuzzy Logic?  Sign up here.</Link>

        </Form>

      </div>

    </>

  )

}