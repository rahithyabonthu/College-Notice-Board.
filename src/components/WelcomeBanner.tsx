import React from 'react';
import {
  Bell,
  Pin,
  Calendar,
  Building,
  PlusCircle,
  FileText,
} from 'lucide-react';
import { UserRole } from '../types/notice';

interface WelcomeBannerProps {
  totalNotices: number;
  pinnedCount: number;
  role: UserRole;
  onOpenPublishModal: () => void;
  onScrollToNotices: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  totalNotices,
  pinnedCount,
  role,
  onOpenPublishModal,
  onScrollToNotices,
}) => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors mb-8">
      {/* Background Campus Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/college_campus_banner_1793903374548.jpg"
          alt="College Campus Architecture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-20 dark:opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900/70" />
      </div>

      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-blue-700 dark:text-blue-400 mb-2">
              <span className="font-semibold uppercase tracking-wider">
                Official Digital Bulletin
              </span>
              <span aria-hidden="true">·</span>
              <span>Autumn Semester 2026</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">Live Sync</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
              Welcome to the College Notice Board
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Stay up-to-date with academic announcements, semester examination timetables,
              campus recruitment drives, and department activities. All official circulars are published in real-time.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={onScrollToNotices}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                Browse Latest Notices
              </button>

              {role === 'admin' ? (
                <button
                  onClick={onOpenPublishModal}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish New Notice</span>
                </button>
              ) : (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Viewing in verified student access mode
                </span>
              )}
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Total Notices</span>
              </div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                {totalNotices}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Across 7 departments
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <Pin className="w-4 h-4 text-amber-500" />
                <span>Pinned / Urgent</span>
              </div>
              <div className="text-2xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
                {pinnedCount}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                High priority actions
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Academic Date</span>
              </div>
              <div className="text-base font-bold font-mono text-slate-900 dark:text-white">
                Nov 05, 2026
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                Current Term Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
