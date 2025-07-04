"use client";
import React, { useState } from "react";

interface Request {
  id: string;
  memberId: string;
  childId: string;
  doctorId: string;
  status: number;
  message: string;
  doctor: {
    id: string;
    name: string;
    email: string;
  };
  member: {
    id: string;
    name: string;
    email: string;
  };
  child: {
    id: string;
    name: string;
  } | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface RequestListItemProps {
  request: Request;
  onStatusUpdate: (id: string, status: number) => void;
  onViewDetails: (request: Request) => void;
  getStatusText: (status: number) => string;
  getStatusColor: (status: number) => string;
}

export default function RequestListItem({
  request,
  onStatusUpdate,

  onViewDetails,
  getStatusText,
  getStatusColor,
}: RequestListItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(request.status);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <tr className="hover:bg-gray-100 transition-colors duration-200">
      {/* Request Info */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900">
            Request #{request.id.slice(-8)}
          </div>
          <div className="text-sm text-gray-500 mt-1 max-w-xs truncate">
            {request.message}
          </div>
          {request.child && (
            <div className="text-xs text-gray-400 mt-1">
              Child: {request.child?.name || "N/A"}
            </div>
          )}
        </div>
      </td>

      {/* Member */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900">
            {request.member?.name || "N/A"}
          </div>
          <div className="text-sm text-gray-500">{request.member.email}</div>
        </div>
      </td>

      {/* Doctor */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900">
            {request.doctor?.name || "N/A"}
          </div>
          <div className="text-sm text-gray-500">{request.doctor.email}</div>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {!isUpdating ? (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
              request.status
            )}`}
          >
            {getStatusText(request.status)}
          </span>
        ) : (
          <select
            onChange={(e) => {
              setStatus(parseInt(e.target.value));
            }}
            disabled={!isUpdating}
            value={status}
            className="px-3 py-1 text-xs bg-gray-100 border border-blue-400 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-400 disabled:opacity-50"
          >
            <option value={0}>Pending</option>
            <option value={1}>Admin Rejected</option>
            <option value={2}>Admin Accepted</option>
            <option value={3}>Doctor Accepted</option>
            <option value={4}>Doctor Rejected</option>
          </select>
        )}
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-sm text-gray-500">
        {formatDate(request.createdAt)}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex flex-col gap-2">
          {/* Status Update Dropdown */}

          {!isUpdating ? (
            <button
              onClick={() => setIsUpdating(!isUpdating)}
              className="px-3 py-1 text-xs bg-yellow-500 hover:bg-yellow-700 text-white rounded transition-colors duration-200 disabled:opacity-50"
            >
              Update Status
            </button>
          ) : (
            <button
              onClick={() => {
                onStatusUpdate(request.id, status);
                setIsUpdating(false);
              }}
              className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-200 disabled:opacity-50"
            >
              Save
            </button>
          )}

          {/* View Details Button */}
          <button
            onClick={() => onViewDetails(request)}
            className="px-3 py-1 text-xs bg-blue-400 hover:bg-blue-500 text-white rounded transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </td>
    </tr>
  );
}
