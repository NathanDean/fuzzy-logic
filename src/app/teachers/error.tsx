"use client"

import { useEffect } from "react";

export default function Error({ error, reset}: {
    error: Error & { digest?: string}
    reset: () => void
}){

    useEffect(() => {

        console.error("People error:", error);
    
    }, [error])

    return (

        <>
        
            <h1 className = "secondary">Sorry, something went wrong.</h1>

            <p>Error loading people.  Please try again, if the problem continues please get in touch.</p>

            <button className = "btn btn-primary" onClick = {() => reset()}>Try again</button>
        
        </>

    )

}