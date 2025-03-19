"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { showsService, Show } from "../../services/shows";

export default function ShowsManagement() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);
  const [formData, setFormData] = useState({
    venue: "",
    location: "",
    date: "",
    link: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      setLoading(true);
      const data = await showsService.getShows();
      setShows(data);
    } catch (err) {
      console.error("Error loading shows:", err);
      setError("Failed to load shows");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingShow) {
        await showsService.updateShow({ ...formData, id: editingShow.id });
      } else {
        await showsService.createShow(formData);
      }
      setIsModalOpen(false);
      setEditingShow(null);
      setFormData({
        venue: "",
        location: "",
        date: "",
        link: "",
        imageUrl: "",
      });
      fetchShows();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (show: Show) => {
    setEditingShow(show);
    setFormData({
      venue: show.venue,
      location: show.location,
      date: show.date,
      link: show.link,
      imageUrl: show.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this show?")) {
      try {
        await showsService.deleteShow(id);
        fetchShows();
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
    <div className="space-y-8 py-8">
      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Manage Shows</h1>
          <button
            onClick={() => {
              setEditingShow(null);
              setFormData({
                venue: "",
                location: "",
                date: "",
                link: "",
                imageUrl: "",
              });
              setIsModalOpen(true);
            }}
            className="bg-rose text-white px-6 py-2.5 rounded-lg hover:bg-rose/90 transition-all duration-200 shadow-lg hover:shadow-rose/20"
          >
            Add New Show
          </button>
        </div>

        <div className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden border border-white/5">
          <table className="w-full">
            <thead>
              <tr className="bg-black/30">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Venue
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {shows.map((show) => (
                <tr key={show.id} className="hover:bg-white/5 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative w-24 h-24">
                        <Image
                          src={show.imageUrl}
                          alt={show.venue}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{show.venue}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{show.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{show.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(show)}
                      className="text-rose hover:text-rose/80 mr-4 transition-colors duration-150"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(show.id)}
                      className="text-red-500 hover:text-red-400 transition-colors duration-150"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-black/90 backdrop-blur-sm rounded-xl p-8 max-w-md w-full border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingShow ? "Edit Show" : "Add New Show"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Venue
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ticket Link (Optional)
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose transition-all duration-200"
                  placeholder="https://example.com/tickets"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose transition-all duration-200"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="mt-1 text-sm text-gray-400">
                  If no image is provided, a default band photo will be used.
                </p>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingShow(null);
                    setFormData({
                      venue: "",
                      location: "",
                      date: "",
                      link: "",
                      imageUrl: "",
                    });
                  }}
                  className="px-6 py-2.5 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-rose text-white rounded-lg hover:bg-rose/90 transition-all duration-200 shadow-lg hover:shadow-rose/20"
                >
                  {editingShow ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 