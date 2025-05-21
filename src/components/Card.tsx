import { ReactNode } from "react"

interface CardProps {

    children: ReactNode
    className?: string
    imageHeight?: "sm" | "md" | "lg"

}

export default function Card({ children, className = "", imageHeight = "lg" }: CardProps){

    const imageHeightClass = {
    
        sm: "h-48",
        md: "h-72", 
        lg: "h-96"
    
    }[imageHeight]

    return (

        <div className = {`${className} ${imageHeightClass} h-full bg-white rounded-2xl shadow-xl overflow-hidden`}>{children}</div>

    )

}