"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { oi, outfit } from "@/lib/fonts";

interface Person {

    id: number,
    created_at: string,
    image_url: string,
    name: string,
    bio: string
  
  }

export default function Teachers(){

    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchPeople(){
    
          try {
    
            const { data, error } = await supabase
              .from("People")
              .select("*");
    
            if(error){
              throw error;
            }
    
            if(data){
              setPeople(data);
            }
    
          } catch(error){
    
            console.error("Error fetching people:", error)
    
          } finally {
    
            setLoading(false)
    
          }
    
        }
    
        fetchPeople();
    
    }, []);
    
  return(

    <div className = "flex flex-col h-full items-center justify-center">

      {loading ? (

        <h1 className = {`${oi.className} text-5xl`}>loading...</h1>

      ) : (
      
        <div className = "flex flex-row gap-8 justify-items-center max-w-screen-xl">

          {people.map((person) => (

            <div key = {person.id} className = "bg-white rounded-2xl shadow-xl overflow-hidden">

            <img src = "/default-person-image.jpg" alt = {`${person.name}`} className = "w-full h-48 object-cover" />

              <div className = "p-6">
                
                <h2 className = {`${outfit.className} text-2xl font-medium`}>{person.name}</h2>
                
                <div className = {`${outfit.className}`}>

                  <p className = "py-2">{person.bio}</p>
                
                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  )
    
}