import { ReactNode } from "react"

interface CardProps {

    children: ReactNode

}

export default function Card({ children }: CardProps){

    return (

        <div className = "bg-white rounded-2xl shadow-xl overflow-hidden max-w-100">{children}</div>

    )

}