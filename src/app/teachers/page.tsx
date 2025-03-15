import { Oi } from "next/font/google";
    
const oi = Oi({
  weight: "400",
  variable: "--font-oi",
  subsets: ["latin"]
});

export default function Teachers(){
    
    return(
    
        <div className = "flex flex-col h-full items-center justify-center">
    
            <h1 className = {`${oi.className} text-5xl text-center px-1`}>teachers</h1>
    
        </div>
    
    )
    
}