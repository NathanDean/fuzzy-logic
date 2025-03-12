// Imports
import type { Metadata } from "next";

import "./globals.css";
import { Oi } from "next/font/google";


// Fonts
const oi = Oi({
  weight: "400",
  variable: "--font-oi",
  subsets: ["latin"]
});


// Metadata
export const metadata: Metadata = {
  title: "fuzzy logic",
  description: "fuzzy logic",
};


// Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
  
    <html lang="en">
      
      <body className={`${oi.variable} antialiased`}>
        
        {children}
      
      </body>
    
    </html>
  
  );

}
