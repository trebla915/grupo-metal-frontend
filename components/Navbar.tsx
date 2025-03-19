"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSpotify, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center h-24 relative">
          {/* Left Menu Items */}
          <div className="flex items-center absolute left-0">
            <Link href="#home" className="text-2xl uppercase tracking-wider hover:text-rose-600 transition-colors px-8">
              Home
            </Link>
            <Link href="#bio" className="text-2xl uppercase tracking-wider hover:text-rose-600 transition-colors px-8">
              Bio
            </Link>
            <Link href="#shows" className="text-2xl uppercase tracking-wider hover:text-rose-600 transition-colors px-8">
              Shows
            </Link>
          </div>

          {/* Center Logo */}
          <Link href="#home" className="mx-auto">
            <Image
              src="/site-logo.png"
              alt="Grupo Metal Logo"
              width={200}
              height={143}
              className="h-[5.5rem] w-auto transform hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>

          {/* Right Menu Items */}
          <div className="flex items-center absolute right-0">
            <Link href="#gallery" className="text-2xl uppercase tracking-wider hover:text-rose-600 transition-colors px-8">
              Gallery
            </Link>
            <Link href="#merch" className="text-2xl uppercase tracking-wider hover:text-rose-600 transition-colors px-8">
              Merch
            </Link>
            <div className="flex items-center pl-8">
              <a href="https://open.spotify.com/artist/your-id" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-rose-600 transition-colors px-4">
                <FaSpotify />
              </a>
              <a href="https://youtube.com/@your-channel" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-rose-600 transition-colors px-4">
                <FaYoutube />
              </a>
              <a href="https://instagram.com/your-handle" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-rose-600 transition-colors px-4">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between h-20">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link href="#home" className="absolute left-1/2 transform -translate-x-1/2">
            <Image
              src="/site-logo.png"
              alt="Grupo Metal Logo"
              width={80}
              height={60}
              className="h-16 w-auto"
              priority
            />
          </Link>

          <div className="w-6" /> {/* Spacer to balance the menu button */}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4 py-6">
              <Link href="#home" className="text-xl uppercase tracking-wider hover:text-rose-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="#bio" className="text-xl uppercase tracking-wider hover:text-rose-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Bio
              </Link>
              <Link href="#shows" className="text-xl uppercase tracking-wider hover:text-rose-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Shows
              </Link>
              <Link href="#gallery" className="text-xl uppercase tracking-wider hover:text-rose-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Gallery
              </Link>
              <Link href="#merch" className="text-xl uppercase tracking-wider hover:text-rose-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Merch
              </Link>
              <div className="flex items-center space-x-6 mt-4">
                <a href="https://open.spotify.com/artist/your-id" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-rose-600 transition-colors">
                  <FaSpotify />
                </a>
                <a href="https://youtube.com/@your-channel" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-rose-600 transition-colors">
                  <FaYoutube />
                </a>
                <a href="https://instagram.com/your-handle" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-rose-600 transition-colors">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}