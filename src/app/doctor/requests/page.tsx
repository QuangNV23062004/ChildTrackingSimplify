"use client";
import { useEffect, useState } from "react";
import { useToast } from "@/components/common/ToastContext";
import Loading from "@/components/common/Loading";
import api from "@/api/api";
import DataChartModal from "@/components/growthDataChart/DataChartModal";
import { GrowthData } from "@/components/growthDataChart/DataChart";

interface RequestItem {
  id: string;
  member: { name: string; email: string };
  child: { name: string; id: string };
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

export default function DoctorRequestsPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [growthModalOpen, setGrowthModalOpen] = useState(false);
  const [growthData, setGrowthData] = useState<GrowthData[]>([]);

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

  const fetchRequests = async () => {
    if (!doctorId) return;
    setLoading(true);
    try {
      const res = await api.get(`/Request/doctor/${doctorId}`);
      setRequests(res.data.data || []);
    } catch {
      toast.showToast("Failed to load requests", "error");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line
  }, [doctorId]);

  const handleAction = async (
    id: string,
    status: "Doctor_Accepted" | "Doctor_Rejected"
  ) => {
    setActionLoading(id + status);
    try {
      await api.patch(`/Request/${id}/status`, { status });
      toast.showToast(
        `Request ${status === "Doctor_Accepted" ? "approved" : "rejected"}!`,
        "success"
      );
      fetchRequests();
    } catch {
      toast.showToast("Failed to update request status", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewGrowthData = async (childId: string) => {
    try {
      const res = await api.get(`/GrowthData/child/${childId}`);
      setGrowthData(res.data.data || []);
      setGrowthModalOpen(true);
    } catch {
      toast.showToast("Failed to load growth data", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Requests Assigned to You</h1>
      {loading ? (
        <Loading
          fullScreen
          className="h-screen"
          message="Loading requests..."
        />
      ) : requests.length === 0 ? (
        <div className="text-gray-500">No requests found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-semibold tracking-wider">
                  Member
                </th>
                <th className="px-4 py-3 text-left font-semibold tracking-wider">
                  Child
                </th>
                <th className="px-4 py-3 text-left font-semibold tracking-wider">
                  Message
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
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">
                      {req.member?.name || "N/A"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {req.member?.email}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">
                      {req.child?.name || "-"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-700">{req.message}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRequestStatusColor(
                        req.status
                      )}`}
                    >
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
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col gap-2">
                      {" "}
                      <div className="flex gap-2 justify-center">
                        <button
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
                          onClick={() =>
                            handleAction(req.id, "Doctor_Accepted")
                          }
                          disabled={
                            actionLoading === req.id + "Doctor_Accepted"
                          }
                        >
                          {actionLoading === req.id + "Doctor_Accepted"
                            ? "Approving..."
                            : "Approve"}
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer disabled:opacity-50"
                          onClick={() =>
                            handleAction(req.id, "Doctor_Rejected")
                          }
                          disabled={
                            actionLoading === req.id + "Doctor_Rejected"
                          }
                        >
                          {actionLoading === req.id + "Doctor_Rejected"
                            ? "Rejecting..."
                            : "Reject"}
                        </button>
                      </div>
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                        onClick={() => handleViewGrowthData(req.child?.id)}
                      >
                        View Growth Data
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <DataChartModal
        isOpen={growthModalOpen}
        onClose={() => setGrowthModalOpen(false)}
        data={growthData}
      />
    </div>
  );
}
