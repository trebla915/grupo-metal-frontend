"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black/30 backdrop-blur-sm min-h-screen p-6 border-r border-white/10 relative z-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-rose">Admin Panel</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin"
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === "/admin"
                  ? "bg-rose text-white"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <span>📊</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/shows"
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === "/admin/shows"
                  ? "bg-rose text-white"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <span>🎵</span>
              <span>Shows</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/merch"
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === "/admin/merch"
                  ? "bg-rose text-white"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <span>👕</span>
              <span>Merchandise</span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                window.location.href = "/admin/login";
              }}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 w-full text-left"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
} 