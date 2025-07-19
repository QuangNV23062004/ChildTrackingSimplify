"use client";
import React, { useEffect, useState } from "react";
import userService from "@/services/userService";
import { useToast } from "@/components/common/ToastContext";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getCurrentUser();
        setUser(data);
        setForm({ name: data.name, email: data.email });
      } catch (err) {
        toast.showToast("Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await userService.updateCurrentUser(user.id, form.name, form.email);
      toast.showToast("Profile updated!", "success");
      setEditMode(false);
      setUser({ ...user, name: form.name });
    } catch (err) {
      toast.showToast("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="flex justify-center min-h-[70vh] p-6">
      {/* Sidebar removed */}
      <main className="flex-1 max-w-2xl bg-white rounded-lg shadow p-10 text-gray-900">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {editMode ? (
              <>
                <button
                  className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => {
                    setEditMode(false);
                    setForm({ name: user.name, email: user.email });
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
