// Imports
import type { Metadata } from "next";

import "./globals.css";
import { oi, outfit } from "@/lib/fonts";

import Header from "@/components/Header";


// Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
  
    <html lang="en">
      
      <body className={`${oi.variable} antialiased flex flex-col h-screen`}>

        <Header />
        
          <main className = "flex flex-grow flex-col p-10 pt-20">

            {children}
      
          </main>
      
      </body>
    
    </html>
  
  );

}
