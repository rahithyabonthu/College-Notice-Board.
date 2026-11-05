import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  KeyRound,
  X,
  AlertCircle,
  Check,
  Lock,
} from 'lucide-react';
import { UserRole } from '../types/notice';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onShowToast: (msg: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
  onShowToast,
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode.toLowerCase() === 'admin') {
      onSelectRole('admin');
      onShowToast('Switched to Administrator Mode');
      setError('');
      setPasscode('');
      onClose();
    } else {
      setError('Invalid passcode. Use demo passcode: admin123');
    }
  };

  const handleQuickDemoAdmin = () => {
    setPasscode('admin123');
    onSelectRole('admin');
    onShowToast('Switched to Administrator Mode');
    setError('');
    onClose();
  };

  const handleSwitchToStudent = () => {
    onSelectRole('student');
    onShowToast('Switched to Student Mode');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-6"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Access & User Role
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Switch between Student and Admin privileges
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Role Status */}
        <div className="my-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
          <div className="text-xs text-slate-500 dark:text-slate-400">Current Session:</div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              {currentRole === 'admin' ? (
                <ShieldCheck className="w-5 h-5 text-amber-500" />
              ) : (
                <UserCheck className="w-5 h-5 text-blue-500" />
              )}
              <span className="font-bold text-sm text-slate-900 dark:text-white capitalize">
                {currentRole === 'admin' ? 'College Administrator' : 'Student (Read-Only)'}
              </span>
            </div>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                currentRole === 'admin'
                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300'
                  : 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300'
              }`}
            >
              Active
            </span>
          </div>
        </div>

        {/* Admin Login Form */}
        {currentRole === 'student' ? (
          <div>
            <form onSubmit={handleAdminAuth} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Admin Passcode
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter admin passcode"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-1 text-xs text-rose-500 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span>Demo Passcode:</span>
                <button
                  type="button"
                  onClick={handleQuickDemoAdmin}
                  className="font-mono text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Quick Sign In (admin123)
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-sm transition-colors"
              >
                Sign In as Administrator
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              You are currently authenticated as an administrator. You have permissions to post, edit, pin, and delete notices.
            </p>

            <button
              onClick={handleSwitchToStudent}
              className="w-full py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
            >
              Switch back to Student Mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
