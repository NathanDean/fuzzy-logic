"use client";

import Link from "next/link";
import { useState } from "react";
import { Oi, Outfit } from "next/font/google";

const oi = Oi({
  weight: "400",
  variable: "--font-oi",
  subsets: ["latin"]
});

const cardo = Outfit({
  weight: "400",
  subsets: ["latin"]
})

export default function Header(){

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (

    <header className = "bg-white dark:bg-gray-900 py-4">

      <div className = "px-6 flex justify-between items-center">

        {/* Logo */}
        <Link href = "/" className = {`${oi.className} text-2xl`}>Fuzzy Logic</Link>

        {/* Nav menu */}
        <nav className = {`${cardo.className} flex space-x-6 text-xl tracking-wider`}>
          
          <Link href = "/workshops" className = "hover:text-blue-500 transition">Workshops</Link>
          
          <Link href = "/teachers" className = "hover:text-blue-500 transition">Teachers</Link>
          
          <Link href = "/about" className = "hover:text-blue-500 transition">About</Link>

        </nav>

      </div>

    </header>

  )

}