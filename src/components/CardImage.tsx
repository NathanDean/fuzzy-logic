import Image from "next/image";

interface CardImageProps {

    src: string,
    alt: string,
    height?: number,
    className?: string

}

export default function CardImage({ src, alt, height = 96, className = ""}: CardImageProps){

    return <Image src = {`/${src}`} width = {500} height = {500} alt = {alt} className = {`${className} h-${height} object-cover`}  />

}