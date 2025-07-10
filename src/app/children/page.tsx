"use client";
import React, { useEffect, useState } from "react";
import childService from "@/services/childService";
import growthDataService from "@/services/growthDataService";
import { useToast } from "@/components/common/ToastContext";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ChildCard from "@/components/children/ChildCard";
import Loading from "@/components/common/Loading";
import { useConfirmation } from "@/components/common/ConfirmationContext";
import { AllergyEnum } from "@/enum/AllergyEnum";
import { FeedingTypeEnum } from "@/enum/FeedingTypeEnum";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot
} from 'recharts';

const PAGE_SIZE = 10;

const FeedingTypeOptions = [
  { value: 0, label: 'N/A' },
  { value: 1, label: 'Breastfeeding' },
  { value: 2, label: 'Formula Feeding' },
  { value: 3, label: 'Solid Foods' },
];
const AllergyOptions = [
  { value: 0, label: 'None' },
  { value: 1, label: 'N/A' },
  { value: 2, label: 'Drug Allergy' },
  { value: 3, label: 'Food Allergy' },
  { value: 4, label: 'Latex Allergy' },
  { value: 5, label: 'Mold Allergy' },
  { value: 6, label: 'Pet Allergy' },
  { value: 7, label: 'Pollen Allergy' },
];

// Utility functions to get label from value
export const getFeedingTypeLabel = (value: number) => {
  const found = FeedingTypeOptions.find(opt => opt.value === value);
  return found ? found.label : value;
};
export const getAllergyLabels = (values: number[]) => {
  return values.map(val => {
    const found = AllergyOptions.find(opt => opt.value === val);
    return found ? found.label : val;
  }).join(', ');
};

// Helper for badge color
const getLevelBadgeColor = (level: number) => {
  switch (level) {
    case 1: return 'bg-green-500';
    case 2: return 'bg-blue-500';
    case 3: return 'bg-yellow-500';
    case 4: return 'bg-orange-500';
    case 5: return 'bg-red-500';
    default: return 'bg-gray-400';
  }
};

// Level mappings for display
interface LevelDisplay {
  label: string;
  color: string;
}
const LevelEnumMap: { [key: number]: LevelDisplay } = {
  0: { label: 'Abnormal Low', color: 'bg-red-500 text-white' },
  1: { label: 'Below Average', color: 'bg-yellow-400 text-black' },
  2: { label: 'Average', color: 'bg-green-500 text-white' },
  3: { label: 'Above Average', color: 'bg-blue-500 text-white' },
  4: { label: 'Abnormal High', color: 'bg-red-500 text-white' },
  5: { label: 'N/A', color: 'bg-gray-400 text-white' },
};
const BmiLevelEnumMap: { [key: number]: LevelDisplay } = {
  0: { label: 'Underweight', color: 'bg-yellow-400 text-black' },
  1: { label: 'Healthy Weight', color: 'bg-green-500 text-white' },
  2: { label: 'Overweight', color: 'bg-blue-500 text-white' },
  3: { label: 'Obese', color: 'bg-red-500 text-white' },
  4: { label: 'N/A', color: 'bg-gray-400 text-white' },
};

// Helper: Convert local date string (YYYY-MM-DD) to UTC ISO string
function localDateStringToUTCISOString(dateString: string) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  // Create a Date object in local time, then get UTC ISO string
  const date = new Date(year, month - 1, day, 0, 0, 0, 0);
  return date.toISOString();
}

