// app/sections/Gallery.tsx
"use client";

import Image from "next/image";

// Use band photo as placeholder until actual gallery images are added
const images = Array.from({ length: 10 }, () => `/band-photo.jpg`);

export default function Gallery() {
  return (
    <section id="gallery" className="min-h-screen bg-black text-white flex flex-col items-center py-16 px-6">
      <h2 className="text-4xl font-bold tracking-widest mb-10 text-rose-600">Photo Gallery</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <Image 
              src={src} 
              alt={`Gallery Image ${index + 1}`} 
              width={300} 
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}