interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function testConnection() {
  try {
    console.log('Testing connection to backend at:', API_URL);
    const response = await fetch(`${API_URL}/health`);
    console.log('Health check response status:', response.status);
    const data = await response.json();
    console.log('Health check response:', data);
    return data;
  } catch (error) {
    console.error('Connection test failed:', error);
    throw error;
  }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    console.log('Attempting login with email:', email);
    console.log('API URL:', API_URL);
    
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Login response status:', response.status);
    console.log('Login response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const text = await response.text();
      console.error('Login error response:', text);
      try {
        const data = JSON.parse(text);
        throw new Error(data.message || "Invalid credentials");
      } catch (e) {
        throw new Error(`Login failed: Server returned ${response.status}`);
      }
    }

    const data = await response.json();
    console.log('Login successful, user role:', data.user.role);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw new Error('Login failed: Network error');
  }
}

export function logout() {
  console.log('Logging out - removing admin token');
  localStorage.removeItem('adminToken');
  console.log('Admin token removed');
}

export function getToken(): string | null {
  const token = localStorage.getItem('adminToken');
  console.log('Getting admin token:', token ? 'Token exists' : 'No token found');
  return token;
}