"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createCheckoutSession } from "../../actions/stripe"
import WorkshopDetailsCard from "@/components/WorkshopDetailsCard"
import CardGrid from "@/components/CardGrid"

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

export default function WorkshopClientWrapper({ workshop }: { workshop: Workshop }){

    const { user, isLoggedIn } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const router = useRouter();

    const handleBookNow = async(workshopId: string) => {

      setErrorMessage("");
  
      if(!isLoggedIn || !user){
  
        router.push("/login");
        return;
  
      }

      const result = await createCheckoutSession(workshopId, user.id);

      if (result.error) {

        console.error("Error creating checkout session:", result.error);
        setErrorMessage(result.error);
        return;

      }  
  
      if(result.url){
  
        window.location.href = result.url
  
      }
  
    }

    return (

        <CardGrid cardWidth = "xl" imageHeight = "lg" cols = {1}>

          {errorMessage && <p className = "error">{errorMessage}</p>}
        
          <WorkshopDetailsCard
              key = {workshop.id}
              workshop = {workshop}
              onBookNow = {handleBookNow}
          />

        </CardGrid>

    )
    
}