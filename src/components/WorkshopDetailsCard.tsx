import dayjs from "dayjs";

import Card from "./Card"
import CardImage from "./CardImage"

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

interface WorkshopDetailsCardProps {

    workshop: Workshop,
    onBookNow: (id: string) => void,
    imageHeight?: "sm" | "md" | "lg"

}

export default function WorkshopDetailsCard({ workshop, onBookNow, imageHeight = "lg" }: WorkshopDetailsCardProps){

    const isSoldOut = workshop.max_places_available - workshop.bookings <= 0;

    return (

        <Card className = "w-full h-full md:min-h-[70vh] " imageHeight = {imageHeight}>

            <div className = "flex flex-col lg:flex-row h-full">
            
                {/* Image */}
                
                <div className = "h-96 lg:w-1/2 lg:h-auto relative">
                
                    <CardImage 
                        src = "default-workshop-image.jpg"
                        alt = "Workshop image"
                        showFullInfo = {true}
                    />

                </div>

                {/* Text content */}
                <div className = "p-6 flex flex-col flex-grow lg:w-1/2">

                    <div className = "flex-grow">
                    
                        {/* Workshop name */}
                        <h2 className = "py-1">{workshop.class_name}</h2>
                        
                        {/* Date/time */}
                        <h3 className = "py-1">
                            {dayjs(`${workshop.date} ${workshop.start_time}`).format("ha on ddd Do MMM")} at {workshop.venue}
                        </h3>
                        
                        {/* Venue */}
                        <h3 className = "py-1">£{workshop.price}</h3>

                        {/* Description */}
                        <p className = "py-1 detail-text">{workshop.description}</p>
                        

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

                        </div>

                </div>       

            </div>

        </Card>

    )

}