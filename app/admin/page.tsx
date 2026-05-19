"use client";

import { useState, useEffect } from "react";
import { Copy, Plus, Trash2, CheckCircle2, Edit2, X, Save } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [guests, setGuests] = useState<any[]>([]);
  const [newGuestName, setNewGuestName] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchGuests();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "deth-pech" && password === "deth-pech") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
      fetchGuests();
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
  };

  const fetchGuests = async () => {
    try {
      const res = await fetch("/api/guests");
      const json = await res.json();
      if (json.success) {
        setGuests(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch guests", err);
    }
  };

  const addGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newGuestName }),
      });
      const json = await res.json();
      if (json.success) {
        setNewGuestName("");
        fetchGuests();
      } else {
        alert(json.error || "Failed to add guest");
      }
    } catch (err) {
      console.error("Failed to add guest", err);
    }
    setLoading(false);
  };

  const deleteGuest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this guest?")) return;
    
    try {
      const res = await fetch(`/api/guests/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        fetchGuests();
      }
    } catch (err) {
      console.error("Failed to delete guest", err);
    }
  };

  const copyToClipboard = (slug: string) => {
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const startEditing = (guest: any) => {
    setEditingId(guest._id);
    setEditName(guest.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEdit = async (id: string) => {
    if (!editName.trim()) return;
    
    try {
      const res = await fetch(`/api/guests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName }),
      });
      const json = await res.json();
      if (json.success) {
        setEditingId(null);
        fetchGuests();
      } else {
        alert(json.error || "Failed to update guest");
      }
    } catch (err) {
      console.error("Failed to update guest", err);
      alert("Failed to update guest");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-khmer-cream p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
          <h1 className="font-moulpali text-2xl text-khmer-burgundy text-center">អ្នកគ្រប់គ្រង</h1>
          <div>
            <label className="block text-sm font-suwannaphum mb-2 text-khmer-text">ឈ្មោះគណនី</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-khmer-gold/30 rounded-lg outline-none focus:border-khmer-gold font-suwannaphum"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-suwannaphum mb-2 text-khmer-text">ពាក្យសម្ងាត់</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-khmer-gold/30 rounded-lg outline-none focus:border-khmer-gold font-suwannaphum"
              required
            />
          </div>
          <button type="submit" className="w-full bg-khmer-gold text-white p-3 rounded-lg font-moulpali hover:bg-khmer-gold-dark transition-colors">
            ចូល
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-khmer-cream p-6 md:p-12 font-suwannaphum text-khmer-text">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="font-moulpali sm:text-3xl text-xl text-khmer-burgundy">គ្រប់គ្រងភ្ញៀវកិត្តិយស</h1>
          <button onClick={handleLogout} className="px-4 py-2 text-sm bg-white border border-khmer-gold/30 rounded-lg hover:bg-gray-50 transition-colors">
            ចាកចេញ
          </button>
        </div>

        <form onSubmit={addGuest} className="bg-white p-6 rounded-2xl shadow-lg border border-khmer-gold/10 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="បញ្ចូលឈ្មោះភ្ញៀវ..." 
            value={newGuestName}
            onChange={(e) => setNewGuestName(e.target.value)}
            className="flex-1 p-4 border border-khmer-gold/30 rounded-xl outline-none focus:border-khmer-gold text-lg"
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-khmer-burgundy text-white px-8 py-4 rounded-xl font-moulpali hover:bg-khmer-burgundy/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-5 h-5" /> បន្ថែម
          </button>
        </form>

        <div className="bg-white rounded-2xl shadow-lg border border-khmer-gold/10 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-khmer-gold/10 text-khmer-burgundy">
                <th className="p-4 font-bold border-b border-khmer-gold/20">ឈ្មោះភ្ញៀវ</th>
                <th className="p-4 font-bold border-b border-khmer-gold/20">តំណភ្ជាប់ (Link)</th>
                <th className="p-4 font-bold border-b border-khmer-gold/20 w-32">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              {guests.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-400 italic">មិនទាន់មានភ្ញៀវនៅឡើយទេ</td>
                </tr>
              ) : (
                guests.map((guest) => (
                  <tr key={guest._id} className="hover:bg-khmer-gold/5 transition-colors group">
                    <td className="p-4 border-b border-khmer-gold/10 font-bold">
                      {editingId === guest._id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full p-2 border border-khmer-gold/50 rounded outline-none"
                          autoFocus
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(guest._id)}
                        />
                      ) : (
                        guest.name
                      )}
                    </td>
                    <td className="p-4 border-b border-khmer-gold/10 font-mono text-sm text-gray-500">
                      /{guest.slug}
                    </td>
                    <td className="p-4 border-b border-khmer-gold/10">
                      <div className="flex gap-2">
                        {editingId === guest._id ? (
                          <>
                            <button 
                              onClick={() => saveEdit(guest._id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Save"
                            >
                              <Save className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={cancelEditing}
                              className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => startEditing(guest)}
                              className="p-2 text-khmer-burgundy/60 hover:bg-khmer-burgundy/10 hover:text-khmer-burgundy rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => copyToClipboard(guest.slug)}
                              className="p-2 text-khmer-gold hover:bg-khmer-gold/10 rounded-lg transition-colors"
                              title="Copy Link"
                            >
                              {copiedSlug === guest.slug ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                            </button>
                            <button 
                              onClick={() => deleteGuest(guest._id)}
                              className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
