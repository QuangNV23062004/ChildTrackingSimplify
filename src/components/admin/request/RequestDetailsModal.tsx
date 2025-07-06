import React from "react";

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

interface RequestDetailsModalProps {
  request: Request | null;
  isOpen: boolean;
  onClose: () => void;
  getStatusText: (status: number) => string;
  getStatusColor: (status: number) => string;
}

export default function RequestDetailsModal({
  request,
  isOpen,
  onClose,
  getStatusText,
  getStatusColor,
}: RequestDetailsModalProps) {
  if (!isOpen || !request) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Request Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 text-xl sm:text-2xl font-bold p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Request ID and Status */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Request #{request.id.slice(-8)}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                Created: {formatDate(request.createdAt)}
              </p>
            </div>
            <span
              className={`inline-flex px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full ${getStatusColor(
                request.status
              )}`}
            >
              {getStatusText(request.status)}
            </span>
          </div>

          {/* Message */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
              Message
            </h4>
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base">
                {request.message}
              </p>
            </div>
          </div>

          {/* Member Information */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
              Member Information
            </h4>
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Name</p>
                  <p className="text-gray-900 font-medium text-sm sm:text-base">
                    {request.member.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Email</p>
                  <p className="text-gray-900 font-medium text-sm sm:text-base break-all">
                    {request.member.email}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-gray-500 text-xs sm:text-sm">Member ID</p>
                  <p className="text-gray-700 font-mono text-xs sm:text-sm break-all">
                    {request.memberId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Information */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
              Doctor Information
            </h4>
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Name</p>
                  <p className="text-gray-900 font-medium text-sm sm:text-base">
                    {request.doctor.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Email</p>
                  <p className="text-gray-900 font-medium text-sm sm:text-base break-all">
                    {request.doctor.email}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-gray-500 text-xs sm:text-sm">Doctor ID</p>
                  <p className="text-gray-700 font-mono text-xs sm:text-sm break-all">
                    {request.doctorId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Child Information */}
          {request.child && (
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                Child Information
              </h4>
              <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm">Name</p>
                    <p className="text-gray-900 font-medium text-sm sm:text-base">
                      {request.child.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm">Child ID</p>
                    <p className="text-gray-700 font-mono text-xs sm:text-sm break-all">
                      {request.childId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
              Timestamps
            </h4>
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Created At</p>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    {formatDate(request.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Last Updated
                  </p>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    {formatDate(request.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Request ID */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
              Request ID
            </h4>
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
              <p className="text-gray-900 font-mono text-xs sm:text-sm break-all">
                {request.id}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
