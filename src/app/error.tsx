"use client"

import { useEffect } from "react";

export default function Error({ error, reset }: {
    error: Error & { digest?: string}
    reset: () => void
}){

    useEffect(() => {

        console.error("Root error:", error);
    
    }, [error])

    return (

        <>
        
            <h1 className = "secondary">Sorry, something went wrong.</h1>

            <p>Root error.  Please try again, if the problem continues please send us an email.</p>

            <button className = "btn btn-primary" onClick = {() => reset()}>Try again</button>
        
        </>

    )

}