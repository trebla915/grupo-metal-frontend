"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardStats {
  totalShows: number;
  totalMerch: number;
  recentShows: number;
  lowStock: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalShows: 0,
    totalMerch: 0,
    recentShows: 0,
    lowStock: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    // TODO: Fetch real stats from API
    setStats({
      totalShows: 12,
      totalMerch: 25,
      recentShows: 3,
      lowStock: 5,
    });
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="space-y-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-300 text-sm font-medium">Total Shows</h3>
                <div className="p-2 bg-rose/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-rose"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.totalShows}</p>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-300 text-sm font-medium">Total Merchandise</h3>
                <div className="p-2 bg-rose/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-rose"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.totalMerch}</p>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-300 text-sm font-medium">Low Stock Items</h3>
                <div className="p-2 bg-rose/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-rose"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.lowStock}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 