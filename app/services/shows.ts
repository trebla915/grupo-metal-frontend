export interface Show {
  id: string;
  venue: string;
  location: string;
  date: string;
  link: string;
  imageUrl: string;
  specialInfo?: string; // Optional field for additional show information
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

class ShowsService {
  private shows: Show[] = [
    {
      id: "1",
      venue: "Lucky Eagle Casino",
      location: "Eagle Pass, TX",
      date: "2024-03-25",
      link: "https://example.com",
      imageUrl: "/band-photo.jpg",
      specialInfo: "With Special Guests"
    },
    {
      id: "2",
      venue: "Besame Mucho Festival",
      location: "Austin, TX",
      date: "2024-04-04",
      link: "https://example.com",
      imageUrl: "/band-photo.jpg",
      specialInfo: "Festival Performance"
    },
  ];

  async getShows(): Promise<Show[]> {
    try {
      console.log('Fetching shows from:', `${API_URL}/api/shows`);
      const response = await fetch(`${API_URL}/api/shows`);
      console.log('API Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch shows');
      }
      const data = await response.json();
      console.log('Fetched shows:', data);
      return data.map((show: Show) => ({
        ...show,
        imageUrl: show.imageUrl || '/band-photo.jpg'
      }));
    } catch (error) {
      console.error('Error fetching shows:', error);
      return this.shows; // Fallback to local data if API fails
    }
  }

  async getUpcomingShows(): Promise<Show[]> {
    try {
      const response = await fetch(`${API_URL}/api/shows/upcoming`);
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming shows');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching upcoming shows:', error);
      const today = new Date();
      return this.shows.filter((show) => new Date(show.date) >= today);
    }
  }

  async createShow(show: Omit<Show, "id">): Promise<Show> {
    try {
      const token = localStorage.getItem('adminToken');
      console.log('Creating show - Token exists:', !!token);
      
      if (!token) {
        console.error('No authentication token found');
        throw new Error('No authentication token found');
      }

      console.log('Creating show at:', `${API_URL}/api/shows`);
      console.log('Show data:', show);
      
      const response = await fetch(`${API_URL}/api/shows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(show),
      });
      
      console.log('Create show response status:', response.status);
      console.log('Create show response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error('Failed to create show');
      }
      
      const data = await response.json();
      console.log('Show created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating show:', error);
      throw error;
    }
  }

  async updateShow(show: Show): Promise<Show> {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/api/shows/${show.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(show),
      });
      if (!response.ok) {
        throw new Error('Failed to update show');
      }
      return response.json();
    } catch (error) {
      console.error('Error updating show:', error);
      const index = this.shows.findIndex((s) => s.id === show.id);
      if (index === -1) {
        throw new Error("Show not found");
      }
      this.shows[index] = show;
      return show;
    }
  }

  async deleteShow(id: string): Promise<void> {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/api/shows/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete show');
      }
    } catch (error) {
      console.error('Error deleting show:', error);
      const index = this.shows.findIndex((s) => s.id === id);
      if (index === -1) {
        throw new Error("Show not found");
      }
      this.shows.splice(index, 1);
    }
  }
}

export const showsService = new ShowsService(); 