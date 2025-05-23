import Link from "next/link";
import Card from "./Card";
import CardImage from "./CardImage";

import dayjs from "dayjs";

interface Workshop {

    id: string,
    created_at: string,
    class_name: string,
    teacher: string,
    course_type: string,
    date: string,
    start_time: string,
    end_time: string,
    venue: string,
    price: number,
    max_places_available: number,
    image_url: string
    description: string,
    bookings: number

}

interface WorkshopCardProps {

    workshop: Workshop,
    onBookNow: (id: string) => void,
    imageHeight?: "sm" | "md" | "lg"

}

export default function WorkshopCard({ workshop, onBookNow, imageHeight = "md"}: WorkshopCardProps){

    const isSoldOut = workshop.max_places_available - workshop.bookings <= 0

    return (

        <Card className = "w-full h-full" imageHeight = {imageHeight}>

            <div className = {`flex flex-col h-full`}>
            
                {/* Image */}
                
                <div className = "relative">
                
                    <CardImage 
                        src = {workshop.image_url}
                        alt = "Workshop image"
                        imageHeight = {imageHeight}
                    />

                </div>

                {/* Text content */}
                <div className = "p-6 flex flex-col flex-grow">

                    <div className = "flex-grow">
                    
                        {/* Workshop name */}
                        <h2 className = "py-1">{workshop.class_name}</h2>

                        <h3>with {workshop.teacher}</h3>
                        
                        <h3 className = "py-1">{workshop.course_type}</h3>
                        
                        {/* Date/time */}
                        <h3 className = "py-1">
                            Begins {dayjs(`${workshop.date} ${workshop.start_time}`).format("ha on ddd Do MMM")} at {workshop.venue}
                        </h3>
                        
                        {/* Venue */}
                        <h3 className = "py-1">£{workshop.price}</h3>                        

                    </div>

                    {/* Buttons */}
                    <div className = "flex sm:flex-row gap-3 mt-4">
                        
                        {/* Book now */}
                        <button 
                            className = {`btn ${workshop.max_places_available - workshop.bookings > 0 ? "btn-primary" : "btn-disabled"} rounded-md p-2 transition-all`}
                            onClick = {() => onBookNow(workshop.id)}
                            disabled = {

                                isSoldOut ? true : false

                            }>{isSoldOut ? "Sold out" : "Book now"}
                        </button>

                        {/* More info */}

                        <Link 
                            href = {`workshops/${workshop.id}`} 
                            className = "btn btn-primary"
                        >
                            More info
                        </Link>

                    </div>

                </div>       

            </div>

        </Card>

    )

}