import React from 'react';
import {
  Pin,
  Paperclip,
  Eye,
  Bookmark,
  Calendar,
  ArrowRight,
  MoreVertical,
  Trash2,
  Edit3,
} from 'lucide-react';
import { Notice, UserRole } from '../types/notice';
import { noticeService, DEPARTMENTS_DATA } from '../services/noticeService';

interface NoticeCardProps {
  notice: Notice;
  role: UserRole;
  onOpenDetails: (notice: Notice) => void;
  onEditNotice?: (notice: Notice) => void;
  onRequestDelete?: (notice: Notice) => void;
  onTogglePin?: (id: string) => void;
  onToggleBookmark?: (id: string) => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({
  notice,
  role,
  onOpenDetails,
  onEditNotice,
  onRequestDelete,
  onTogglePin,
  onToggleBookmark,
}) => {
  const relativeDate = noticeService.formatRelativeDate(notice.publishedDate);
  const deptInfo = DEPARTMENTS_DATA[notice.department];

  return (
    <article
      onClick={() => onOpenDetails(notice)}
      className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 cursor-pointer hover:shadow-md ${
        notice.isPinned
          ? 'border-amber-300/80 dark:border-amber-500/40 bg-gradient-to-b from-amber-50/20 to-transparent dark:from-amber-950/10'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div>
        {/* Kicker / Unboxed Metadata Row */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              {notice.department}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span>{relativeDate}</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span>{notice.category}</span>
          </div>

          <div className="flex items-center gap-2">
            {notice.isPinned && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800/80">
                <Pin className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>PINNED</span>
              </span>
            )}
            {notice.priority === 'urgent' && !notice.isPinned && (
              <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-800/80">
                URGENT
              </span>
            )}
          </div>
        </div>

        {/* Notice Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
          {notice.title}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
          {notice.description}
        </p>

        {/* Attachment preview info if present */}
        {notice.attachment && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
            <Paperclip className="w-3.5 h-3.5 text-blue-500" />
            <span className="truncate max-w-[220px] font-mono text-[11px]">
              {notice.attachment.name}
            </span>
            <span className="text-[10px] text-slate-400">({notice.attachment.size})</span>
          </div>
        )}
      </div>

      {/* Card Footer: Metadata & Actions */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="truncate max-w-[220px] sm:max-w-[300px]">
          <span className="text-slate-400">By </span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{notice.postedBy}</span>
        </div>

        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          {/* Bookmark Button */}
          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(notice.id)}
              title={notice.bookmarked ? 'Remove bookmark' : 'Bookmark this notice'}
              className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  notice.bookmarked ? 'fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400' : ''
                }`}
              />
            </button>
          )}

          {/* Admin Controls */}
          {role === 'admin' && (
            <>
              {onTogglePin && (
                <button
                  onClick={() => onTogglePin(notice.id)}
                  title={notice.isPinned ? 'Unpin notice' : 'Pin notice to top'}
                  className="p-1.5 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Pin className={`w-4 h-4 ${notice.isPinned ? 'fill-amber-500 text-amber-500' : ''}`} />
                </button>
              )}

              {onEditNotice && (
                <button
                  onClick={() => onEditNotice(notice)}
                  title="Edit notice"
                  className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}

              {onRequestDelete && (
                <button
                  onClick={() => onRequestDelete(notice)}
                  title="Delete notice"
                  className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </>
          )}

          {/* View Details Link Arrow */}
          <button
            onClick={() => onOpenDetails(notice)}
            title="Read complete notice"
            className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 pl-1 group-hover:translate-x-0.5 transition-transform"
          >
            <span className="hidden sm:inline">Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
