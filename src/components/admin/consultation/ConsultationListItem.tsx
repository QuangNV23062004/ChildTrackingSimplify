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
    <tr className="hover:bg-gray-100 transition-colors duration-200">
      {/* Consultation Info */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900">
            Consultation #{consultation.id.slice(-8)}
          </div>
          <div className="text-sm text-gray-500 mt-1 max-w-xs truncate">
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
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900">
            {consultation.request.member?.name || "N/A"}
          </div>
          <div className="text-sm text-gray-500">
            {consultation.request.member.email}
          </div>
        </div>
      </td>

      {/* Doctor */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900">
            {consultation.request.doctor?.name || "N/A"}
          </div>
          <div className="text-sm text-gray-500">
            {consultation.request.doctor.email}
          </div>
        </div>
      </td>

      {/* Child */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900">
            {consultation.request.child?.name || "-"}
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {isUpdating ? (
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="px-3 py-1 text-xs  bg-white-400  text-black rounded  duration-200"
          >
            <option value={0}>Ongoing</option>
            <option value={1}>Completed</option>
          </select>
        ) : (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
              consultation.status
            )}`}
          >
            {getStatusText(consultation.status)}
          </span>
        )}
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-sm text-gray-500">
        {formatDate(consultation.createdAt)}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex flex-col gap-2">
          {/* Update Status Button */}
          {!isUpdating ? (
            <button
              onClick={() => setIsUpdating(true)}
              className="px-3 py-1 text-xs bg-yellow-400 hover:bg-yellow-500 text-white rounded transition-colors duration-200"
            >
              Update Status
            </button>
          ) : (
            <button
              onClick={() => {
                onStatusUpdate(consultation.id, status);
                setIsUpdating(false);
              }}
              className="px-3 py-1 text-xs bg-green-400 hover:bg-green-500 text-white rounded transition-colors duration-200"
            >
              Save
            </button>
          )}

          {/* View Details Button */}
          <button
            onClick={() => onViewDetails(consultation)}
            className="px-3 py-1 text-xs bg-blue-400 hover:bg-blue-500 text-white rounded transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </td>
    </tr>
  );
}
