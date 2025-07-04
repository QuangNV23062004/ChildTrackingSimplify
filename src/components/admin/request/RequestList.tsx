"use client";
import React, { useState, useEffect } from "react";
import requestService from "@/services/requestService";
import RequestListItem from "./RequestListItem";
import RequestDetailsModal from "./RequestDetailsModal";
import ServerPagination from "@/components/common/ServerPagination";
import { RequestStatusArray, RequestStatusEnum } from "@/enum/RequestEnum";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Request, RequestResponse } from "@/types/request";

export default function RequestList({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const response: RequestResponse = await requestService.getRequest(
        page,
        size
      );

      console.log("API Response:", response);

      if (response) {
        // Handle different possible response structures
        const data = response.data || response.data || [];
        const totalPages = response.totalPages || response.totalPages || 1;
        const total = response.total || response.total || 0;

        console.log("Processed data:", { data, totalPages, total });

        setRequests(Array.isArray(data) ? data : []);
        setTotalPages(totalPages);
        setTotal(total);
      } else {
        console.warn("No response received");
        setRequests([]);
        setTotalPages(1);
        setTotal(0);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      setRequests([]);
      setTotalPages(1);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, size]);

  const handleStatusUpdate = async (id: string, status: number) => {
    try {
      const statusString = RequestStatusArray.find((s) => s.value === status)
        ?.enumValue as string;

      console.log(statusString);
      const response = await requestService.updateRequestStatus(
        id,
        statusString
      );
      console.log(response);
      setRequests(
        requests.map((r) =>
          r.id === id ? { ...r, status: response.result.status } : r
        )
      );
      toast.success("Request status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.error
          : "Error updating request status"
      );
    }
  };

  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const getStatusText = (status: number): string => {
    switch (status) {
      case 0:
        return RequestStatusEnum.Pending;
      case 1:
        return RequestStatusEnum.Admin_Rejected;
      case 2:
        return RequestStatusEnum.Admin_Accepted;
      case 3:
        return RequestStatusEnum.Doctor_Accepted;
      case 4:
        return RequestStatusEnum.Doctor_Rejected;
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: number): string => {
    switch (status) {
      case 0:
        return "bg-yellow-500 text-white";
      case 1:
        return "bg-red-500 text-white";
      case 2:
        return "bg-green-500 text-white";
      case 3:
        return "bg-blue-500 text-white";
      case 4:
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Request Management
          </h1>
          <p className="text-gray-500">
            Manage consultation requests from members
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <select
              value={size}
              onChange={(e) =>
                router.push(`/admin/requests?size=${e.target.value}`)
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

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{total}</div>
            <div className="text-gray-500">Total Requests</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-yellow-500">
              {requests?.filter((r) => r.status === 0).length || 0}
            </div>
            <div className="text-gray-500">Pending</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-500">
              {requests?.filter((r) => r.status === 2 || r.status === 3)
                .length || 0}
            </div>
            <div className="text-gray-500">Accepted</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-red-500">
              {requests?.filter((r) => r.status === 1 || r.status === 4)
                .length || 0}
            </div>
            <div className="text-gray-500">Rejected</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Request Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {!requests || requests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-400"
                    >
                      No requests found
                    </td>
                  </tr>
                ) : (
                  requests.map((request) => (
                    <RequestListItem
                      key={request.id}
                      request={request}
                      onStatusUpdate={handleStatusUpdate}
                      onViewDetails={handleViewDetails}
                      getStatusText={getStatusText}
                      getStatusColor={getStatusColor}
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
        <RequestDetailsModal
          request={selectedRequest}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          getStatusText={getStatusText}
          getStatusColor={getStatusColor}
        />
      </div>
    </div>
  );
}
