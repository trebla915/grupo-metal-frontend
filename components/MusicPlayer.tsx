"use client";

import { useState, useRef } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import Image from "next/image";

const tracks = [
  { title: "La Flor", artist: "Grupo Metal FT. Chris Perez", src: "/music/la-flor.mp3", cover: "" },
  { title: "Placeholder Song", artist: "Grupo Metal", src: "/music/placeholder.mp3", cover: "" }, // Add more tracks here
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    if (audioRef.current) {
      audioRef.current.src = tracks[(currentTrack + 1) % tracks.length].src;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    if (audioRef.current) {
      audioRef.current.src = tracks[(currentTrack - 1 + tracks.length) % tracks.length].src;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={`fixed left-0 right-0 z-40 transition-all duration-500 ease-in-out ${isExpanded ? 'bottom-0' : '-bottom-24'}`}>
      {/* Hide/Show Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-rose-600 hover:text-rose-500 p-2 rounded-t-lg border-t border-l border-r border-white/10 transition-colors duration-300"
      >
        {isExpanded ? <FaChevronDown className="text-xl" /> : <FaChevronUp className="text-xl" />}
      </button>

      <div className="bg-black/90 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Album Art */}
            <div className="flex items-center space-x-4">
              <div className="relative w-14 h-14 bg-gray-800 rounded-md flex items-center justify-center">
                {/* <Image 
                  src={tracks[currentTrack].cover} 
                  alt={tracks[currentTrack].title} 
                  fill
                  className="object-cover rounded-md shadow-lg"
                /> */}
                <span className="text-2xl">🎵</span>
              </div>
            </div>
            
            {/* Song Title and Controls in the Center */}
            <div className="flex flex-col items-center space-y-2 mx-4 flex-1">
              <h3 className="text-lg font-semibold text-center font-metal">{tracks[currentTrack].title}</h3>
              <p className="text-sm text-gray-400 text-center">{tracks[currentTrack].artist}</p>
              
              <div className="flex items-center space-x-6">
                <FaStepBackward className="cursor-pointer text-2xl hover:text-rose-500 transition-colors" onClick={prevTrack} />
                <div className="cursor-pointer text-4xl hover:text-rose-500 transition-colors" onClick={togglePlayPause}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </div>
                <FaStepForward className="cursor-pointer text-2xl hover:text-rose-500 transition-colors" onClick={nextTrack} />
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-3">
              <FaVolumeUp className="text-rose-500 text-xl" />
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                className="w-24 accent-rose-500" 
              />
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={tracks[currentTrack].src} />
      </div>
    </div>
  );
}
