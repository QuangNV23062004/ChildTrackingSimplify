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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Request Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Request ID and Status */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Request #{request.id.slice(-8)}
              </h3>
              <p className="text-gray-500 text-sm">
                Created: {formatDate(request.createdAt)}
              </p>
            </div>
            <span
              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                request.status
              )}`}
            >
              {getStatusText(request.status)}
            </span>
          </div>

          {/* Message */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-2">
              Message
            </h4>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">
                {request.message}
              </p>
            </div>
          </div>

          {/* Member Information */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-2">
              Member Information
            </h4>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Name</p>
                  <p className="text-gray-900 font-medium">
                    {request.member.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-gray-900 font-medium">
                    {request.member.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Member ID</p>
                  <p className="text-gray-700 font-mono text-sm">
                    {request.memberId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Information */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-2">
              Doctor Information
            </h4>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Name</p>
                  <p className="text-gray-900 font-medium">
                    {request.doctor.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-gray-900 font-medium">
                    {request.doctor.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Doctor ID</p>
                  <p className="text-gray-700 font-mono text-sm">
                    {request.doctorId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Child Information */}
          {request.child && (
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">
                Child Information
              </h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Name</p>
                    <p className="text-gray-900 font-medium">
                      {request.child.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Child ID</p>
                    <p className="text-gray-700 font-mono text-sm">
                      {request.childId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-2">
              Timestamps
            </h4>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Created At</p>
                  <p className="text-gray-700 text-sm">
                    {formatDate(request.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Last Updated</p>
                  <p className="text-gray-700 text-sm">
                    {formatDate(request.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Request ID */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-2">
              Request ID
            </h4>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-900 font-mono text-sm break-all">
                {request.id}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
