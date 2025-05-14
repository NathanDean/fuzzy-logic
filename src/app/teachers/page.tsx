"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabase/supabaseClient";

interface TeamMember {

    id: number,
    created_at: string,
    image_url: string,
    name: string,
    bio: string
  
  }

export default function Teachers(){

    const [team, setTeam] = useState<TeamMember[]>([]);
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
              setTeam(data);
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

        <h1 className = "text-5xl">loading...</h1>

      ) : (
      
        <div className = "flex flex-wrap gap-8 max-w-screen-xl justify-center">

          {team.map((teamMember) => (

            <div key = {teamMember.id} className = "bg-white rounded-2xl shadow-xl overflow-hidden max-w-150">

            <img src = "/default-team-member-image.jpg" alt = {`${teamMember.name}`} className = "w-full h-75 object-cover" />

              <div className = "p-6">
                
                <h2 className = "font-medium">{teamMember.name}</h2>
                
                <div>

                  <p className = "py-2">{teamMember.bio}</p>
                
                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  )
    
}