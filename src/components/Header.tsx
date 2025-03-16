"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function Header(){

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuOpaque, setIsMenuOpaque] = useState(false);

  useEffect(() => {

    if(isMenuOpen){

      setIsMenuVisible(true)

      const timer = setTimeout(() => {

        setIsMenuOpaque(true);

      }, 10);

      return () => clearTimeout(timer);

    } else {

      setIsMenuOpaque(false);

      const timer = setTimeout(() => {

        setIsMenuVisible(false);

      }, 300);

      return () => clearTimeout(timer);

    }

  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (

    <header className = "relative z-10 bg-white dark:bg-gray-900 py-4">

      <div className = "px-6 flex justify-between items-center">

        {/* Logo */}
        <Link href = "/" className = {`${oi.className} text-2xl`}  onClick = {() => setIsMenuOpen(false)}>fuzzy logic</Link>

        {/* Full nav menu */}
        <nav className = {`${outfit.className} hidden sm:flex space-x-6 text-xl tracking-wider`}>
          
          <Link href = "/workshops" className = "hover:text-blue-500 transition">Workshops</Link>
          
          <Link href = "/teachers" className = "hover:text-blue-500 transition">Teachers</Link>
          
          <Link href = "/about" className = "hover:text-blue-500 transition">About</Link>

        </nav>

        {/* Mobile menu button */}

        <button className = "sm:hidden" onClick = {toggleMenu} aria-label = "Toggle menu">

          <svg className = "w-6 h-6" fill = "none" stroke = "currentColor" viewBox = "0 0 24 24" xmlns = "http://www.w3.org/2000/svg">
          
            {isMenuOpen ? (
                // X icon when menu is open
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                // Hamburger icon when menu is closed
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
          
          </svg>

        </button>

      </div>

      {/* Mobile dropdown menu */}

      {isMenuVisible && (

        <div className = {`sm:hidden absolute w-full h-screen bg-white p-6 transition-opacity duration-300 ease-in-out z-20
        
        ${isMenuOpaque ? "opacity-100" : "opacity-0"}
        
        `}>

          <nav className = {`${outfit.className} flex flex-col space-y-6 text-xl tracking-wider`}>
                    
            <Link href = "/workshops" className = "hover:text-blue-500 transition" onClick = {() => setIsMenuOpen(false)}>Workshops</Link>

            <Link href = "/teachers" className = "hover:text-blue-500 transition" onClick = {() => setIsMenuOpen(false)}>Teachers</Link>

            <Link href = "/about" className = "hover:text-blue-500 transition" onClick = {() => setIsMenuOpen(false)}>About</Link>

          </nav>

        </div>

      )}

    </header>

  )

}