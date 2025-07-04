"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import consultationService from "@/services/consultationService";
import { Consultation } from "@/types/consultation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import ServerPagination from "@/components/common/ServerPagination";
import ConsultationDetailModal from "./ConsultationDetailModal";
import ConsultationListItem from "./ConsultationListItem";

export default function ConsultationList({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);

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

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await consultationService.getConsultations(page, size);
      setConsultations(response.data || []);
      setTotalPages(response.totalPages);
      setTotal(response.total);
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Failed to fetch consultations"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, [page, size]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleUpdateConsultationStatus = async (id: string, status: number) => {
    try {
      const response = await consultationService.updateConsultationStatus(
        id,
        status === 0 ? "Ongoing" : "Completed"
      );
      setConsultations([
        ...consultations.map((c) =>
          c.id === id ? { ...c, status: response.consultation.status } : c
        ),
      ]);
      toast.success("Consultation status updated successfully");
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Failed to update consultation status"
      );
    }
  };
  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Consultation Management
        </h1>
        <p className="text-gray-500">Manage consultations from members</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          <select
            value={size}
            onChange={(e) =>
              router.push(`/admin/consultations?size=${e.target.value}`)
            }
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      {consultations && consultations.length > 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{total}</div>
            <div className="text-gray-500">Total Requests</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-yellow-500">
              {consultations?.filter((c) => c.status === 0).length || 0}
            </div>
            <div className="text-gray-500">On Going</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-500">
              {consultations?.filter((c) => c.status === 1).length || 0}
            </div>
            <div className="text-gray-500">Completed</div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left font-semibold tracking-wider">
                  Consultation Info
                </th>
                <th className="px-6 py-3 text-left font-semibold tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left font-semibold tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left font-semibold tracking-wider">
                  Child
                </th>
                <th className="px-6 py-3 text-center font-semibold tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center font-semibold tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-center font-semibold tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {!consultations || consultations.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No requests found
                  </td>
                </tr>
              ) : (
                consultations.map((consultation) => (
                  <ConsultationListItem
                    key={consultation.id}
                    consultation={consultation}
                    onViewDetails={() => {
                      setSelectedConsultation(consultation);
                      setIsModalOpen(true);
                    }}
                    getStatusText={getStatusText}
                    getStatusColor={getStatusColor}
                    onStatusUpdate={handleUpdateConsultationStatus}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <ServerPagination
            currentPage={page}
            totalPages={totalPages}
            pageSize={size}
          />
        </div>
      )}

      {/* Request Details Modal */}
      <ConsultationDetailModal
        consultation={selectedConsultation}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        getStatusText={getStatusText}
        getStatusColor={getStatusColor}
      />
    </div>
  );
}
