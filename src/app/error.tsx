"use client"

export default function ErrorPage({ error }: { error: Error }) {

  return (
  
    <>
    
      <h1 className = "secondary">Sorry, something went wrong.</h1>

      <p>Error: {error.message ? error?.message : "Unknown error"}</p>

      <p>Please try again, if the problem continues please send us an email.</p>
    
    </>

  )

}