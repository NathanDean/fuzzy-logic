"use client"

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useState } from "react";

function ConfirmSignupComponent() {
  const searchParams = useSearchParams();
  const confirmationUrl = searchParams.get("confirmation_url");
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    if (confirmationUrl) {
      setIsConfirming(true);
      // Redirect to the actual Supabase confirmation URL
      window.location.href = confirmationUrl;
    }
  };

  if (!confirmationUrl) {
    return (
      <>
        <h1 className = "heading">Invalid confirmation link</h1>
        <p className = "medium-text">This confirmation link appears to be invalid or incomplete.</p>
        <p className = "medium-text">Please try clicking the link in your email again, or contact us if the problem continues.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="heading">Confirm your email address</h1>
      
      <p className = "medium-text">
        Thanks for signing up! Please confirm your email address by clicking the button below.
      </p>

      <button 
        className={`btn ${isConfirming ? "btn-disabled" : "btn-primary"}`}
        onClick={handleConfirm}
        disabled={isConfirming}
      >
        {isConfirming ? "Confirming..." : "Confirm Email"}
      </button>

      <p className="medium-text">
        {`If you have any problems signing up please get in touch.`}
      </p>
    </>
  );
}

export default function ConfirmSignupPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ConfirmSignupComponent />
    </Suspense>
  );
}