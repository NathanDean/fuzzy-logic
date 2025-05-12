import { Sigmar } from "next/font/google";

const sigmar = Sigmar({
  weight: "400",
  subsets: ["latin"]
});

export default function Home() {
  
  return (

    <div className = "flex flex-col h-full items-center justify-center">

      <h1 className = {`${sigmar.className} text-8xl text-center px-1`}>
        
        fuzzy logic
      
      </h1>

    </div>
  
  );

}