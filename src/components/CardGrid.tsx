import { ReactNode, Children, cloneElement, isValidElement } from "react";

interface CardGridProps {

    children: ReactNode,
    cardWidth?: "sm" | "md" | "lg" | "xl",
    imageHeight?: "sm" | "md" | "lg" 
    cols?: 1 | 2 | 3

}

export default function CardGrid({ children, cardWidth = "md", imageHeight = "lg", cols = 2 }: CardGridProps) {

    const gridCols = {

        1: "md:grid-cols-1",
        2: "md:grid-cols-2",
        3: "md:grid-cols-3"

    }[cols]

    const cardWidthClass = {

        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "sm:w-xl lg:w-3xl xl:w-5xl"

    }[cardWidth]

    const childrenWithProps = Children.map(children, child => {

        if (isValidElement(child)) {
        
            return cloneElement(child, { imageHeight });
        
        }
        
        return child;
    
    });

    return (

        <div className={`grid grid-cols-1 ${gridCols} gap-10 pt-2`}>
        
            {Children.map(childrenWithProps, child => (
        
                <div className={`flex justify-center ${cardWidthClass}`}>
                
                    {child}
                
                </div>
                
            ))}
        
        </div>
    
    );

}