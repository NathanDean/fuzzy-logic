import { Oi, Outfit } from "next/font/google";
    
const oi = Oi({
  weight: "400",
  variable: "--font-oi",
  subsets: ["latin"]
});

const outfit = Outfit({
  weight: "400",
  subsets: ["latin"]
})

export default function About(){
    
    return(
    
        <div className = "flex flex-col h-full items-center justify-center">
    
            <h1 className = {`${oi.className} text-5xl text-center px-1`}>about</h1>
    
        </div>
    
    )
    
}