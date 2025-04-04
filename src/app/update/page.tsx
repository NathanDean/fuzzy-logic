"use client";

import { updatePassword } from "../login/actions";
import Form from "next/form";
import Link from "next/link";

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
    
      <div className = {`${outfit.className} text-lg flex flex-col items-center`}>

        <Form className = "flex flex-col items-center bg-white shadow-xl rounded-2xl p-10" action = {updatePassword}>

          <label htmlFor="password">New password:</label>
          <input className = "w-full mt-2 p-2 mb-4 border rounded-sm" id="password" name="password" type="password" required />

          <button className = "my-2 border rounded-sm w-full mt-2 border border-gray-800 hover:bg-gray-800 hover:text-white rounded-md p-2 transition-all" type = "submit">Update password</button>

          <Link href = "/signup">New to Fuzzy Logic?  Sign up here.</Link>

        </Form>

      </div>

    </>

  )

}