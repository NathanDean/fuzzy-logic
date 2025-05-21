"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
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
    const router = useRouter();

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

    return (

        <CardGrid cardWidth = "xl" imageHeight = "lg" cols = {1}>
        
          <WorkshopDetailsCard
              key = {workshop.id}
              workshop = {workshop}
              onBookNow = {handleBookNow}
          />

        </CardGrid>

    )
    
}