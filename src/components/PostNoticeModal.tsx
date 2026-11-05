import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Paperclip,
  CheckCircle,
  AlertCircle,
  Calendar,
  Building,
  User,
  Tag,
  Pin,
  Trash2,
  FileText,
} from 'lucide-react';
import {
  Notice,
  Department,
  NoticePriority,
  NoticeCategory,
  Attachment,
} from '../types/notice';
import { DEPARTMENTS_DATA } from '../services/noticeService';

interface PostNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (noticeData: Omit<Notice, 'id' | 'viewsCount' | 'bookmarked'>) => void;
  onUpdate?: (id: string, updates: Partial<Notice>) => void;
  editingNotice?: Notice | null;
}

export const PostNoticeModal: React.FC<PostNoticeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  editingNotice,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState<Department>('CSE');
  const [publishedDate, setPublishedDate] = useState('');
  const [postedBy, setPostedBy] = useState('Department Academic Office');
  const [priority, setPriority] = useState<NoticePriority>('normal');
  const [category, setCategory] = useState<NoticeCategory>('Academic');
  const [isPinned, setIsPinned] = useState(false);
  const [attachment, setAttachment] = useState<Attachment | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    department?: string;
    publishedDate?: string;
    postedBy?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successSubmitted, setSuccessSubmitted] = useState(false);

  // Initialize form state
  useEffect(() => {
    if (editingNotice) {
      setTitle(editingNotice.title);
      setDescription(editingNotice.description);
      setDepartment(editingNotice.department);
      setPublishedDate(editingNotice.publishedDate.slice(0, 16));
      setPostedBy(editingNotice.postedBy);
      setPriority(editingNotice.priority);
      setCategory(editingNotice.category);
      setIsPinned(editingNotice.isPinned);
      setAttachment(editingNotice.attachment || null);
    } else {
      // Default to current local date/time
      const now = new Date('2026-11-05T10:30:00');
      const iso = now.toISOString().slice(0, 16);
      setTitle('');
      setDescription('');
      setDepartment('CSE');
      setPublishedDate(iso);
      setPostedBy('Department Academic Office');
      setPriority('normal');
      setCategory('Academic');
      setIsPinned(false);
      setAttachment(null);
    }
    setErrors({});
    setIsSubmitting(false);
    setSuccessSubmitted(false);
  }, [editingNotice, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = 'Notice title is required.';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long.';
    }

    if (!description.trim()) {
      newErrors.description = 'Notice description is required.';
    } else if (description.trim().length < 15) {
      newErrors.description = 'Please provide a clear description (at least 15 characters).';
    }

    if (!department || department === 'All') {
      newErrors.department = 'Please select a specific department.';
    }

    if (!publishedDate) {
      newErrors.publishedDate = 'Please select a valid publication date.';
    }

    if (!postedBy.trim()) {
      newErrors.postedBy = 'Publishing authority / author name is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size check (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Attachment size cannot exceed 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const sizeFormatted =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;

      const type: Attachment['type'] = file.type.includes('image')
        ? 'image'
        : file.name.endsWith('.pdf')
        ? 'pdf'
        : 'doc';

      setAttachment({
        id: 'att-' + Date.now(),
        name: file.name,
        size: sizeFormatted,
        type,
        url: '#',
        dataUrl: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent duplicate clicks

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate brief asynchronous processing / DB write
    setTimeout(() => {
      const isoDate = new Date(publishedDate).toISOString();

      if (editingNotice && onUpdate) {
        onUpdate(editingNotice.id, {
          title: title.trim(),
          description: description.trim(),
          department,
          publishedDate: isoDate,
          postedBy: postedBy.trim(),
          priority,
          category,
          isPinned,
          attachment: attachment || undefined,
        });
      } else {
        onSave({
          title: title.trim(),
          description: description.trim(),
          department,
          publishedDate: isoDate,
          postedBy: postedBy.trim(),
          priority,
          category,
          isPinned,
          attachment: attachment || undefined,
        });
      }

      setSuccessSubmitted(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 1000);
    }, 450);
  };

  const availableDepts: Department[] = [
    'CSE',
    'AIML',
    'ECE',
    'EEE',
    'Mechanical',
    'Civil',
    'General',
  ];

  const categories: NoticeCategory[] = [
    'Academic',
    'Examination',
    'Placement',
    'Workshop',
    'Sports',
    'Event',
    'Administration',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 transition-all">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingNotice ? 'Edit Notice' : 'Publish New Notice'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Authorized admin publication to the digital bulletin
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success message banner */}
        {successSubmitted ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Notice Successfully Published!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              The announcement has been broadcast to students and staff across the college bulletin.
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6 max-h-[calc(85vh-120px)] overflow-y-auto space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Notice Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
                }}
                placeholder="e.g. Schedule for Autumn Semester Mid-Term Laboratory Exams"
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.title
                    ? 'border-rose-400 focus:border-rose-500'
                    : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                }`}
              />
              {errors.title && (
                <div className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.title}</span>
                </div>
              )}
            </div>

            {/* Department & Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Department <span className="text-rose-500">*</span>
                </label>
                <select
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value as Department);
                    if (errors.department) setErrors((prev) => ({ ...prev, department: undefined }));
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    errors.department
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                  }`}
                >
                  {availableDepts.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept} — {DEPARTMENTS_DATA[dept].name}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <div className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.department}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as NoticeCategory)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Published Date & Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Publish Date & Time <span className="text-rose-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={publishedDate}
                  onChange={(e) => {
                    setPublishedDate(e.target.value);
                    if (errors.publishedDate) setErrors((prev) => ({ ...prev, publishedDate: undefined }));
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    errors.publishedDate
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                  }`}
                />
                {errors.publishedDate && (
                  <div className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.publishedDate}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Posted By (Authority) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={postedBy}
                  onChange={(e) => {
                    setPostedBy(e.target.value);
                    if (errors.postedBy) setErrors((prev) => ({ ...prev, postedBy: undefined }));
                  }}
                  placeholder="e.g. HOD - Dept of CSE, Exam Cell"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    errors.postedBy
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                  }`}
                />
                {errors.postedBy && (
                  <div className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.postedBy}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Priority & Pinned Flags */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Priority:
                </span>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="normal"
                    checked={priority === 'normal'}
                    onChange={() => setPriority('normal')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Normal</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="important"
                    checked={priority === 'important'}
                    onChange={() => setPriority('important')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Important</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="urgent"
                    checked={priority === 'urgent'}
                    onChange={() => setPriority('urgent')}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <span className="font-semibold text-rose-600 dark:text-rose-400">Urgent</span>
                </label>
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <Pin className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Pin to top of bulletin</span>
              </label>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Notice Content & Details <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {description.length} chars
                </span>
              </div>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
                }}
                placeholder="Enter complete circular text, instructions, eligibility criteria, venue details, and contact points..."
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed ${
                  errors.description
                    ? 'border-rose-400 focus:border-rose-500'
                    : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                }`}
              />
              {errors.description && (
                <div className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.description}</span>
                </div>
              )}
            </div>

            {/* Optional Attachment */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Optional Attachment (PDF, Document, Image)
              </label>

              {attachment ? (
                <div className="flex items-center justify-between p-3 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30">
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-900 dark:text-white truncate">
                      {attachment.name}
                    </span>
                    <span className="text-[10px] text-slate-400">({attachment.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer transition-colors group">
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-blue-500 mb-1" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Click to select file or drag & drop
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    PDF, PNG, JPG, DOCX (Max 10 MB)
                  </span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  />
                </label>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Publishing Notice...</span>
                  </>
                ) : (
                  <span>{editingNotice ? 'Save Changes' : 'Publish Notice'}</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
