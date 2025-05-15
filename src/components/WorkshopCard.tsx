import Link from "next/link";
import Card from "./Card";
import CardImage from "./CardImage";

import dayjs from "dayjs";

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

interface WorkshopCardProps {

    workshop: Workshop,
    onBookNow: (id: string) => void,
    showFullInfo: boolean

}

export default function WorkshopCard({ workshop, onBookNow, showFullInfo}: WorkshopCardProps){

    const isSoldOut = workshop.max_places_available - workshop.bookings <= 0

    return (

        <Card>

            <div className = "flex flex-col h-full">
            
                {/* Image */}
                <CardImage 
                    src = "default-workshop-image.jpg" 
                    alt = "Workshop image"                     
                />

                {/* Text content */}
                <div className = "p-6 flex flex-col flex-grow">

                    <div className = "flex-grow">
                    
                        {/* Workshop name */}
                        <h2 className = "py-1">{workshop.class_name}</h2>
                        
                        {/* Date/time */}
                        <h3 className = "py-1">
                            {dayjs(`${workshop.date} ${workshop.start_time}`).format("ha on ddd Do MMM")}
                        </h3>
                        
                        {/* Venue */}
                        <h3 className = "py-1">{workshop.venue}</h3>

                        {/* Description */}
                        {showFullInfo && <p className = "py-1">{workshop.description}</p>}
                        

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
                            {!showFullInfo && (

                                <Link 
                                    href = {`workshops/${workshop.id}`} 
                                    className = "btn btn-primary"
                                >
                                    More info
                                </Link>

                            )}

                        </div>

                </div>       

            </div>

        </Card>

    )

}