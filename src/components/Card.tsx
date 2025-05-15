import { ReactNode } from "react"

interface CardProps {

    children: ReactNode
    className?: string

}

export default function Card({ children, className = "" }: CardProps){

    return (

        <div className = {`${className} bg-white rounded-2xl shadow-xl overflow-hidden max-w-100`}>{children}</div>

    )

}