export interface MerchItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class MerchService {
  private merch: MerchItem[] = [
    {
      id: "1",
      name: "Grupo Metal T-Shirt",
      description: "Classic black t-shirt with Grupo Metal logo",
      price: 25.99,
      quantity: 50,
      imageUrl: "",
      category: "clothing",
    },
    {
      id: "2",
      name: "Grupo Metal Hoodie",
      description: "Comfortable hoodie with embroidered logo",
      price: 45.99,
      quantity: 30,
      imageUrl: "",
      category: "clothing",
    },
    {
      id: "3",
      name: "Grupo Metal CD",
      description: "Latest album on CD",
      price: 15.99,
      quantity: 100,
      imageUrl: "",
      category: "music",
    },
  ];

  async getAllMerch(): Promise<MerchItem[]> {
    try {
      const response = await fetch(`${API_URL}/merch`);
      if (!response.ok) {
        throw new Error('Failed to fetch merch items');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching merch items:', error);
      return this.merch;
    }
  }

  async getMerchByCategory(category: string): Promise<MerchItem[]> {
    try {
      const response = await fetch(`${API_URL}/merch?category=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch merch items by category');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching merch items by category:', error);
      return this.merch.filter((item) => item.category === category);
    }
  }

  async createMerchItem(item: Omit<MerchItem, "id">): Promise<MerchItem> {
    try {
      const response = await fetch(`${API_URL}/merch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error('Failed to create merch item');
      }
      return response.json();
    } catch (error) {
      console.error('Error creating merch item:', error);
      const newItem = {
        ...item,
        id: Date.now().toString(),
      };
      this.merch.push(newItem);
      return newItem;
    }
  }

  async updateMerchItem(id: string, item: Omit<MerchItem, "id">): Promise<MerchItem> {
    try {
      const response = await fetch(`${API_URL}/merch/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error('Failed to update merch item');
      }
      return response.json();
    } catch (error) {
      console.error('Error updating merch item:', error);
      const index = this.merch.findIndex((i) => i.id === id);
      if (index === -1) {
        throw new Error("Item not found");
      }
      const updatedItem = {
        ...item,
        id,
      };
      this.merch[index] = updatedItem;
      return updatedItem;
    }
  }

  async deleteMerchItem(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/merch/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete merch item');
      }
    } catch (error) {
      console.error('Error deleting merch item:', error);
      const index = this.merch.findIndex((i) => i.id === id);
      if (index === -1) {
        throw new Error("Item not found");
      }
      this.merch.splice(index, 1);
    }
  }
}

export const merchService = new MerchService(); 