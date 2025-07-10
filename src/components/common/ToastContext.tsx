"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

interface Toast {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
}

interface ToastContextProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextProps>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

let toastId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded shadow-lg text-white animate-slide-in-right transition-all flex items-center gap-3 min-w-[300px]
              ${toast.type === "success" ? "bg-green-500" : ""}
              ${toast.type === "error" ? "bg-red-500" : ""}
              ${toast.type === "info" ? "bg-blue-500" : ""}
            `}
          >
            {toast.type === "success" && <FaCheckCircle className="text-white text-lg flex-shrink-0" />}
            {toast.type === "error" && <FaExclamationTriangle className="text-white text-lg flex-shrink-0" />}
            {toast.type === "info" && <FaInfoCircle className="text-white text-lg flex-shrink-0" />}
            <span className="flex-1">{toast.message}</span>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes slide-in-right {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.4s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </ToastContext.Provider>
  );
}; 