// Helper: Convert UTC ISO string to local date string (YYYY-MM-DD)
function utcISOStringToLocalDateString(isoString: string) {
  if (!isoString) return '';
  const date = new Date(isoString);
  // Get local date in YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const ChildrenPage = () => {
  const [children, setChildren] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editChild, setEditChild] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    gender: 0,
    birthDate: "",
    note: "N/A",
    relationship: "Parent",
    feedingType: 0, // 0 = NA
    allergies: [0], // 0 = None
  });
  const [userId, setUserId] = useState<string | null>(null);
  const toast = useToast();
  const [showGrowthModal, setShowGrowthModal] = useState(false);
  const [growthChild, setGrowthChild] = useState<any>(null);

  // Growth data state
  const [growthData, setGrowthData] = useState<any[]>([]);
  const [growthPage, setGrowthPage] = useState(1);
  const [growthTotalPages, setGrowthTotalPages] = useState(1);
  const [growthLoading, setGrowthLoading] = useState(false);
  const [showGrowthForm, setShowGrowthForm] = useState(false);
  const [editGrowth, setEditGrowth] = useState<any>(null);
  const [growthForm, setGrowthForm] = useState({
    height: "",
    weight: "",
    headCircumference: "",
    armCircumference: "",
    inputDate: "",
  });
  const [velocity, setVelocity] = useState<any>(null);

  const confirmation = useConfirmation();

  useEffect(() => {
    // Get userId from localStorage
    const userData = typeof window !== "undefined" ? localStorage.getItem("user_data") : null;
    if (userData) {
      const parsed = JSON.parse(userData);
      setUserId(parsed.id || parsed.userId);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    childService
      .getChildrenByUser(userId, page, PAGE_SIZE, search)
      .then((res) => {
        setChildren(res.data);
        setTotalPages(res.totalPages);
      })
      .catch(() => toast.showToast("Failed to load children", "error"))
      .finally(() => setLoading(false));
  }, [userId, page, search]);

  const openAddModal = () => {
    setEditChild(null);
    setForm({
      name: "",
      gender: 0,
      birthDate: "",
      note: "N/A",
      relationship: "Parent",
      feedingType: 0,
      allergies: [0],
    });
    setShowModal(true);
  };

  const openEditModal = (child: any) => {
    setEditChild(child);
    setForm({
      name: child.name || "",
      gender: child.gender ?? 0,
      birthDate: child.birthDate ? utcISOStringToLocalDateString(child.birthDate) : "",
      note: child.note || "N/A",
      relationship: child.relationship || "Parent",
      feedingType: typeof child.feedingType === 'number' ? child.feedingType : Number(child.feedingType),
      allergies: Array.isArray(child.allergies) && child.allergies.length > 0 ? child.allergies.map((a: any) => typeof a === 'number' ? a : Number(a)) : [0],
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmation.confirm({
      message: "Are you sure you want to delete this child?",
    });
    if (!confirmed) return;
    try {
      await childService.deleteChild(id);
      toast.showToast("Child deleted", "success");
      setChildren(children.filter((c) => c.id !== id));
    } catch {
      toast.showToast("Failed to delete child", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!form.name || !form.name.trim()) {
      toast.showToast("Name is required", "error");
      return;
    }
    if (!form.birthDate) {
      toast.showToast("Birth date is required", "error");
      return;
    }
    if (!form.relationship || !["Parent", "Guardian", "Sibling", "Other"].includes(form.relationship)) {
      toast.showToast("Valid relationship is required", "error");
      return;
    }
    if (!form.allergies || form.allergies.length === 0) {
      toast.showToast("Please select at least one allergy", "error");
      return;
    }
    if (editChild && (!form.note || !form.note.trim())) {
      toast.showToast("Note is required for updating a child", "error");
      return;
    }

    try {
      // Prepare data for backend
      const childData = {
        name: form.name.trim(),
        gender: form.gender,
        birthDate: form.birthDate ? localDateStringToUTCISOString(form.birthDate) : undefined,
        note: form.note.trim() || "N/A",
        relationship: form.relationship,
        feedingType: Number(form.feedingType),
        allergies: form.allergies.map((a: any) => Number(a)),
      };

      console.log("Sending child data:", childData);

      if (editChild) {
        await childService.updateChild(editChild.id, childData);
        toast.showToast("Child updated", "success");
      } else {
        await childService.createChild(childData);
        toast.showToast("Child added", "success");
      }
      setShowModal(false);
      setPage(1);
      // Refetch children after create/update
      if (userId) {
        const res = await childService.getChildrenByUser(userId, 1, PAGE_SIZE, search);
        setChildren(res.data);
        setTotalPages(res.totalPages);
      }
    } catch (error) {
      console.error("Error saving child:", error);
      toast.showToast("Failed to save child", "error");
    }
  };

  const openGrowthModal = async (child: any) => {
    setGrowthChild(child);
    setGrowthPage(1);
    setShowGrowthModal(true);
    await loadGrowthData(child.id, 1);
    await loadVelocity(child.id);
  };

  const loadGrowthData = async (childId: string, page: number) => {
    setGrowthLoading(true);
    try {
      const res = await growthDataService.getGrowthDataByChild(childId, page, PAGE_SIZE);
      setGrowthData(res.data);
      setGrowthTotalPages(res.totalPages);
    } catch {
      toast.showToast("Failed to load growth data", "error");
    } finally {
      setGrowthLoading(false);
    }
  };

  const loadVelocity = async (childId: string) => {
    try {
      const res = await growthDataService.getGrowthVelocityByChild(childId);
      setVelocity(res.data);
    } catch {
      setVelocity(null);
    }
  };

  const openGrowthForm = (entry?: any) => {
    setEditGrowth(entry || null);
    setGrowthForm(
      entry
        ? {
            height: entry.height,
            weight: entry.weight,
            headCircumference: entry.headCircumference,
            armCircumference: entry.armCircumference,
            inputDate: entry.inputDate ? utcISOStringToLocalDateString(entry.inputDate) : "",
          }
        : { height: "", weight: "", headCircumference: "", armCircumference: "", inputDate: "" }
    );
    setShowGrowthForm(true);
  };

  const handleGrowthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!growthChild) return;
    try {
      let formToSend = { ...growthForm };
      if (formToSend.inputDate) {
        // Ensure correct UTC conversion from local date string
        formToSend.inputDate = localDateStringToUTCISOString(formToSend.inputDate);
      }
      let result;
      if (editGrowth) {
        result = await growthDataService.updateGrowthData(editGrowth.id, formToSend, growthChild.id);
        toast.showToast("Growth data updated", "success");
      } else {
        result = await growthDataService.createGrowthData(growthChild.id, formToSend);
        toast.showToast("Growth data added", "success");
      }
      setShowGrowthForm(false);
      await loadGrowthData(growthChild.id, growthPage);
      // Use the new velocity result if available
      if (result && result.velocity) {
        setVelocity(result.velocity.data ?? result.velocity);
      } else {
        await loadVelocity(growthChild.id);
      }
    } catch {
      toast.showToast("Failed to save growth data", "error");
    }
  };

  const handleGrowthDelete = async (id: string) => {
    const confirmed = await confirmation.confirm({
      message: "Delete this growth data?",
    });
    if (!confirmed) return;
    try {
      await growthDataService.deleteGrowthData(id);
      toast.showToast("Growth data deleted", "success");
      if (growthChild) {
        await loadGrowthData(growthChild.id, growthPage);
        await loadVelocity(growthChild.id);
      }
    } catch {
      toast.showToast("Failed to delete growth data", "error");
    }
  };

  // Before rendering, sort growthData by inputDate ascending
  const sortedGrowthData = Array.isArray(growthData) ? [...growthData].sort((a, b) => new Date(a.inputDate).getTime() - new Date(b.inputDate).getTime()) : [];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">My Children</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          onClick={openAddModal}
        >
          <FaPlus /> Add Child
        </button>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded pl-10 pr-3 py-2 focus:outline-none focus:ring focus:border-blue-400 text-black"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loading message="Loading children..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {children.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onGrowthData={openGrowthModal}
            />
          ))}
        </div>
      )}
      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } cursor-pointer`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow w-full max-w-md">
            <div className="flex items-center justify-between border-b px-8 pt-6 pb-3">
              <h2 className="text-xl font-bold text-black">{editChild ? "Edit Child" : "Add Child"}</h2>
              <button type="button" className="text-gray-500 hover:text-gray-700 text-2xl ml-4 cursor-pointer" onClick={() => setShowModal(false)} aria-label="Close">×</button>
            </div>
            <form className="px-8 pb-8 pt-2 overflow-y-auto" style={{maxHeight: '70vh'}} onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block font-semibold mb-1 text-black">Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 text-black"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1 text-black">Gender</label>
                <select
                  className="w-full border rounded px-3 py-2 text-black"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: Number(e.target.value) })}
                  required
                >
                  <option value={0}>Male</option>
                  <option value={1}>Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1 text-black">Birth Date</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2 text-black"
                  value={form.birthDate}
                  onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1 text-black">Relationship</label>
                <select
                  className="w-full border rounded px-3 py-2 text-black"
                  value={form.relationship}
                  onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                  required
                >
                  <option value="Parent">Parent</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1 text-black">Feeding Type</label>
                <select
                  className="w-full border rounded px-3 py-2 text-black"
                  value={form.feedingType}
                  onChange={(e) => setForm({ ...form, feedingType: Number(e.target.value) })}
                >
                  {FeedingTypeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1 text-black">Allergies</label>
                <div className="flex flex-wrap gap-2">
                  {AllergyOptions.map(opt => {
                    const isNoneOrNA = opt.value === 0 || opt.value === 1;
                    const noneOrNASelected = form.allergies.includes(0) || form.allergies.includes(1);
                    const otherSelected = form.allergies.some(v => v !== 0 && v !== 1);
                    const checked = form.allergies.includes(opt.value);
                    let disabled = false;
                    if (isNoneOrNA) {
                      disabled = otherSelected && !checked;
                    } else {
                      disabled = noneOrNASelected && !checked;
                    }
                    return (
                      <label key={opt.value} className={`flex items-center gap-1 px-2 py-1 rounded border cursor-pointer text-black ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}>
                        <input
                          type="checkbox"
                          value={opt.value}
                          checked={checked}
                          disabled={disabled}
                          onChange={() => {
                            let newAllergies = [...form.allergies];
                            if (checked) {
                              newAllergies = newAllergies.filter(v => v !== opt.value);
                            } else {
                              // If selecting None or N/A, clear all others
                              if (isNoneOrNA) {
                                newAllergies = [opt.value];
                              } else {
                                // If selecting another allergy, remove None and N/A
                                newAllergies = newAllergies.filter(v => v !== 0 && v !== 1);
                                newAllergies.push(opt.value);
                              }
                            }
                            setForm({
                              ...form,
                              allergies: newAllergies,
                            });
                          }}
                        />
                        <span>{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-1 text-black">Note</label>
                <textarea
                  className="w-full border rounded px-3 py-2 text-black"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value || "N/A" })}
                  required={!!editChild}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 cursor-pointer"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  {editChild ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Growth Data Modal */}
      {showGrowthModal && growthChild && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow w-full max-w-5xl">
            <div className="flex items-center justify-between border-b px-8 pt-6 pb-3">
              <h2 className="text-xl font-bold text-black">Growth Data for {growthChild.name}</h2>
              <button type="button" className="text-gray-500 hover:text-gray-700 text-2xl ml-4 cursor-pointer" onClick={() => setShowGrowthModal(false)} aria-label="Close">×</button>
            </div>
            <div className="p-8 overflow-y-auto" style={{maxHeight: '70vh'}}>
              <button
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                onClick={() => openGrowthForm()}
              >
                Add Growth Data
              </button>
              {growthLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loading message="Loading growth data..." />
                </div>
              ) : (
                <div className="overflow-x-auto rounded shadow mb-4">
                  <table className="min-w-full bg-white text-black">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Height</th>
                        <th className="px-4 py-2 text-left">Weight</th>
                        <th className="px-4 py-2 text-left">Head Circumference</th>
                        <th className="px-4 py-2 text-left">Arm Circumference</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedGrowthData.map((entry) => (
                        <tr key={entry.id} className="border-t">
                          <td className="px-4 py-2 text-left">{new Date(entry.inputDate).toLocaleDateString()}</td>
                          <td className="px-4 py-2 text-left">{entry.height}</td>
                          <td className="px-4 py-2 text-left">{entry.weight}</td>
                          <td className="px-4 py-2 text-left">{entry.headCircumference}</td>
                          <td className="px-4 py-2 text-left">{entry.armCircumference}</td>
                          <td className="px-4 py-2 flex items-center justify-center gap-2">
                            <button
                              className="text-green-600 hover:text-green-800 cursor-pointer text-xl flex items-center justify-center"
                              onClick={() => openGrowthForm(entry)}
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 cursor-pointer text-xl flex items-center justify-center"
                              onClick={() => handleGrowthDelete(entry.id)}
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Growth Data Pagination */}
              <div className="flex justify-center gap-2 mb-4">
                {Array.from({ length: growthTotalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded ${
                      growthPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } cursor-pointer`}
                    onClick={async () => {
                      setGrowthPage(i + 1);
                      await loadGrowthData(growthChild.id, i + 1);
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              {/* Growth Data Graphs */}
              {(velocity && Array.isArray(velocity) && velocity.length > 0) || (growthData && Array.isArray(growthData) && growthData.length > 0) ? (
                <div className="mb-8 flex flex-col gap-6 text-black">
                  {/* Weight Chart */}
                  {Array.isArray(growthData) && growthData.length > 0 && (
                    <div className="bg-white rounded shadow p-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">Weight</span>
                      <h4 className="font-bold mb-2 text-black">Weight Percentile</h4>
                      <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={sortedGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey={entry => new Date(entry.inputDate).toLocaleDateString()} fontSize={12} angle={-30} textAnchor="end" height={60} tick={{ fill: 'black' }} />
                          <YAxis domain={[-1, 100]} tickFormatter={v => v < 0 ? 'N/A' : v} tick={{ fill: 'black' }} />
                          <Tooltip content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const d = payload[0].payload;
                              const level = Number(d.growthResult?.weight?.level);
                              return (
                                <div className="bg-white p-2 rounded shadow text-xs text-black">
                                  <div><b>Date:</b> {new Date(d.inputDate).toLocaleDateString()}</div>
                                  <div><b>Percentile:</b> {d.growthResult?.weight?.percentile < 0 ? 'N/A' : d.growthResult?.weight?.percentile}</div>
                                  <div><b>Description:</b> {d.growthResult?.weight?.description}</div>
                                  <div><b>Level:</b> <span className={`inline-block px-2 py-0.5 rounded ${LevelEnumMap[level]?.color}`}>{LevelEnumMap[level]?.label}</span></div>
                                </div>
                              );
                            }
                            return null;
                          }} wrapperStyle={{ color: 'black' }} />
                          <Legend wrapperStyle={{ color: 'black' }} />
                          <Line type="monotone" dataKey="growthResult.weight.percentile" name="Percentile" stroke="#8884d8" dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                      {/* Description and Level Badge */}
                      {Array.isArray(growthData) && growthData.length > 0 && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${LevelEnumMap[Number(growthData[growthData.length-1].growthResult?.weight?.level)]?.color}`}>
                            {LevelEnumMap[Number(growthData[growthData.length-1].growthResult?.weight?.level)]?.label}
                          </span>
                          <span className="text-sm">{growthData[growthData.length-1].growthResult?.weight?.description}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Height Chart */}
                  {Array.isArray(growthData) && growthData.length > 0 && (
                    <div className="bg-white rounded shadow p-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">Height</span>
                      <h4 className="font-bold mb-2 text-black">Height Percentile</h4>
                      <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={sortedGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey={entry => new Date(entry.inputDate).toLocaleDateString()} fontSize={12} angle={-30} textAnchor="end" height={60} tick={{ fill: 'black' }} />
                          <YAxis domain={[-1, 100]} tickFormatter={v => v < 0 ? 'N/A' : v} tick={{ fill: 'black' }} />
                          <Tooltip content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const d = payload[0].payload;
                              const level = Number(d.growthResult?.height?.level);
                              return (
                                <div className="bg-white p-2 rounded shadow text-xs text-black">
                                  <div><b>Date:</b> {new Date(d.inputDate).toLocaleDateString()}</div>
                                  <div><b>Percentile:</b> {d.growthResult?.height?.percentile < 0 ? 'N/A' : d.growthResult?.height?.percentile}</div>
                                  <div><b>Description:</b> {d.growthResult?.height?.description}</div>
                                  <div><b>Level:</b> <span className={`inline-block px-2 py-0.5 rounded ${LevelEnumMap[level]?.color}`}>{LevelEnumMap[level]?.label}</span></div>
                                </div>
                              );
                            }
                            return null;
                          }} wrapperStyle={{ color: 'black' }} />
                          <Legend wrapperStyle={{ color: 'black' }} />
                          <Line type="monotone" dataKey="growthResult.height.percentile" name="Percentile" stroke="#82ca9d" dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                      {/* Description and Level Badge */}
                      {Array.isArray(growthData) && growthData.length > 0 && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${LevelEnumMap[Number(growthData[growthData.length-1].growthResult?.height?.level)]?.color}`}>
                            {LevelEnumMap[Number(growthData[growthData.length-1].growthResult?.height?.level)]?.label}
                          </span>
                          <span className="text-sm">{growthData[growthData.length-1].growthResult?.height?.description}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Head Circumference Chart */}
                  {Array.isArray(growthData) && growthData.length > 0 && (
                    <div className="bg-white rounded shadow p-4">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">Head Circumference</span>
                      <h4 className="font-bold mb-2 text-black">Head Circumference Percentile</h4>
                      <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={sortedGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey={entry => new Date(entry.inputDate).toLocaleDateString()} fontSize={12} angle={-30} textAnchor="end" height={60} tick={{ fill: 'black' }} />
                          <YAxis domain={[-1, 100]} tickFormatter={v => v < 0 ? 'N/A' : v} tick={{ fill: 'black' }} />
                          <Tooltip content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const d = payload[0].payload;
                              const level = Number(d.growthResult?.headCircumference?.level);
                              return (
                                <div className="bg-white p-2 rounded shadow text-xs text-black">
                                  <div><b>Date:</b> {new Date(d.inputDate).toLocaleDateString()}</div>
                                  <div><b>Percentile:</b> {d.growthResult?.headCircumference?.percentile < 0 ? 'N/A' : d.growthResult?.headCircumference?.percentile}</div>
                                  <div><b>Description:</b> {d.growthResult?.headCircumference?.description}</div>
                                  <div><b>Level:</b> <span className={`inline-block px-2 py-0.5 rounded ${LevelEnumMap[level]?.color}`}>{LevelEnumMap[level]?.label}</span></div>
                                </div>
                              );
                            }
                            return null;
                          }} wrapperStyle={{ color: 'black' }} />
                          <Legend wrapperStyle={{ color: 'black' }} />
                          <Line type="monotone" dataKey="growthResult.headCircumference.percentile" name="Percentile" stroke="#ffc658" dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                      {/* Description and Level Badge */}
                      {Array.isArray(growthData) && growthData.length > 0 && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${LevelEnumMap[Number(growthData[growthData.length-1].growthResult?.headCircumference?.level)]?.color}`}>
                            {LevelEnumMap[Number(growthData[growthData.length-1].growthResult?.headCircumference?.level)]?.label}
                          </span>
                          <span className="text-sm">{growthData[growthData.length-1].growthResult?.headCircumference?.description}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {/* BMI Chart */}
                  {Array.isArray(growthData) && growthData.length > 0 && (
                    <div className="bg-white rounded shadow p-4">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">BMI</span>
                      <h4 className="font-bold mb-2 text-black">BMI Over Time</h4>
                      <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={sortedGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey={entry => new Date(entry.inputDate).toLocaleDateString()} fontSize={12} angle={-30} textAnchor="end" height={60} tick={{ fill: 'black' }} />
                          <YAxis tick={{ fill: 'black' }} />
                          <Tooltip content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const d = payload[0].payload;
                              const level = Number(d.growthResult?.bmi?.level);
                              return (
                                <div className="bg-white p-2 rounded shadow text-xs text-black">
                                  <div><b>Date:</b> {new Date(d.inputDate).toLocaleDateString()}</div>
                                  <div><b>BMI:</b> {d.bmi}</div>
                                  <div><b>Description:</b> {d.growthResult?.bmi?.description}</div>
                                  <div><b>Level:</b> <span className={`inline-block px-2 py-0.5 rounded ${BmiLevelEnumMap[level]?.color}`}>{BmiLevelEnumMap[level]?.label}</span></div>
                                </div>
                              );
                            }
                            return null;
                          }} wrapperStyle={{ color: 'black' }} />
                          <Legend wrapperStyle={{ color: 'black' }} />
                          <Line type="monotone" dataKey="bmi" name="BMI" stroke="#a259ec" dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                      {/* Description and Level Badge for latest BMI */}
                      {Array.isArray(growthData) && growthData.length > 0 && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${BmiLevelEnumMap[Number(growthData[growthData.length-1].growthResult?.bmi?.level)]?.color}`}>
                            {BmiLevelEnumMap[Number(growthData[growthData.length-1].growthResult?.bmi?.level)]?.label}
                          </span>
                          <span className="text-sm">{growthData[growthData.length-1].growthResult?.bmi?.description}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
              {/* Add/Edit Growth Data Modal */}
              {showGrowthForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow w-full max-w-md">
                    <div className="flex items-center justify-between border-b px-8 pt-6 pb-3">
                      <h2 className="text-xl font-bold text-black">{editGrowth ? "Edit Growth Data" : "Add Growth Data"}</h2>
                      <button type="button" className="text-gray-500 hover:text-gray-700 text-2xl ml-4 cursor-pointer" onClick={() => setShowGrowthForm(false)} aria-label="Close">×</button>
                    </div>
                    <form className="px-8 pb-8 pt-2 overflow-y-auto" style={{maxHeight: '70vh'}} onSubmit={handleGrowthSubmit}>
                      <div className="mb-3">
                        <label className="block font-semibold mb-1 text-black">Date</label>
                        <input
                          type="date"
                          className="w-full border rounded px-3 py-2 text-black"
                          value={growthForm.inputDate}
                          onChange={(e) => setGrowthForm({ ...growthForm, inputDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block font-semibold mb-1 text-black">Height (cm)</label>
                        <input
                          type="number"
                          className="w-full border rounded px-3 py-2 text-black"
                          value={growthForm.height}
                          onChange={(e) => setGrowthForm({ ...growthForm, height: e.target.value })}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block font-semibold mb-1 text-black">Weight (kg)</label>
                        <input
                          type="number"
                          className="w-full border rounded px-3 py-2 text-black"
                          value={growthForm.weight}
                          onChange={(e) => setGrowthForm({ ...growthForm, weight: e.target.value })}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block font-semibold mb-1 text-black">Head Circumference (cm)</label>
                        <input
                          type="number"
                          className="w-full border rounded px-3 py-2 text-black"
                          value={growthForm.headCircumference}
                          onChange={(e) => setGrowthForm({ ...growthForm, headCircumference: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block font-semibold mb-1 text-black">Arm Circumference (cm)</label>
                        <input
                          type="number"
                          className="w-full border rounded px-3 py-2 text-black"
                          value={growthForm.armCircumference}
                          onChange={(e) => setGrowthForm({ ...growthForm, armCircumference: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 cursor-pointer"
                          onClick={() => setShowGrowthForm(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                        >
                          {editGrowth ? "Save" : "Add"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildrenPage;