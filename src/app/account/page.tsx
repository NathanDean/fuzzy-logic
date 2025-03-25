"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { oi, outfit } from "@/lib/fonts";

export default function Account(){

  const { user, isLoading, isLoggedIn } = useAuth();
  const router = useRouter();
  const metadata = user?.user_metadata;

  useEffect(() => {

    if(!isLoading && !isLoggedIn){

      router.push("/login");

    }

  }, [isLoading, isLoggedIn, router]);

  return(

    <div className = "flex flex-col h-full items-center justify-center">

      {isLoading ? (

        <h1 className = {`${oi.className} text-5xl`}>loading...</h1>

      ) : (
      
        <div className = {`${outfit.className} flex justify-center`}>

            <div className = "p-2 bg-white shadow-xl">

                <h1 className = "text-3xl font-medium">Account</h1>
                <p>Name: {metadata?.first_name} {metadata?.last_name}</p>
                <p>Email: {user?.email}</p>

            </div>

        </div>

      )}

    </div>

  )

}