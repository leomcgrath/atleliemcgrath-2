"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth-context";
import Link from "next/link";

interface Race {
  id: number;
  round: number;
  country: string;
  city: string;
  race_date: string;
  country_code: string;
  discipline: string | null;
  position: string | null;
}

interface WebsiteContent {
  id: number;
  key: string;
  value: string;
  section: string | null;
}

type AdminTab = "races" | "content";

export default function AdminDashboard() {
  const { user, isLoading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("races");
  const [races, setRaces] = useState<Race[]>([]);
  const [content, setContent] = useState<WebsiteContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingRace, setEditingRace] = useState<Race | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    round: "",
    country: "",
    city: "",
    race_date: "",
    country_code: "",
    discipline: "",
    position: "",
  });

  // Content editing state
  const [editingContentKey, setEditingContentKey] = useState<string | null>(null);
  const [contentFormData, setContentFormData] = useState({
    key: "",
    value: "",
    section: "",
  });

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    if (!authLoading && (!user || user.email !== adminEmail)) {
      router.push("/admin/login");
    }
  }, [user, authLoading, router, adminEmail]);

  useEffect(() => {
    fetchRaces();
    fetchContent();
  }, []);

  const fetchRaces = async () => {
    try {
      const response = await fetch("/api/races");
      const data = await response.json();

      if (data.success) {
        setRaces(data.races);
      } else {
        setError("Failed to load races");
      }
    } catch (err) {
      setError("Failed to load races");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content");
      const data = await response.json();

      if (data.success) {
        setContent(data.content);
      }
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  };

  const handleContentSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setContentLoading(true);

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contentFormData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchContent();
        setEditingContentKey(null);
        setContentFormData({ key: "", value: "", section: "" });
      } else {
        setError(data.error || "Failed to save content");
      }
    } catch (err) {
      setError("Failed to save content");
    } finally {
      setContentLoading(false);
    }
  };

  const handleContentEdit = (item: WebsiteContent) => {
    setEditingContentKey(item.key);
    setContentFormData({
      key: item.key,
      value: item.value,
      section: item.section || "",
    });
  };

  const handleContentDelete = async (key: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return;

    try {
      const response = await fetch(`/api/content?key=${key}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchContent();
      } else {
        setError("Failed to delete content");
      }
    } catch (err) {
      setError("Failed to delete content");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const url = editingRace ? "/api/races" : "/api/races";
      const method = editingRace ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchRaces();
        resetForm();
      } else {
        setError(data.error || "Failed to save race");
      }
    } catch (err) {
      setError("Failed to save race");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (race: Race) => {
    setEditingRace(race);
    setFormData({
      id: race.id.toString(),
      round: race.round.toString(),
      country: race.country,
      city: race.city,
      race_date: race.race_date,
      country_code: race.country_code,
      discipline: race.discipline || "",
      position: race.position || "",
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this race?")) return;

    try {
      const response = await fetch(`/api/races?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchRaces();
      } else {
        setError("Failed to delete race");
      }
    } catch (err) {
      setError("Failed to delete race");
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingRace(null);
    setFormData({
      id: "",
      round: "",
      country: "",
      city: "",
      race_date: "",
      country_code: "",
      discipline: "",
      position: "",
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || user.email !== adminEmail) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      {/* Header */}
      <header className="bg-[#0a101a] border-b border-[#FFD700]/30 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#FFD700] uppercase tracking-tighter">
              Admin Dashboard
            </h1>
            <p className="text-white/70 text-sm mt-1">Manage race calendar and website content</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-white hover:text-[#FFD700] font-bold text-sm uppercase tracking-wider transition-colors"
            >
              View Site
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm uppercase tracking-wider transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#0a101a] border-b border-white/10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex gap-4 flex-wrap">
          <button
            className={`font-bold py-2 px-4 rounded-lg text-sm uppercase tracking-wider transition-colors ${
              activeTab === "races"
                ? "bg-[#FFD700] text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            onClick={() => setActiveTab("races")}
          >
            Race Schedule
          </button>
          <button
            className={`font-bold py-2 px-4 rounded-lg text-sm uppercase tracking-wider transition-colors ${
              activeTab === "content"
                ? "bg-[#FFD700] text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            onClick={() => setActiveTab("content")}
          >
            Website Content
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {activeTab === "races" && (
          <>
        {/* Race Form */}
        <section id="race-form" className="mb-12">
          <div className="bg-white rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-black text-[#0a0e27] uppercase tracking-tighter mb-6">
              {isEditing ? "Edit Race" : "Add New Race"}
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Round *
                  </label>
                  <input
                    type="number"
                    value={formData.round}
                    onChange={(e) => setFormData({ ...formData, round: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-colors"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-colors"
                    placeholder="Norway"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-colors"
                    placeholder="Oslo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Race Date *
                  </label>
                  <input
                    type="date"
                    value={formData.race_date}
                    onChange={(e) => setFormData({ ...formData, race_date: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Country Code *
                  </label>
                  <input
                    type="text"
                    value={formData.country_code}
                    onChange={(e) => setFormData({ ...formData, country_code: e.target.value.toLowerCase() })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-colors"
                    placeholder="no"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Discipline
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-colors bg-white"
                  >
                    <option value="">Select discipline</option>
                    <option value="Slalom">Slalom</option>
                    <option value="Giant Slalom">Giant Slalom</option>
                    <option value="Super-G">Super-G</option>
                    <option value="Downhill">Downhill</option>
                    <option value="Super Combined">Super Combined</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-colors"
                    placeholder="P1, P2, P3..."
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#FFD700] hover:bg-[#FFE55C] text-black font-bold py-3 px-6 rounded-lg border-2 border-black uppercase tracking-wider transition-all hover:scale-105 disabled:scale-100 disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : isEditing ? "Update Race" : "Add Race"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Races List */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
              Race Schedule
            </h2>
            <span className="text-white/70 text-sm">{races.length} races</span>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-white/70">Loading races...</div>
            </div>
          ) : races.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-600">No races scheduled. Add your first race above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {races.map((race) => (
                <div key={race.id} className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#FFD700] uppercase tracking-wider mb-1">
                        Round {race.round}
                      </div>
                      <h3 className="text-xl font-black text-[#0a0e27] uppercase tracking-tighter mb-1">
                        {race.city}
                      </h3>
                      <p className="text-gray-600 mb-3">{race.country}</p>

                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="text-gray-500">Date:</span>{" "}
                          <span className="font-bold text-gray-700">{race.race_date}</span>
                        </div>
                        {race.discipline && (
                          <div>
                            <span className="text-gray-500">Discipline:</span>{" "}
                            <span className="font-bold text-gray-700">{race.discipline}</span>
                          </div>
                        )}
                        {race.position && (
                          <div>
                            <span className="text-gray-500">Position:</span>{" "}
                            <span
                              className={`font-bold ${
                                race.position === "P1"
                                  ? "text-[#FFD700]"
                                  : race.position === "P2"
                                  ? "text-gray-400"
                                  : race.position === "P3"
                                  ? "text-[#CD7F32]"
                                  : "text-gray-700"
                              }`}
                            >
                              {race.position}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(race)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg text-sm uppercase tracking-wider transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(race.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 px-4 rounded-lg text-sm uppercase tracking-wider transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
          </>
        )}

        {activeTab === "content" && (
          <>
            {/* Add/Edit Content */}
            <section id="content-form" className="mb-12">
              <div className="bg-white rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-black text-[#0a0e27] uppercase tracking-tighter mb-6">
                  {editingContentKey ? "Edit Content" : "Add New Content"}
                </h2>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleContentSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Key *
                      </label>
                      <input
                        type="text"
                        value={contentFormData.key}
                        onChange={(e) => setContentFormData({ ...contentFormData, key: e.target.value })}
                        required
                        disabled={!!editingContentKey}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-colors disabled:opacity-50 disabled:bg-gray-100"
                        placeholder="home_hero_title"
                      />
                      <p className="text-xs text-gray-500 mt-1">Unique identifier for this content</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Section
                      </label>
                      <input
                        type="text"
                        value={contentFormData.section}
                        onChange={(e) => setContentFormData({ ...contentFormData, section: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-colors"
                        placeholder="home"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Value *
                    </label>
                    <textarea
                      value={contentFormData.value}
                      onChange={(e) => setContentFormData({ ...contentFormData, value: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-colors"
                      placeholder="ATLE LIE MCGRATH"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={contentLoading}
                      className="bg-[#FFD700] hover:bg-[#FFE55C] text-black font-bold py-3 px-6 rounded-lg border-2 border-black uppercase tracking-wider transition-all hover:scale-105 disabled:scale-100 disabled:opacity-50"
                    >
                      {contentLoading ? "Saving..." : editingContentKey ? "Update Content" : "Add Content"}
                    </button>

                    {editingContentKey && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingContentKey(null);
                          setContentFormData({ key: "", value: "", section: "" });
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </section>

            {/* Content List */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  Website Content
                </h2>
                <span className="text-white/70 text-sm">{content.length} items</span>
              </div>

              {contentLoading ? (
                <div className="text-center py-12">
                  <div className="text-white/70">Loading content...</div>
                </div>
              ) : content.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center">
                  <p className="text-gray-600">No content items. Add your first content item above!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {content.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-black text-[#0a0e27] uppercase tracking-tighter">
                              {item.key}
                            </h3>
                            {item.section && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded">
                                {item.section}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 break-words">{item.value}</p>
                        </div>

                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleContentEdit(item)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg text-sm uppercase tracking-wider transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleContentDelete(item.key)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 px-4 rounded-lg text-sm uppercase tracking-wider transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}