"use client";
import { useEffect, useState } from "react";
import { useToast } from "@/components/common/ToastContext";
import Loading from "@/components/common/Loading";
import api from "@/api/api";
import { useConfirmation } from "@/components/common/ConfirmationContext";

interface ConsultationItem {
  id: string;
  member?: { name?: string; email?: string };
  child?: { name?: string };
  status: number;
  createdAt: string;
}

const getConsultationStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "Ongoing";
    case 1:
      return "Completed";
    default:
      return "Unknown";
  }
};

const getConsultationStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return "bg-yellow-100 text-yellow-800";
    case 1:
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function DoctorConsultationsPage() {
  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const confirm = useConfirmation().confirm;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          setDoctorId(parsed.id);
        } catch {
          setDoctorId(null);
        }
      }
    }
  }, []);

  useEffect(() => {
    const fetchConsultations = async () => {
      if (!doctorId) return;
      setLoading(true);
      try {
        const res = await api.get(`/Consultation/doctor/${doctorId}`);
        setConsultations(res.data.data || []);
      } catch {
        toast.showToast("Failed to load consultations", "error");
        setConsultations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConsultations();
  }, [doctorId]);

  const handleEndConsultation = async (consultation: ConsultationItem) => {
    const confirmed = await confirm({
      message: "Are you sure you want to end this consultation? This action cannot be undone.",
      confirmText: "End Consultation",
      cancelText: "Cancel",
    });
    if (!confirmed) return;
    try {
      await api.patch(`/Consultation/${consultation.id}/status`, { status: "Completed" });
      setConsultations((prev) => prev.map((c) => c.id === consultation.id ? { ...c, status: 1 } : c));
    } catch (e) {
      // Optionally show error toast
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">Your Consultations</h1>
      {loading ? (
        <Loading fullScreen className="h-screen" message="Loading consultations..." />
      ) : consultations.length === 0 ? (
        <div className="text-gray-500">No consultations found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-semibold tracking-wider">Member</th>
                <th className="px-4 py-3 text-left font-semibold tracking-wider">Child</th>
                <th className="px-4 py-3 text-center font-semibold tracking-wider">Status</th>
                <th className="px-4 py-3 text-center font-semibold tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {consultations.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{c.member?.name || "N/A"}</div>
                    <div className="text-xs text-gray-500">{c.member?.email || ""}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{c.child?.name || "-"}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConsultationStatusColor(c.status)}`}>{getConsultationStatusText(c.status)}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  {c.status === 0 && (
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleEndConsultation(c)}
                        className="ml-2 px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-all duration-200 shadow-sm"
                      >
                        End Consultation
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 