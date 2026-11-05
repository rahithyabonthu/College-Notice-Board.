import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Building,
  User,
  Paperclip,
  Download,
  Share2,
  Printer,
  Bookmark,
  Pin,
  Edit3,
  Trash2,
  Check,
  Eye,
  FileText,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { Notice, UserRole } from '../types/notice';
import { noticeService, DEPARTMENTS_DATA } from '../services/noticeService';

interface NoticeDetailsModalProps {
  notice: Notice | null;
  onClose: () => void;
  role: UserRole;
  onEditNotice?: (notice: Notice) => void;
  onRequestDelete?: (notice: Notice) => void;
  onTogglePin?: (id: string) => void;
  onToggleBookmark?: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const NoticeDetailsModal: React.FC<NoticeDetailsModalProps> = ({
  notice,
  onClose,
  role,
  onEditNotice,
  onRequestDelete,
  onTogglePin,
  onToggleBookmark,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [showAttachmentViewer, setShowAttachmentViewer] = useState(false);

  if (!notice) return null;

  const fullDate = noticeService.formatFullDate(notice.publishedDate);
  const relativeDate = noticeService.formatRelativeDate(notice.publishedDate);
  const deptInfo = DEPARTMENTS_DATA[notice.department];

  const handleShare = async () => {
    try {
      const shareText = `College Notice: ${notice.title}\nDepartment: ${notice.department}\nPublished: ${relativeDate}\n${notice.description.slice(0, 150)}...`;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        onShowToast('Notice details copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      onShowToast('Unable to copy notice link');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 transition-all">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Action Bar with Back Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 px-2.5 -ml-2 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Notices</span>
          </button>

          <div className="flex items-center gap-1.5">
            {/* Share / Copy */}
            <button
              onClick={handleShare}
              title="Share notice"
              className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              title="Print notice"
              className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Bookmark */}
            {onToggleBookmark && (
              <button
                onClick={() => onToggleBookmark(notice.id)}
                title={notice.bookmarked ? 'Saved in bookmarks' : 'Save notice'}
                className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    notice.bookmarked ? 'fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400' : ''
                  }`}
                />
              </button>
            )}

            {/* Admin Actions */}
            {role === 'admin' && (
              <>
                <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

                {onTogglePin && (
                  <button
                    onClick={() => onTogglePin(notice.id)}
                    title={notice.isPinned ? 'Unpin' : 'Pin notice'}
                    className="p-2 text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
                  >
                    <Pin className={`w-4 h-4 ${notice.isPinned ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>
                )}

                {onEditNotice && (
                  <button
                    onClick={() => {
                      onClose();
                      onEditNotice(notice);
                    }}
                    title="Edit Notice"
                    className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}

                {onRequestDelete && (
                  <button
                    onClick={() => {
                      onRequestDelete(notice);
                    }}
                    title="Delete Notice"
                    className="p-2 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[calc(85vh-100px)] overflow-y-auto">
          {/* Metadata Kicker */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {notice.department}
            </span>
            <span aria-hidden="true">·</span>
            <span>{deptInfo?.name || notice.department}</span>
            <span aria-hidden="true">·</span>
            <span>{notice.category}</span>
            {notice.isPinned && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                  <Pin className="w-3 h-3 fill-amber-500 text-amber-500" />
                  Pinned Bulletin
                </span>
              </>
            )}
          </div>

          {/* Complete Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
            {notice.title}
          </h2>

          {/* Author & Published Date Strip */}
          <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                {notice.postedBy.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  {notice.postedBy}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Authorized Publishing Authority
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 sm:border-l sm:border-slate-200 sm:dark:border-slate-700 sm:pl-4">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div>
                <div>{fullDate}</div>
                <div className="text-[11px] text-slate-400 font-medium">({relativeDate})</div>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mt-6 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
            {notice.description}
          </div>

          {/* Optional Attachment Section */}
          {notice.attachment && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Official Attached Document</span>
                </h4>
                <span className="text-[11px] font-mono text-slate-400">
                  {notice.attachment.size}
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 truncate">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {notice.attachment.name}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase">
                      {notice.attachment.type} Document · Verified Signature
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setShowAttachmentViewer(true)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>

                  <a
                    href={notice.attachment.dataUrl || '#'}
                    download={notice.attachment.name}
                    onClick={(e) => {
                      if (!notice.attachment?.dataUrl) {
                        e.preventDefault();
                        onShowToast(`Downloading ${notice.attachment?.name}...`);
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Institutional Compliance Seal */}
          <div className="mt-8 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
            <span>Notice ID: {notice.id}</span>
            <span>College Academic Administration Authority</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {role === 'student' ? 'Viewing in Student Mode' : 'Admin Session Active'}
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Attachment Preview Modal */}
      {showAttachmentViewer && notice.attachment && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {notice.attachment.name}
                </span>
              </div>
              <button
                onClick={() => setShowAttachmentViewer(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white px-2 py-1 rounded"
              >
                Close Preview
              </button>
            </div>

            <div className="my-6 p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <FileText className="w-8 h-8" />
              </div>
              <h5 className="font-bold text-base text-slate-900 dark:text-white">
                Official Document Preview
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                Verified digital copy attached to &quot;{notice.title}&quot;. Ready for high-resolution printing or offline reading.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={notice.attachment.dataUrl || '#'}
                  download={notice.attachment.name}
                  onClick={() => onShowToast(`Downloaded ${notice.attachment?.name}`)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Document ({notice.attachment.size})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
