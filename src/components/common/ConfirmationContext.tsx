"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { FaQuestionCircle } from "react-icons/fa";

interface ConfirmationOptions {
  message: string;
  icon?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmationContextProps {
  confirm: (options: ConfirmationOptions) => Promise<boolean>;
}

const ConfirmationContext = createContext<ConfirmationContextProps>({
  confirm: async () => false,
});

export const useConfirmation = () => useContext(ConfirmationContext);

export const ConfirmationProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmationOptions>({ message: "Are you sure?" });
  const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => () => {});

  const confirm = (opts: ConfirmationOptions) => {
    setOptions(opts);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const handleConfirm = () => {
    setOpen(false);
    resolvePromise(true);
  };
  const handleCancel = () => {
    setOpen(false);
    resolvePromise(false);
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      {open && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm flex flex-col items-center text-center">
            <div className="mb-4">
              {options.icon || <FaQuestionCircle className="text-blue-500 text-4xl mx-auto" />}
            </div>
            <div className="text-lg font-semibold mb-6 text-gray-900">{options.message}</div>
            <div className="flex gap-4 w-full justify-center">
              <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer" onClick={handleConfirm}>
                {options.confirmText || "Yes"}
              </button>
              <button className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition cursor-pointer" onClick={handleCancel}>
                {options.cancelText || "No"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmationContext.Provider>
  );
}; 