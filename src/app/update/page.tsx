"use client";

import { updatePassword } from "@/utils/auth/actions";
import Form from "next/form";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import { dictionary } from '@zxcvbn-ts/language-common';

zxcvbnOptions.setOptions({
  
  dictionary: {
  
    ...dictionary,
  
  },

});

export default function UpdatePassword() {

  const { user, isLoading } = useAuth();
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordFeedback, setPasswordFeedback] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      // Not logged in or in recovery state, redirect to login
      router.push("/login");
    }
  }, [isLoading, user, router]);

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

    <>
    
      <div className = "text-lg flex flex-col items-center">

        <Form className = "flex flex-col items-center bg-white shadow-xl rounded-2xl p-10" action = {updatePassword}>

          <label htmlFor="password">New password:</label>
          <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

          <label htmlFor="confirmPassword">Confirm new password:</label>
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

          <button className = "my-2 border rounded-sm w-full mt-2 border border-gray-800 hover:bg-gray-800 hover:text-white disabled:bg-gray-500 disabled:border-gray-500 disabled:hover:bg-gray-500 disabled:text-white rounded-md p-2 transition-all" type = "submit" disabled = {passwordStrength < 3}>
            
            {passwordStrength < 3 
              ? "Password too weak" 
              : "Update password"}</button>

          <Link href = "/signup">New to Fuzzy Logic?  Sign up here.</Link>

        </Form>

      </div>

    </>

  )

}