const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

console.log('API Base URL:', API_BASE_URL);

interface Show {
  id: string;
  venue: string;
  location: string;
  date: string;
  link: string;
  imageUrl: string;
}

interface MerchItem {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  console.log('Attempting login...');
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    console.error('Login failed:', response.status, response.statusText);
    throw new Error("Login failed");
  }

  return response.json();
}

export async function getShows(): Promise<Show[]> {
  console.log('Fetching shows...');
  const response = await fetch(`${API_BASE_URL}/shows`);
  if (!response.ok) {
    console.error('Failed to fetch shows:', response.status, response.statusText);
    throw new Error("Failed to fetch shows");
  }
  return response.json();
}

export async function createShow(show: Omit<Show, "id">): Promise<Show> {
  const response = await fetch(`${API_BASE_URL}/shows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(show),
  });

  if (!response.ok) {
    throw new Error("Failed to create show");
  }

  return response.json();
}

export async function updateShow(show: Show): Promise<Show> {
  const response = await fetch(`${API_BASE_URL}/shows`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(show),
  });

  if (!response.ok) {
    throw new Error("Failed to update show");
  }

  return response.json();
}

export async function deleteShow(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/shows?id=${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete show");
  }
}

export async function getMerch(): Promise<MerchItem[]> {
  const response = await fetch(`${API_BASE_URL}/merch`);
  if (!response.ok) {
    throw new Error("Failed to fetch merchandise");
  }
  return response.json();
}

export async function createMerchItem(item: Omit<MerchItem, "id">): Promise<MerchItem> {
  const response = await fetch(`${API_BASE_URL}/merch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to create merchandise item");
  }

  return response.json();
}

export async function updateMerchItem(item: MerchItem): Promise<MerchItem> {
  const response = await fetch(`${API_BASE_URL}/merch`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to update merchandise item");
  }

  return response.json();
}

export async function deleteMerchItem(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/merch?id=${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete merchandise item");
  }
} 