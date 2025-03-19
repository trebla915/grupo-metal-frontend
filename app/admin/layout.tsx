"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    
    if (!token && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else if (token && pathname === "/admin/login") {
      router.push("/admin");
    }
    
    setIsLoading(false);
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose"></div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-black" style={{ backgroundImage: "url('/background.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        <div className="relative min-h-screen flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black" style={{ backgroundImage: "url('/background.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      <div className="relative min-h-screen">
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 