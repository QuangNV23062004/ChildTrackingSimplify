"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
  className?: string;
  message?: string;
}

const Loading: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  fullScreen = false,
  className = "",
  message = "Loading...",
}) => {
  // Size mappings
  const sizeClasses = {
    small: "h-6 w-6 border-2",
    medium: "h-12 w-12 border-t-2 border-b-2",
    large: "h-16 w-16 border-4",
  };

  // Container classes based on fullScreen prop
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30"
    : "flex flex-col items-center justify-center w-full h-full";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-blue-500`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <span className="text-blue-700 font-semibold text-lg mt-4">{message}</span>
      )}
    </div>
  );
};

export default Loading; 