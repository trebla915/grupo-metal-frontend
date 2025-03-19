"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import MusicPlayer from "./MusicPlayer";

export default function NavigationWrapper() {
  const pathname = usePathname();
  const isAdminRoute = pathname && pathname.startsWith("/admin");

  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      <Navbar />
      <MusicPlayer />
    </>
  );
} 