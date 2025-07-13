"use client";
import { useEffect, useState } from "react";
import consultationService from "@/services/consultationService";
import { Consultation } from "@/types/consultation";
import ConsultationDetailModal from "@/components/admin/consultation/ConsultationDetailModal";
import Loading from "@/components/common/Loading";
import ConsultationForumModal from "@/components/admin/consultation/ConsultationForumModal";
import { useConfirmation } from "@/components/common/ConfirmationContext";
import { useToast } from "@/components/common/ToastContext";

export default function UserConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [forumConsultation, setForumConsultation] =
    useState<Consultation | null>(null);
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [endingConsultation, setEndingConsultation] =
    useState<Consultation | null>(null);
  const confirm = useConfirmation().confirm;
  const toast = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          setUserId(parsed.id);
        } catch {
          setUserId(null);
        }
      }
    }
  }, []);

  useEffect(() => {
    const fetchConsultations = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const response = await consultationService.getConsultationsByMemberId(
          userId
        );
        setConsultations(response.data || []);
      } catch (error) {
        setConsultations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConsultations();
  }, [userId]);

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "On Going";
      case 1:
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-yellow-500";
      case 1:
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  const handleEndConsultation = async (consultation: Consultation) => {
    const confirmed = await confirm({
      message:
        "Are you sure you want to end this consultation? This action cannot be undone.",
      confirmText: "End Consultation",
      cancelText: "Cancel",
    });
    if (!confirmed) return;
    try {
      await consultationService.updateConsultationStatus(
        consultation.id,
        "Completed"
      );
      setConsultations((prev) =>
        prev.map((c) => (c.id === consultation.id ? { ...c, status: 1 } : c))
      );
      toast.showToast("Consultation ended successfully", "success");
    } catch (e) {
      toast.showToast("Failed to end consultation", "error");
    }
  };

  if (loading) {
    return (
      <Loading message="Loading your consultations..." className="h-screen" />
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Your Consultations
        </h1>
        {consultations.length === 0 ? (
          <div className="text-gray-500">No consultations found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold tracking-wider">
                    Consultation Info
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wider">
                    Doctor
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wider">
                    Child
                  </th>
                  <th className="px-4 py-3 text-center font-semibold tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center font-semibold tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-center font-semibold tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {consultations.map((consultation) => {
                  console.log(consultation);
                  return (
                    <tr
                      key={consultation.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">
                          Consultation #{consultation.id.slice(-8)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                          {consultation.request?.message || ""}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {consultation.doctor?.name || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {consultation.doctor?.email || ""}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {consultation.child?.name || "-"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-black ${getStatusColor(
                            consultation.status
                          )}`}
                        >
                          {getStatusText(consultation.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-gray-500">
                        {new Date(consultation.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedConsultation(consultation)}
                          className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-all duration-200 shadow-sm"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => setForumConsultation(consultation)}
                          className="ml-2 px-3 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-all duration-200 shadow-sm"
                        >
                          Forum
                        </button>
                        {consultation.status === 0 && (
                          <button
                            onClick={() => handleEndConsultation(consultation)}
                            className="ml-2 px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-all duration-200 shadow-sm"
                          >
                            End Consultation
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <ConsultationDetailModal
          consultation={selectedConsultation}
          isOpen={!!selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
          getStatusText={getStatusText}
          getStatusColor={getStatusColor}
        />
        {forumConsultation && (
          <ConsultationForumModal
            consultation={forumConsultation}
            isOpen={!!forumConsultation}
            onClose={() => setForumConsultation(null)}
            isCompleted={forumConsultation.status === 1}
          />
        )}
      </div>
    </div>
  );
}
