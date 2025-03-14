import { Oi } from "next/font/google";


// Fonts
const oi = Oi({
  weight: "400",
  variable: "--font-oi",
  subsets: ["latin"]
});

export default function Home() {
  
  return (

    <div className = "flex flex-col h-screen items-center justify-center">

      <h1 className = {`${oi.className} text-5xl text-center px-1`}>fuzzy logic</h1>

      <p className = {`${oi.className} text-2xl text-center mt-4`}>coming soon</p>

    </div>
  
  );

}