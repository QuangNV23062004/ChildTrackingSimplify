"use client";
import React, { useState } from "react";

interface Consultation {
  id: string;
  status: number; // 0: Ongoing, 1: Completed
  rating: number;
  createdAt: string;
  request: {
    message: string;
    member: { name: string; email: string };
    doctor: { name: string; email: string };
    child?: { name: string } | null;
  };
}

interface ConsultationListItemProps {
  consultation: Consultation;
  getStatusText: (status: number) => string;
  getStatusColor: (status: number) => string;
  onViewDetails: (consultation: Consultation) => void;
  onStatusUpdate: (id: string, status: number) => void;
}

export default function ConsultationListItem({
  consultation,
  getStatusText,
  getStatusColor,
  onViewDetails,
  onStatusUpdate,
}: ConsultationListItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(consultation.status);

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200">
      {/* Consultation Info */}
      <td className="px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900">
            Consultation #{consultation.id.slice(-8)}
          </div>
          <div className="text-xs lg:text-sm text-gray-500 mt-1 max-w-xs truncate">
            {consultation.request.message}
          </div>
          {consultation.request.child && (
            <div className="text-xs text-gray-400 mt-1">
              Child: {consultation.request.child?.name || "N/A"}
            </div>
          )}
        </div>
      </td>

      {/* Member */}
      <td className="px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900 truncate">
            {consultation.request.member?.name || "N/A"}
          </div>
          <div className="text-xs lg:text-sm text-gray-500 truncate">
            {consultation.request.member.email}
          </div>
        </div>
      </td>

      {/* Doctor */}
      <td className="px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900 truncate">
            {consultation.request.doctor?.name || "N/A"}
          </div>
          <div className="text-xs lg:text-sm text-gray-500 truncate">
            {consultation.request.doctor.email}
          </div>
        </div>
      </td>

      {/* Child */}
      <td className="px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900 truncate">
            {consultation.request.child?.name || "-"}
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 lg:px-6 py-3 lg:py-4">
        {isUpdating ? (
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="px-2 lg:px-3 py-1 text-xs bg-gray-100 border border-blue-400 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-colors duration-200"
          >
            <option value={0}>Ongoing</option>
            <option value={1}>Completed</option>
          </select>
        ) : (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-black ${getStatusColor(
              consultation.status
            )}`}
          >
            {getStatusText(consultation.status)}
          </span>
        )}
      </td>

      {/* Date */}
      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-500">
        {formatDate(consultation.createdAt)}
      </td>

      {/* Actions */}
      <td className="px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex flex-col gap-2">
          {/* Update Status Button */}
          {!isUpdating ? (
            <button
              onClick={() => setIsUpdating(true)}
              className="px-2 lg:px-3 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-black rounded transition-all duration-200 disabled:opacity-50 shadow-sm hover:shadow-md"
            >
              Update Status
            </button>
          ) : (
            <button
              onClick={() => {
                onStatusUpdate(consultation.id, status);
                setIsUpdating(false);
              }}
              className="px-2 lg:px-3 py-1 text-xs bg-green-600 hover:bg-green-700 active:bg-green-800 text-black rounded transition-all duration-200 disabled:opacity-50 shadow-sm hover:shadow-md"
            >
              Save
            </button>
          )}

          {/* View Details Button */}
          <button
            onClick={() => onViewDetails(consultation)}
            className="px-2 lg:px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-black rounded transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View Details
          </button>
        </div>
      </td>
    </tr>
  );
}
