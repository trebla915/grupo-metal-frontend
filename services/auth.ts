interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    // For now, we'll use a simple hardcoded check
    // In production, this should be replaced with actual API calls
    if (email === 'admin@example.com' && password === 'admin123') {
      return {
        token: 'dummy-token-' + Date.now(),
        user: {
          id: '1',
          email: email
        }
      };
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    throw error;
  }
} 