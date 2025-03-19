// app/sections/Home.tsx
"use client";

import Image from "next/image";
import { FaSpotify, FaYoutube, FaApple, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

export default function HomeSection() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="relative min-h-screen flex items-center justify-center pb-32">
      {/* Background Image with Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/band-photo.jpg"
          alt="Grupo Metal Band"
          fill
          className="object-cover"
          priority
        />
        {/* Multiple gradient layers for dramatic effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Featured Track Container */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative bg-black/40 backdrop-blur-sm border border-rose-600/20 rounded-xl p-8 md:p-12 transition-all duration-500 ease-in-out">
            {/* Hide/Show Arrow */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-rose-600 hover:text-rose-500 transition-colors duration-300"
            >
              {isExpanded ? (
                <FaChevronUp className="text-3xl" />
              ) : (
                <FaChevronDown className="text-3xl" />
              )}
            </button>

            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0'}`}>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                {/* Album Art */}
                <div className="w-full md:w-1/2 lg:w-2/5">
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl border-2 border-rose-600/20 transform hover:scale-[1.02] transition-all duration-500">
                    <Image 
                      src="/album art.jpg"
                      alt="Album Art"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Track Info */}
                <div className="w-full md:w-1/2 lg:w-3/5 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-rose-600 mb-4">Latest Release</h2>
                  <h3 className="text-xl md:text-2xl text-white mb-6">Track Name</h3>
                  <p className="text-gray-300 mb-8">Album Name - 2024</p>
                  
                  {/* Streaming Links */}
                  <div className="flex justify-center md:justify-start gap-6">
                    <a href="#" className="text-rose-600 hover:text-rose-500 transition-colors">
                      <FaSpotify className="text-3xl" />
                    </a>
                    <a href="#" className="text-rose-600 hover:text-rose-500 transition-colors">
                      <FaYoutube className="text-3xl" />
                    </a>
                    <a href="#" className="text-rose-600 hover:text-rose-500 transition-colors">
                      <FaApple className="text-3xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Only show when player is expanded */}
      {isExpanded && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-rose-600 text-sm font-medium tracking-wider mb-2">SCROLL DOWN</span>
          <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}

      {/* Additional Atmospheric Effects */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
    </section>
  );
}
