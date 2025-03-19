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
  async getShows(): Promise<Show[]> {
    try {
      const response = await fetch(`${API_URL}/api/shows`);
      if (!response.ok) {
        throw new Error('Failed to fetch shows');
      }
      const data = await response.json();
      
      return data
        .filter((show: any) => show.isActive !== false)
        .map((show: any) => ({
          id: show._id || show.id,
          venue: show.venue,
          location: show.location,
          date: show.date,
          link: show.link || '',
          imageUrl: show.imageUrl || '/band-photo.jpg',
          specialInfo: show.specialInfo
        }));
    } catch (error) {
      console.error('Error fetching shows:', error);
      throw error;
    }
  }

  async getUpcomingShows(): Promise<Show[]> {
    try {
      const response = await fetch(`${API_URL}/api/shows/upcoming`);
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming shows');
      }
      const data = await response.json();
      return data
        .filter((show: any) => show.isActive !== false)
        .map((show: any) => ({
          id: show._id || show.id,
          venue: show.venue,
          location: show.location,
          date: show.date,
          link: show.link || '',
          imageUrl: show.imageUrl || '/band-photo.jpg',
          specialInfo: show.specialInfo
        }));
    } catch (error) {
      console.error('Error fetching upcoming shows:', error);
      throw error;
    }
  }

  // Admin-only methods below
  private getAdminToken(): string {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Authentication required');
    }
    return token;
  }

  async createShow(show: Omit<Show, "id">): Promise<Show> {
    try {
      const token = this.getAdminToken();
      const response = await fetch(`${API_URL}/api/shows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(show),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to create show: ${errorData}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error creating show:', error);
      throw error;
    }
  }

  async updateShow(show: Show): Promise<Show> {
    try {
      const token = this.getAdminToken();
      const response = await fetch(`${API_URL}/api/shows/${show.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(show),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update show: ${errorData}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error updating show:', error);
      throw error;
    }
  }

  async deleteShow(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error('Show ID is required');
      }

      const token = this.getAdminToken();
      const response = await fetch(`${API_URL}/api/shows/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to delete show: ${errorData}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting show:', error);
      throw error;
    }
  }
}

export const showsService = new ShowsService(); 