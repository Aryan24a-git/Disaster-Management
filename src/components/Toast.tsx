"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] bg-[#1D1D1D] text-white text-sm font-medium px-5 py-3 rounded-xl shadow-2xl max-w-[90vw] text-center animate-fade-in"
    >
      {message}
    </div>
  );
}
