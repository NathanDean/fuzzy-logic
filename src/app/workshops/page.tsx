"use client";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import { Oi, Outfit } from "next/font/google";

const oi = Oi({
  weight: "400",
  variable: "--font-oi",
  subsets: ["latin"]
});

const outfit = Outfit({
  weight: "400",
  subsets: ["latin"]
})

interface Workshop {

  id: number,
  created_at: string,
  class_name: string,
  date: string,
  start_time: string,
  end_time: string,
  venue: string

}

export default function Workshops(){

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchWorkshops(){

      try {

        const { data, error } = await supabase
          .from("Workshops")
          .select("*");

        if(error){
          throw error;
        }

        if(data){
          setWorkshops(data);
        }

      } catch(error){

        console.error("Error fetching workshops:", error)

      } finally {

        setLoading(false)

      }

    }

    fetchWorkshops();

  }, [])

  console.log(workshops)

  return(

    <div className = "flex flex-col h-full items-center justify-center">

      <div className = "grid grid-cols-2 gap-8">

        {workshops.map((workshop) => (

          <div key = {workshop.id} className = "bg-white  p-6 mb-4 rounded-lg shadow-md hover:shadow-lg">
          
           <h2 className = {`${outfit.className} text-2xl mb 2`}>{workshop.class_name}</h2>
           <div className = {`${outfit.className}`}>
           
             <p>{workshop.date.split("-").reverse().join("/")}</p>
             <p>{workshop.start_time.substring(0, 5)}</p>
             <p>{workshop.venue}</p>
           
           </div>

          </div>

        ))}

      </div>

    </div>

  )

}