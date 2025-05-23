"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import supabase from "@/utils/supabase/supabaseClient"

import Loading from "@/components/Loading";
import Card from "@/components/Card";

dayjs.extend(advancedFormat);

interface Booking {

  id: string,
  created_at: string,
  workshop_id: string,
  user_id: string,
  status: string,
  session_id: string,
  workshop: {
    id: string,
    created_at: string,
    class_name: string,
    date: string,
    start_time: string,
    end_time: string,
    venue: string,
    price: number,
    max_places_available: number,
    description: string,
    bookings: number
  }

}

export default function Account(){

  const { user, isLoading, isLoggedIn } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isSupabaseLoading, setIsSupabaseLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const metadata = user?.user_metadata;

  useEffect(() => {

    // If no user after AuthContext loads, redirect to login page
    if(!isLoading && !isLoggedIn){

      router.push("/login");

    }

  }, [isLoading, isLoggedIn, router]);

  useEffect(() => {

    async function fetchBookings(){

      setErrorMessage("");

      if(!isLoading && user){

        try {
        
          const { data, error } = await supabase
            .from("bookings")
            .select("*, workshop:workshops(*)")
            .eq("user_id", user.id)
            .eq("status", "confirmed")

          if(error){
            throw error;
          }

          if(data){

            const futureBookings = data
            .filter(booking => 
              
              booking.workshop && 
              booking.workshop.date >= new Date().toISOString().split("T")[0]
            
            )
            .sort((a, b) => {
              
              // Sort by date
              if (a.workshop.date !== b.workshop.date) {

                return a.workshop.date.localeCompare(b.workshop.date);
              
              }
              
              // If same date sort by time
              return a.workshop.start_time.localeCompare(b.workshop.start_time);;
          })
            
            setBookings(futureBookings);

          }

        } catch(error) {
          
          console.error("Error fetching workshops", error);
          setErrorMessage("Error fetching bookings.  Please try refreshing the page, or contact us if the problem continues.")
          
        } finally {

          setIsSupabaseLoading(false);

        }

      }

    }

    fetchBookings();

  }, [isLoading, user]);


  return(

    <>

      {isLoading ? (

        <Loading />

      ) : (
      
        <div>

            <Card className = "p-6 text-lg sm:text-xl">
                
                <h1 className = "secondary">Account</h1>
                <p>Name: {metadata?.first_name} {metadata?.last_name}</p>
                <p>Email: {user?.email}</p>
                <p>Upcoming workshops:</p>

                {isSupabaseLoading ? (

                  <p>...</p>

                ) : (

                  <>
                  
                  {errorMessage && <p className = "error">{errorMessage}</p>}
                  
                  <ul className = "list-disc pl-5">

                    {bookings.map((booking) => (

                      booking.workshop ? (
                        <li key = {booking.id}>
                          {booking.workshop.class_name} - {dayjs(`${booking.workshop.date} ${booking.workshop.start_time}`).format("ha on ddd Do MMM")} at {booking.workshop.venue}
                        </li>
                      ) : null

                    ))}

                  </ul>

                  </>

                )}

            </Card>


        </div>

      )}

    </>

  )

}