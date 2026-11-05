import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Notice } from '../types/notice';

interface DeleteConfirmDialogProps {
  notice: Notice | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  notice,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !notice) return null;

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-150"
        role="alertdialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Delete this notice?
            </h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">&quot;{notice.title}&quot;</span>? This action removes the notice from the college bulletin board permanently.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm(notice.id);
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
