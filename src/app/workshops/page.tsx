"use client";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Oi, Outfit } from "next/font/google";

dayjs.extend(advancedFormat);

const oi = Oi({
  weight: "400",
  variable: "--font-oi",
  subsets: ["latin"]
});

const outfit = Outfit({
  weight: "variable",
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

      <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {workshops.map((workshop) => (

          <div key = {workshop.id} className = "bg-white rounded-2xl shadow-xl overflow-hidden">

          <img src = "/default-workshop-image.jpg" alt = "Workshop image" className = "w-full h-48 object-cover" />

            <div className = "p-6">
              
              <h2 className = {`${outfit.className} text-2xl font-medium`}>{workshop.class_name}</h2>
              
              <div className = {`${outfit.className}`}>
              
                {/* <p className = "text-center mb-1">{workshop.start_time.substring(0, 5)}, {workshop.date.split("-").reverse().join("/")} | {workshop.venue}</p>
                <p className = "mb-1"></p> */}

                <p className = "py-2">{dayjs(`${workshop.date} ${workshop.start_time}`).format("ha on ddd Do MMM")}</p>
                <p>{workshop.venue}</p>
              
              </div>

              <div className = "flex flex-col sm:flex-row gap-3 mt-4">
              
              <button className = {`${outfit.className} w-full sm:w-1/2 mt-2 border border-gray-800 hover:bg-gray-800 hover:text-white rounded-md p-2 transition-all`}>Book now</button>
              <button className = {`${outfit.className}  w-full sm:w-1/2 mt-2 border border-gray-800 hover:bg-gray-800 hover:text-white rounded-md p-2 transition-all`}>More info</button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}