import Image from "next/image";

interface CardImageProps {

    src: string,
    alt: string,
    height?: "sm" | "md" | "lg",
    className?: string

}

export default function CardImage({ src, alt, height = "md", className = ""}: CardImageProps){

    const heightClass = {
        sm: "h-48",
        md: "h-72", 
        lg: "h-96"
    }[height];

    return <Image src = {`/${src}`} width = {500} height = {500} alt = {alt} className = {`${className} ${heightClass} object-cover`}  />

}