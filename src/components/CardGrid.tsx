import { ReactNode } from "react";

interface CardGridProps {

    children: ReactNode

}

export default function CardGrid({ children }: CardGridProps){

    return <div className = "grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">{children}</div>

}