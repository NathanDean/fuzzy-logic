"use client"

import { Suspense } from "react";
import { useSearchParams } from "next/navigation"
import Loading from "@/components/Loading";

function AuthSuccessComponent(){

    const searchParams = useSearchParams();
    const successCode = searchParams.get("message");

    const successMessages : { [key: string]: string[] } = {

        "signup-successful": ["Thanks for signing up.", "Please check your inbox and confirm your email address to continue."],
        "password-reset-request-successful": ["We've received your password reset request.", "Please check your inbox for a password reset email and follow the instructions inside to continue."],
        "password-update-successful": ["Your password has been reset.", "Please login to continue."]

    }

    const displayMessages = successCode && successMessages[successCode] ? successMessages[successCode] : [] ;

    return (

        <>
        
            {displayMessages.length > 0 ? (
            
                <div className = "flex flex-col items-center space-y-1">
                
                    <h1 className = "heading">{displayMessages[0]}</h1>

                    {displayMessages[1] && <p className = "medium-text">{displayMessages[1]}</p>}

                </div>

            ) : (

                <h1 className = "heading">Invalid success code</h1>

            )}
        
        </>

    )

}

export default function AuthSuccess(){



    return (

        
        <Suspense fallback = {<Loading />}>

            <AuthSuccessComponent />

        </Suspense>


    )

}