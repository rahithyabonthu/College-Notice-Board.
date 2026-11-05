import React from 'react';
import {
  Search,
  X,
  RefreshCw,
  SlidersHorizontal,
  Pin,
  Paperclip,
} from 'lucide-react';

export type SortOption = 'latest' | 'oldest' | 'title';

interface SearchBarAndSortProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  showOnlyPinned: boolean;
  onTogglePinnedOnly: () => void;
  showOnlyAttachments: boolean;
  onToggleAttachmentsOnly: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  totalFilteredCount: number;
  totalNoticesCount: number;
}

export const SearchBarAndSort: React.FC<SearchBarAndSortProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  showOnlyPinned,
  onTogglePinnedOnly,
  showOnlyAttachments,
  onToggleAttachmentsOnly,
  onRefresh,
  isRefreshing,
  totalFilteredCount,
  totalNoticesCount,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm mb-6 transition-colors">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Bar Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notices by title, keywords or circular topics..."
            className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Secondary Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Filter: Pinned Only */}
          <button
            onClick={onTogglePinnedOnly}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
              showOnlyPinned
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Pin className="w-3.5 h-3.5 text-amber-500" />
            <span>Pinned Only</span>
          </button>

          {/* Quick Filter: Attachments Only */}
          <button
            onClick={onToggleAttachmentsOnly}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
              showOnlyAttachments
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Paperclip className="w-3.5 h-3.5 text-blue-500" />
            <span>Attachments</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="latest" className="dark:bg-slate-900">Latest Notices First</option>
              <option value="oldest" className="dark:bg-slate-900">Oldest First</option>
              <option value="title" className="dark:bg-slate-900">Title (A-Z)</option>
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            title="Refresh Notice Board"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <span>Displaying</span>
          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
            {totalFilteredCount}
          </span>
          <span>of</span>
          <span className="font-mono">{totalNoticesCount} notices</span>
        </div>

        {(searchQuery || showOnlyPinned || showOnlyAttachments) && (
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
            Active filters applied
          </div>
        )}
      </div>
    </div>
  );
};
