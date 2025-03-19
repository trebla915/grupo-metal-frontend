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
      console.log('Fetching shows from:', `${API_URL}/api/shows`);
      const response = await fetch(`${API_URL}/api/shows`);
      console.log('API Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch shows');
      }
      const data = await response.json();
      console.log('Raw shows data from API:', data);
      
      // Map the data and ensure each show has an ID
      const mappedShows = data
        .filter((show: any) => show.isActive !== false) // Filter out inactive shows
        .map((show: any) => {
          console.log('Processing show:', show);
          return {
            id: show._id || show.id, // Handle both MongoDB _id and our id field
            venue: show.venue,
            location: show.location,
            date: show.date,
            link: show.link || '',
            imageUrl: show.imageUrl || '/band-photo.jpg',
            specialInfo: show.specialInfo
          };
        });
      
      console.log('Processed shows:', mappedShows);
      return mappedShows;
    } catch (error) {
      console.error('Error fetching shows:', error);
      throw error; // Throw the error instead of returning hardcoded data
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
      throw error; // Throw the error instead of returning hardcoded data
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
      throw error;
    }
  }

  async deleteShow(id: string): Promise<void> {
    try {
      if (!id) {
        console.error('No show ID provided');
        throw new Error('No show ID provided');
      }

      const token = localStorage.getItem('adminToken');
      console.log('Deleting show - Token exists:', !!token);
      console.log('Token value:', token ? 'Present' : 'Missing');
      console.log('Using API URL:', API_URL);
      console.log('Show ID to delete:', id);
      
      if (!token) {
        console.error('No authentication token found');
        throw new Error('No authentication token found');
      }

      const url = `${API_URL}/api/shows/${id}`;
      console.log('Deleting show at:', url);
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('Delete show response status:', response.status);
      console.log('Delete show response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error(`Failed to delete show: ${response.status} ${errorData}`);
      }
      
      const responseData = await response.json();
      console.log('Delete show response data:', responseData);
      
      console.log('Show deleted successfully');
    } catch (error) {
      console.error('Error deleting show:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to delete show: ${error.message}`);
      }
      throw error;
    }
  }
}

export const showsService = new ShowsService(); 