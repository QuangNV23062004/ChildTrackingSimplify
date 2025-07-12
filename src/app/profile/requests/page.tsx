"use client";
import { useEffect, useState } from "react";
import { useToast } from "@/components/common/ToastContext";
import userService from "@/services/userService";
import Loading from "@/components/common/Loading";
import api from "@/api/api";

interface RequestItem {
  id: string;
  doctor: { name: string; email: string };
  child: { name: string };
  message: string;
  status: number;
  createdAt: string;
}

const getRequestStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "Pending";
    case 1:
      return "Admin Rejected";
    case 2:
      return "Admin Accepted";
    case 3:
      return "Doctor Accepted";
    case 4:
      return "Doctor Rejected";
    default:
      return "Unknown";
  }
};

const getRequestStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return "bg-yellow-100 text-yellow-800";
    case 1:
      return "bg-red-100 text-red-800";
    case 2:
      return "bg-green-100 text-green-800";
    case 3:
      return "bg-blue-100 text-blue-800";
    case 4:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function UserRequestsPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [userId, setUserId] = useState<string | null>(null);

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
    const fetchRequests = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const res = await api.get(`/Request/member/${userId}`);
        setRequests(res.data.data || []);
      } catch {
        toast.showToast("Failed to load requests", "error");
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6 text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Consultation Requests</h1>
      {loading ? (
        <Loading fullScreen className="h-screen" message="Loading requests..." />
      ) : requests.length === 0 ? (
        <div className="text-gray-500">No requests found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-semibold tracking-wider">Doctor</th>
                <th className="px-4 py-3 text-left font-semibold tracking-wider">Child</th>
                <th className="px-4 py-3 text-left font-semibold tracking-wider">Message</th>
                <th className="px-4 py-3 text-center font-semibold tracking-wider">Status</th>
                <th className="px-4 py-3 text-center font-semibold tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{req.doctor?.name || "N/A"}</div>
                    <div className="text-xs text-gray-500">{req.doctor?.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{req.child?.name || "-"}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-700">{req.message}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRequestStatusColor(req.status)}`}>
                      {getRequestStatusText(req.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-gray-500">
                    {new Date(req.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 