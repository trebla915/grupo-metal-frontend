"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(credentials.email, credentials.password);
      localStorage.setItem('adminToken', response.token);
      router.push('/admin');
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md border border-white/10">
        <h1 className="text-2xl font-bold text-rose mb-6 text-center">Admin Login</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rose"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rose"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose text-white py-2 px-4 rounded-lg hover:bg-rose/90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
} 