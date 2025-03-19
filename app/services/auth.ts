interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://grupo-metal-backend.onrender.com";

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    console.log('Attempting login to:', `${API_URL}/api/auth/login`);
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      console.error('Login failed:', {
        status: response.status,
        statusText: response.statusText,
        data
      });
      throw new Error(data.message || "Invalid credentials");
    }

    console.log('Login successful');
    return data;
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw new Error('Login failed: Network error');
  }
}