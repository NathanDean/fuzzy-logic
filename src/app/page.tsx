import { Oi } from "next/font/google";

const oi = Oi({
  weight: "400",
  variable: "--font-oi",
  subsets: ["latin"]
});

export default function Home() {
  
  return (

    <div className = "flex flex-col h-full items-center justify-center">

      <h1 className = {`${oi.className} text-5xl text-center px-1`}>
        
        fuzzy logic
      
      </h1>

    </div>
  
  );

}