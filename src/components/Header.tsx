import React from 'react';
import {
  BellRing,
  ShieldCheck,
  UserCheck,
  Sun,
  Moon,
  Plus,
  Database,
  Bookmark,
  GraduationCap,
} from 'lucide-react';
import { UserRole } from '../types/notice';

interface HeaderProps {
  currentTab: 'all' | 'departments' | 'bookmarks' | 'firebase';
  onSelectTab: (tab: 'all' | 'departments' | 'bookmarks' | 'firebase') => void;
  role: UserRole;
  onOpenAuthModal: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenPublishModal: () => void;
  bookmarkCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  role,
  onOpenAuthModal,
  isDark,
  onToggleTheme,
  onOpenPublishModal,
  bookmarkCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand wordmark */}
          <div
            onClick={() => onSelectTab('all')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight whitespace-nowrap shrink-0 leading-none">
                College Notice Board
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                Academic & Campus Portal
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => onSelectTab('all')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentTab === 'all'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Notices
            </button>
            <button
              onClick={() => onSelectTab('departments')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentTab === 'departments'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Departments
            </button>
            <button
              onClick={() => onSelectTab('bookmarks')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
                currentTab === 'bookmarks'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Notices</span>
              {bookmarkCount > 0 && (
                <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {bookmarkCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onSelectTab('firebase')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
                currentTab === 'firebase'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Cloud Sync</span>
            </button>
          </nav>

          {/* Zone 3: Actions & Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Dark Mode"
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Role Switcher Pill/Button */}
            <button
              onClick={onOpenAuthModal}
              title={`Active role: ${role === 'admin' ? 'Administrator' : 'Student (Read-Only)'}. Click to switch.`}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                role === 'admin'
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/40'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {role === 'admin' ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="hidden sm:inline">Admin Access</span>
                  <span className="sm:hidden">Admin</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="hidden sm:inline">Student View</span>
                  <span className="sm:hidden">Student</span>
                </>
              )}
            </button>

            {/* Post Notice Action (if Admin) or Admin Login CTA */}
            {role === 'admin' ? (
              <button
                onClick={onOpenPublishModal}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Post Notice</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
