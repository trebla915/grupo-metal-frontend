// app/sections/Bio.tsx
"use client";

import Image from "next/image";

export default function Bio() {
  return (
    <section id="bio" className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bio.jpg"
          alt="Band Background"
          fill
          className="object-cover"
          priority
        />
        {/* Multiple gradient layers for dramatic effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70" />
        <div className="absolute inset-0 bg-black/30" /> {/* Subtle overall darkness */}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="bg-black/40 backdrop-blur-sm border border-rose-600/20 rounded-lg p-8 md:p-12">
          <h2 className="text-5xl font-bold text-rose-600 mb-12 uppercase tracking-wider">
            About Us
          </h2>
          
          <div className="space-y-6 text-lg text-gray-200">
            <p className="leading-relaxed">
              Grupo METAL is a dynamic metal band that emerged from the vibrant music scene of South Texas. 
              Founded by a group of passionate musicians, we blend traditional metal elements with modern influences 
              to create a unique and powerful sound that resonates with audiences worldwide.
            </p>
            
            <p className="leading-relaxed">
              Our music is characterized by powerful riffs, soaring vocals, and intricate arrangements that 
              showcase our diverse musical influences. From classic metal to contemporary rock, we draw inspiration 
              from various genres while maintaining our distinctive metal identity.
            </p>
            
            <p className="leading-relaxed">
              Our latest single "Volare" represents our commitment to pushing boundaries and exploring new 
              musical territories. The track combines heavy guitar riffs with melodic elements, creating an 
              anthem that resonates with metal fans worldwide.
            </p>
            
            <p className="leading-relaxed">
              As we continue to evolve and grow, we remain dedicated to delivering high-energy performances 
              and creating music that connects with our audience on a deep level. Join us on this musical journey 
              as we continue to make our mark in the metal scene.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-rose-600/30 -translate-x-4 -translate-y-4" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-rose-600/30 translate-x-4 translate-y-4" />
        </div>
      </div>

      {/* Additional Atmospheric Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}