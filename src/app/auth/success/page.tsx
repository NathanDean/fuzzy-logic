"use client"

import { Suspense } from "react";
import { useSearchParams } from "next/navigation"
import Loading from "@/components/Loading";

function AuthSuccessComponent(){

    const searchParams = useSearchParams();
    const successCode = searchParams.get("message");

    const successMessages : { [key: string]: string[] } = {

        "signup-successful": ["Thanks for signing up.", "Please check your inbox and confirm your email address to continue.", "If you haven't received an email it may be in your junk folder, or you may have already signed up with this email address."],
        "password-reset-request-successful": ["We've received your password reset request.", "If this email address is registered to an account we'll send you a password reset email.", "Please follow the instructions inside to continue."],
        "password-update-successful": ["Your password has been reset.", "Please login to continue."]

    }

    const displayMessages = successCode && successMessages[successCode] ? successMessages[successCode] : [] ;

    return (

        <>
        
            {displayMessages.length > 0 ? (
            
                <div className = "flex flex-col items-center space-y-1">
                
                    <h1 className = "heading">{displayMessages[0]}</h1>

                    {displayMessages[1] && <p className = "medium-text">{displayMessages[1]}</p>}

                    {displayMessages[2] && <p className = "medium-text">{displayMessages[2]}</p>}

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