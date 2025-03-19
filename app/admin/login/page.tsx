"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, testConnection } from "../../services/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>("");

  useEffect(() => {
    // Test connection when component mounts
    testConnection()
      .then(() => setConnectionStatus("Connected to backend"))
      .catch((error) => {
        console.error('Connection test failed:', error);
        setConnectionStatus("Failed to connect to backend");
        setError("Cannot connect to server. Please try again later.");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      console.log('Submitting login with email:', credentials.email);
      const response = await login(credentials.email, credentials.password);
      console.log('Login response:', response);
      
      if (response.token && response.user.role === 'admin') {
        localStorage.setItem('adminToken', response.token);
        router.push('/admin');
      } else {
        throw new Error('Access denied. Admin privileges required.');
      }
    } catch (error) {
      console.error('Login error in page:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md border border-white/10">
        <h1 className="text-2xl font-bold text-rose mb-6 text-center">Admin Login</h1>
        
        {connectionStatus && (
          <div className={`mb-4 p-2 rounded ${
            connectionStatus.includes("Connected") 
              ? "bg-green-500/10 border border-green-500 text-green-500" 
              : "bg-red-500/10 border border-red-500 text-red-500"
          }`}>
            {connectionStatus}
          </div>
        )}
        
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
            disabled={loading || connectionStatus.includes("Failed")}
            className="w-full bg-rose text-white py-2 px-4 rounded-lg hover:bg-rose/90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
} 