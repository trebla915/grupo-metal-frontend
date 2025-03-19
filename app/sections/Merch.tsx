// app/sections/Merch.tsx
"use client";

import { useState, useEffect } from "react";
import { merchService, MerchItem } from "../services/merch";
import Image from "next/image";

export default function Merch() {
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchMerch = async () => {
      try {
        setLoading(true);
        const items = await merchService.getAllMerch();
        setMerchItems(items);
      } catch (err) {
        setError('Failed to load merchandise. Please try again later.');
        console.error('Error loading merch:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMerch();
  }, []);

  if (loading) {
    return (
      <section id="merch" className="min-h-screen bg-transparent text-white flex flex-col items-center py-16 px-6">
        <div className="w-full max-w-6xl flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose"></div>
          <p className="mt-4 text-rose">Loading merchandise...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="merch" className="min-h-screen bg-transparent text-white flex flex-col items-center py-16 px-6">
        <div className="w-full max-w-6xl flex flex-col items-center">
          <p className="text-rose text-center">{error}</p>
        </div>
      </section>
    );
  }

  const displayedItems = showAll ? merchItems : merchItems.slice(0, 4);

  return (
    <section id="merch" className="min-h-screen bg-transparent text-white flex flex-col items-center py-16 px-6">
      <h2 className="text-4xl font-bold tracking-widest mb-10 text-rose font-metal">Merchandise</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 w-full max-w-6xl h-full">
        {displayedItems.map((item) => (
          <div key={item.id} className="bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-rose/50 transition-all">
            <div className="relative w-full h-64 bg-gray-800 flex items-center justify-center">
              <Image
                src={item.imageUrl || "/merch-placeholder.jpg"}
                alt={item.name}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-300 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-rose font-bold">${item.price.toFixed(2)}</span>
                <span className="text-gray-400">Stock: {item.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {merchItems.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 px-8 py-4 bg-rose text-white text-lg rounded-md hover:bg-rose/90 transition"
        >
          {showAll ? "View Less" : "View All"}
        </button>
      )}
    </section>
  );
}