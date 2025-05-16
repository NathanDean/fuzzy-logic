import { ReactNode, Children, cloneElement, isValidElement } from "react";

interface CardGridProps {

    children: ReactNode,
    cardWidth: "sm" | "md" | "lg" | "xl",
    cols: 1 | 2 | 3

}

export default function CardGrid({ children, cardWidth = "md", cols = 2 }: CardGridProps) {

    const gridCols = {

        1: "md:grid-cols-1",
        2: "md:grid-cols-2",
        3: "md:grid-cols-3"

    }[cols]

    return (

        <div className={`grid grid-cols-1 ${gridCols} gap-10 pt-2`}>
        
            {Children.map(children, child => (
        
                <div className={`flex justify-center ${
                
                    cardWidth === "sm" ? "max-w-sm" :
                
                    cardWidth === "md" ? "max-w-md" :

                    cardWidth === "lg" ? "max-w-lg" : "max-w-4xl"
                
                }`}>
                
                    {child}
                
                </div>
                
            ))}
        
        </div>
    
    );

}