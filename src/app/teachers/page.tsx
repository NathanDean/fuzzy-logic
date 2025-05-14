"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabase/supabaseClient";
import Loading from "@/components/Loading";
import PersonCard from "@/components/PersonCard";

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

        async function fetchTeam(){
    
          try {
    
            const { data, error } = await supabase
              .from("team")
              .select("*");
    
            if(error){
              throw error;
            }
    
            if(data){
              setPeople(data);
            }
    
          } catch(error){
    
            console.error("Error fetching team:", error)
    
          } finally {
    
            setLoading(false)
    
          }
    
        }
    
        fetchTeam();
    
    }, []);
    
  return(

    <div className = "flex flex-col h-full items-center justify-center">

      {loading ? (

        <Loading />

      ) : (
      
        <div className = "flex flex-wrap gap-8 max-w-screen-xl justify-center">

          {people.map((person) => (

            <PersonCard key = {person.id} person = {person} />

          ))}

        </div>

      )}

    </div>

  )
    
}