"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

type AuthContext = {

  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  signOut: () => Promise<void>;

};

// Create AuthContext with default values
const AuthContext = createContext<AuthContext>({

  user: null,
  isLoading: true,
  isLoggedIn: false,
  signOut: async () => {}

});

// Provider component to wrap round app
export function AuthProvider({children}: { children: ReactNode }){

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  // Checks for logged in user
  async function checkUser(){

    const supabase = createClient();

    try {

      // Checks for current session
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

    } catch (error) {

      console.error("Error fetching user", error);
      setUser(null);

    }

    setIsLoading(false);

    // Listens for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(

      async (_event, session) => {

        setUser(session?.user ?? null);

      }

    );

    // Clean up listener when component unmounts
    return () => {

      authListener.subscription.unsubscribe();

    }

  }


  // Checks for user when component renders
  useEffect(() => {

    checkUser();

  }, []);


  // Sign out function
  async function signOut(){

    try {

      const supabase = createClient();
      await supabase.auth.signOut();

    } catch (error) {

      console.error("Error signing out", error);

    }

    setUser(null)

  };

  const value = {

    user,
    isLoading,
    isLoggedIn: !!user,
    signOut,

  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export function useAuth(){

  return useContext(AuthContext);

}