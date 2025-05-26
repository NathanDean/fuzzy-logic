// Imports
import type { Metadata } from "next";

import "./globals.css";
import { sigmar } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      
      <body className={`${sigmar} antialiased flex flex-col h-screen`}>

        <AuthProvider>
        
        <Header />
        
          <main className = "flex flex-grow flex-col items-center justify-center p-10 pt-20">

            {children}
      
          </main>

        </AuthProvider>

        <Footer />
              
      </body>
    
    </html>
  
  );

}
