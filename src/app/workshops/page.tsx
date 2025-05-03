"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import supabase from "@/utils/supabase/supabaseClient";
import { createCheckoutSession } from "../actions/stripe";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { oi, outfit } from "@/lib/fonts";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

dayjs.extend(advancedFormat);

interface Workshop {

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

export default function Workshops(){

  const { user, isLoggedIn } = useAuth();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {

    async function fetchWorkshops(){

      try {

        const { data, error } = await supabase
          .from("workshops")
          .select("*, bookings:bookings(count)");

        if(error){
          throw error;
        }

        if(data){

          const workshopsWithCount = data.map(workshop => ({
            ...workshop,
            bookings: (workshop.bookings?.[0]?.count || 0)
          }));
          
          setWorkshops(workshopsWithCount);

        }

      } catch(error){

        console.error("Error fetching workshops:", error)

      } finally {

        setLoading(false)

      }

    }

    fetchWorkshops();

  }, []);

  const handleBookNow = async(workshopId: string) => {

    if(!isLoggedIn || !user){

      router.push("/login");
      return;

    }
    
    try {

      const { url } = await createCheckoutSession(workshopId, user.id);

      if(url){

        window.location.href = url

      }

    } catch(error){

      console.error("Error creating checkout session:", error);

    }

  }

  return(

    <div className = "flex flex-col h-full items-center justify-center">

      {loading ? (

        <h1 className = {`${oi.className} text-5xl`}>loading...</h1>

      ) : (
      
        <div className = "flex flex-wrap gap-8 max-w-screen-xl justify-center">

          {workshops.map((workshop) => (

            <div key = {workshop.id} className = "bg-white rounded-2xl shadow-xl overflow-hidden max-w-100">

            <img src = "/default-workshop-image.jpg" alt = "Workshop image" className = "w-full h-48 object-cover" />

              <div className = "p-6">
                
                <h2 className = {`${outfit.className} text-2xl font-medium`}>{workshop.class_name}</h2>
                
                <div className = {`${outfit.className}`}>

                  <p className = "py-2">{dayjs(`${workshop.date} ${workshop.start_time}`).format("ha on ddd Do MMM")}</p>
                  <p>{workshop.venue}</p>
                
                </div>

                <div className = "flex flex-col sm:flex-row gap-3 mt-4">
                
                  <button className = {`${outfit.className} w-full sm:w-1/2 mt-2 border ${workshop.max_places_available - workshop.bookings > 0 ? "border-gray-800 hover:bg-gray-800 hover:text-white" : "border-gray-400 bg-gray-400 text-white"} rounded-md p-2 transition-all`} onClick = {() => handleBookNow(workshop.id)} disabled = {

                    workshop.max_places_available - workshop.bookings > 0 ? false : true

                  }>{workshop.max_places_available - workshop.bookings > 0 ? "Book now" : "Sold out"}</button>

                  <Link href = {`workshops/${workshop.id}`} className = {`${outfit.className}  w-full sm:w-1/2 mt-2 border border-gray-800 hover:bg-gray-800 hover:text-white text-center rounded-md p-2 transition-all`}>More info</Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  )

}