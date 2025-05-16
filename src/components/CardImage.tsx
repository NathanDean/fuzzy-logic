import Image from "next/image";

interface CardImageProps {

    src: string,
    alt: string,
    height?: "sm" | "md" | "lg",
    className?: string,
    showFullInfo?: boolean

}

export default function CardImage({ src, alt, height = "md", className = "", showFullInfo = false}: CardImageProps){

    const heightClass = {
        sm: "h-48",
        md: "h-72", 
        lg: "h-96"
    }[height];

    return <Image src = {`/${src}`} width = {5000} height = {5000} alt = {alt} className = {`${className} ${heightClass} ${showFullInfo && "md:h-auto"} object-cover object-position-center`}  />

}