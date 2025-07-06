import React from "react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  if (!isOpen) return <></>;

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full px-4"
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg border border-gray-200">
          {/* Close Button */}
          <button
            type="button"
            className="absolute top-3 end-3 text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors duration-200"
            data-modal-hide="popup-modal"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          {/* Modal Content */}
          <div className="p-6 md:p-8 text-center">
            {/* Warning Icon */}
            <div className="mx-auto mb-6 w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="text-red-600 w-8 h-8 md:w-10 md:h-10"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="mb-2 text-lg md:text-xl font-semibold text-gray-900">
              Confirm Deletion
            </h3>

            {/* Message */}
            <p className="mb-6 text-sm md:text-base text-gray-600 px-2">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm md:text-base px-6 py-3 md:py-2.5 inline-flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
                onClick={onDelete}
              >
                Yes, delete it
              </button>
              <button
                onClick={onClose}
                data-modal-hide="popup-modal"
                type="button"
                className="py-3 md:py-2.5 px-6 text-sm md:text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
