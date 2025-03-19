// app/sections/Shows.tsx
"use client";

import { useState, useEffect } from "react";
import { showsService, Show } from "../services/shows";

export default function Shows() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const data = await showsService.getShows();
        setShows(data);
      } catch (err) {
        setError('Failed to load shows. Please try again later.');
        console.error('Error loading shows:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) {
    return (
      <section id="shows" className="min-h-screen bg-black text-white flex flex-col items-center py-16 px-4">
        <div className="w-full max-w-6xl flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
          <p className="mt-4 text-rose-600">Loading shows...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="shows" className="min-h-screen bg-black text-white flex flex-col items-center py-16 px-4">
        <div className="w-full max-w-6xl flex flex-col items-center">
          <p className="text-rose-600 text-center">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="shows" className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold tracking-widest mb-12 text-rose-600 text-center">UPCOMING SHOWS</h2>
        
        <div className="space-y-8">
          {shows.map((show) => (
            <div key={show.id} className="border-t border-white/20 py-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Date */}
                <div className="md:col-span-2">
                  <div className="flex flex-col">
                    <span className="text-lg">{new Date(show.date).toLocaleDateString('en-US', { weekday: 'long' })},</span>
                    <span className="text-lg">{new Date(show.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                {/* Venue & Location */}
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold mb-1">{show.venue}</h3>
                  <p className="text-rose-600">{show.location}</p>
                </div>

                {/* Special Info (if any) */}
                <div className="md:col-span-3 text-gray-400">
                  {show.specialInfo && <p>{show.specialInfo}</p>}
                </div>

                {/* Ticket Info */}
                <div className="md:col-span-3 flex justify-end">
                  {show.link && (
                    <a 
                      href={show.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors px-8 py-3"
                    >
                      TICKETS
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}