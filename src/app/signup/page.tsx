"use client"

import { signup } from "@/utils/auth/actions";
import Link from "next/link";
import Form from "next/form";
import { Turnstile } from "@marsidev/react-turnstile";
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import { dictionary } from '@zxcvbn-ts/language-common';
import { useEffect, useState } from "react";

zxcvbnOptions.setOptions({
  
  dictionary: {
  
    ...dictionary,
  
  },

});

export default function SignUpPage() {

  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordFeedback, setPasswordFeedback] = useState<string>("");

  useEffect(() => {

    if(password){

      const result = zxcvbn(password);

      setPasswordStrength(result.score);

      setPasswordFeedback(result.feedback.warning || "");

    } else {

      setPasswordStrength(0);
      setPasswordFeedback("")

    }

  }, [password])

    const getStrengthColor = (): string => {
    switch (passwordStrength) {
      case 0: return "bg-red-500";
      case 1: return "bg-orange-500";
      case 2: return "bg-yellow-500";
      case 3: return "bg-lime-500";
      case 4: return "bg-green-500";
      default: return "bg-gray-300";
    }
  };

    const getStrengthLabel = (): string => {
    switch (passwordStrength) {
      case 0: return "Very Weak";
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Strong";
      default: return "";
    }
  };  

  return (

    <div className = "text-lg flex flex-col items-center">

      <Form className = "flex flex-col items-center bg-white shadow-xl rounded-2xl p-10" action = {signup}>

        <label htmlFor="firstName">First name:</label>
        <input id="firstName" name="firstName" type="text" required />

        <label htmlFor="lastName">Last name:</label>
        <input id="lastName" name="lastName" type="text" required />
        
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label htmlFor="confirmPassword">Confirm password:</label>
        <input id="confirmPassword" name="confirmPassword" type="password" required />

        {password && (
          <div className="w-full mb-2">
            
            <div className="flex justify-between mb-1">
            
              <span>Password strength: {getStrengthLabel()}</span>
            
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
            
              <div className={`${getStrengthColor()} h-2.5 rounded-full transition-all`} 
                style={{ width: `${(passwordStrength + 1) * 20}%` }}></div>
            
            </div>
            
            {passwordFeedback && (
              <p className="text-red-500 text-sm mt-1">{passwordFeedback}</p>
            )}

          </div>

        )}

        <Turnstile siteKey = {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} onSuccess = {() => setIsTurnstileLoading(false)} />

        <button className = {`btn ${isTurnstileLoading || passwordStrength < 3 ? "btn-disabled" : "btn-primary"}`} type = "submit" disabled = {isTurnstileLoading || passwordStrength < 3}>
          
          {isTurnstileLoading 
            ? "Loading" 
            : passwordStrength < 3 
              ? "Password too weak" 
              : "Sign up"}</button>

        <Link href = "/login">Already have an account?  Log in here.</Link>

      </Form>

    </div>

  )

}