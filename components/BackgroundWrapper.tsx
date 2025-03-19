"use client";

export default function BackgroundWrapper() {
  return (
    <div 
      className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: 'url("/background.jpg")',
        opacity: 0.15,
        mixBlendMode: 'luminosity'
      }}
    />
  )
} 