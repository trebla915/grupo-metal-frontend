"use client";

import { useState, useEffect } from "react";
import { merchService, MerchItem } from "../../services/merch";
import Image from "next/image";

export default function MerchManagement() {
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MerchItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchMerchItems();
  }, []);

  const fetchMerchItems = async () => {
    try {
      setLoading(true);
      const items = await merchService.getAllMerch();
      setMerchItems(items);
    } catch (err) {
      setError("Failed to load merchandise items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await merchService.updateMerchItem(editingItem.id, {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          imageUrl: formData.imageUrl,
          category: formData.category,
        });
      } else {
        await merchService.createMerchItem({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          imageUrl: formData.imageUrl,
          category: formData.category,
        });
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        imageUrl: "",
        category: "clothing",
      });
      fetchMerchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item: MerchItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      quantity: item.quantity.toString(),
      category: item.category,
      imageUrl: item.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await merchService.deleteMerchItem(id);
        fetchMerchItems();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Manage Merchandise</h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({
              name: "",
              description: "",
              price: "",
              quantity: "",
              category: "",
              imageUrl: "",
            });
            setIsModalOpen(true);
          }}
          className="bg-rose text-white px-4 py-2 rounded-md hover:bg-rose/90 transition"
        >
          Add New Item
        </button>
      </div>

      <div className="bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
        <table className="w-full">
          <thead>
            <tr className="bg-black/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {merchItems.map((item) => (
              <tr key={item.id} className="hover:bg-white/5">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{item.name}</div>
                      <div className="text-sm text-gray-400">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{item.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">${item.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{item.quantity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-rose hover:text-rose/80 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-black/90 backdrop-blur-sm rounded-lg p-6 max-w-md w-full border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              {editingItem ? "Edit Item" : "Add New Item"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-rose"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-rose"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-rose"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-rose"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-rose"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-rose"
                  required
                />
              </div>
              {editingItem && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Image
                  </label>
                  <div className="relative w-32 h-32">
                    <Image
                      src={editingItem.imageUrl}
                      alt={editingItem.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                    setFormData({
                      name: "",
                      description: "",
                      price: "",
                      quantity: "",
                      imageUrl: "",
                      category: "clothing",
                    });
                  }}
                  className="px-4 py-2 text-gray-300 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose text-white rounded-md hover:bg-rose/90 transition"
                >
                  {editingItem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 