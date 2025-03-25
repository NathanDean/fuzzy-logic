"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { oi, outfit } from "@/lib/fonts";

dayjs.extend(advancedFormat);

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
          .from("workshops")
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

  }, []);

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
                
                  <button className = {`${outfit.className} w-full sm:w-1/2 mt-2 border border-gray-800 hover:bg-gray-800 hover:text-white rounded-md p-2 transition-all`}>Book now</button>
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