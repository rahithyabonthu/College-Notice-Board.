import React, { useEffect } from 'react';
import { CheckCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-70 max-w-sm bg-slate-900 text-white text-xs px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="flex-1 font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white p-0.5 rounded"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
