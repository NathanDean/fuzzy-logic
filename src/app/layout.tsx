// Imports
import type { Metadata } from "next";

import "./globals.css";
import { oi } from "@/lib/fonts";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";

// Metadata
export const metadata: Metadata = {
  title: "Fuzzy Logic",
  description: "Fuzzy Logic",
};


// Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
  
    <html lang="en">
      
      <body className={`${oi.variable} antialiased flex flex-col h-screen`}>

        <AuthProvider>
        
        <Header />
        
          <main className = "flex flex-grow flex-col p-10 pt-20">

            {children}
      
          </main>

        </AuthProvider>
      
      </body>
    
    </html>
  
  );

}
