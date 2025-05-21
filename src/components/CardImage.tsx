import Image from "next/image";

interface CardImageProps {

    src: string,
    alt: string,
    imageHeight?: "sm" | "md" | "lg",
    className?: string,
    showFullInfo?: boolean

}

export default function CardImage({ src, alt, imageHeight = "md", className = "", showFullInfo = false}: CardImageProps){

    const heightClass = !showFullInfo ? {
        sm: "h-48",
        md: "h-72", 
        lg: "h-96"
    }[imageHeight] : "";

    return (
        <Image 
            src = {`/${src}`} 
            fill = {showFullInfo}
            width = {showFullInfo ? undefined : 5000}
            height = {showFullInfo ? undefined : 5000}
            alt = {alt} 
            className = {`
                ${className} 
                ${!showFullInfo ? heightClass : "h-full w-full"} 
                object-center object-cover
            `}
        />
    )

}