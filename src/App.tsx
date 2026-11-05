import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  FileText,
  Search,
  Plus,
  RefreshCw,
  Bookmark,
  CheckCircle,
  Shield,
  Layers,
  Sparkles,
  Inbox,
  ArrowUp,
} from 'lucide-react';
import {
  Notice,
  Department,
  UserRole,
} from './types/notice';
import { noticeService } from './services/noticeService';
import { Header } from './components/Header';
import { WelcomeBanner } from './components/WelcomeBanner';
import { DepartmentFilterBar } from './components/DepartmentFilterBar';
import { SearchBarAndSort, SortOption } from './components/SearchBarAndSort';
import { NoticeCard } from './components/NoticeCard';
import { NoticeDetailsModal } from './components/NoticeDetailsModal';
import { PostNoticeModal } from './components/PostNoticeModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog';
import { FirebaseModal } from './components/FirebaseModal';
import { DepartmentsExplorer } from './components/DepartmentsExplorer';
import { Toast } from './components/Toast';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('college_notice_board_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('college_notice_board_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('college_notice_board_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Role state (default to Student, with easy Admin toggle)
  const [role, setRole] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('college_notice_board_role') as UserRole) || 'student';
    }
    return 'student';
  });

  const handleSelectRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('college_notice_board_role', newRole);
  };

  // Main Notices State
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [showOnlyPinned, setShowOnlyPinned] = useState(false);
  const [showOnlyAttachments, setShowOnlyAttachments] = useState(false);
  const [currentTab, setCurrentTab] = useState<'all' | 'departments' | 'bookmarks' | 'firebase'>('all');

  // Modals & Dialogs
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<Notice | null>(null);

  // Toast feedback & Refresh status
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const noticesSectionRef = useRef<HTMLDivElement>(null);

  // Load notices initially
  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = () => {
    const data = noticeService.getNotices();
    setNotices(data);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      loadNotices();
      setIsRefreshing(false);
      setToastMessage('Notice board updated with latest announcements');
    }, 400);
  };

  // Add Notice
  const handleSaveNotice = (noticeData: Omit<Notice, 'id' | 'viewsCount' | 'bookmarked'>) => {
    const created = noticeService.addNotice(noticeData);
    setNotices((prev) => [created, ...prev]);
    setToastMessage(`Published: "${created.title.slice(0, 35)}..."`);
  };

  // Update Notice
  const handleUpdateNotice = (id: string, updates: Partial<Notice>) => {
    const updated = noticeService.updateNotice(id, updates);
    if (updated) {
      setNotices((prev) => prev.map((n) => (n.id === id ? updated : n)));
      if (selectedNotice?.id === id) {
        setSelectedNotice(updated);
      }
      setToastMessage('Notice updated successfully');
    }
  };

  // Delete Notice
  const handleConfirmDelete = (id: string) => {
    const success = noticeService.deleteNotice(id);
    if (success) {
      setNotices((prev) => prev.filter((n) => n.id !== id));
      if (selectedNotice?.id === id) {
        setSelectedNotice(null);
      }
      setToastMessage('Notice removed from bulletin');
    }
  };

  // Toggle Pin
  const handleTogglePin = (id: string) => {
    const updated = noticeService.togglePin(id);
    if (updated) {
      setNotices((prev) => prev.map((n) => (n.id === id ? updated : n)));
      if (selectedNotice?.id === id) {
        setSelectedNotice(updated);
      }
      setToastMessage(updated.isPinned ? 'Notice pinned to top' : 'Notice unpinned');
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id: string) => {
    const isNowBookmarked = noticeService.toggleBookmark(id);
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, bookmarked: isNowBookmarked } : n))
    );
    if (selectedNotice?.id === id) {
      setSelectedNotice((prev) => (prev ? { ...prev, bookmarked: isNowBookmarked } : null));
    }
    setToastMessage(
      isNowBookmarked ? 'Notice saved to Bookmarks' : 'Removed from Bookmarks'
    );
  };

  // Reset to default seed notices
  const handleResetDefaults = () => {
    const defaults = noticeService.resetToDefault();
    setNotices(defaults);
    setSelectedDepartment('All');
    setSearchQuery('');
    setToastMessage('Notice board reset to sample college records');
  };

  // Details opener with view count increment
  const handleOpenDetails = (notice: Notice) => {
    noticeService.incrementViews(notice.id);
    setSelectedNotice(notice);
  };

  // Scroll to notices section
  const scrollToNotices = () => {
    noticesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Department counts breakdown
  const departmentCounts = useMemo(() => {
    return noticeService.getDepartmentCounts(notices);
  }, [notices]);

  // Bookmarks count
  const bookmarkCount = useMemo(() => {
    return notices.filter((n) => n.bookmarked).length;
  }, [notices]);

  // Filtered & Sorted Notices
  const filteredNotices = useMemo(() => {
    let result = [...notices];

    // Tab filtering
    if (currentTab === 'bookmarks') {
      result = result.filter((n) => n.bookmarked);
    }

    // Department filtering
    if (selectedDepartment !== 'All') {
      result = result.filter((n) => n.department === selectedDepartment);
    }

    // Search query filtering (searches title and description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.postedBy.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      );
    }

    // Pinned only filter
    if (showOnlyPinned) {
      result = result.filter((n) => n.isPinned);
    }

    // Attachment only filter
    if (showOnlyAttachments) {
      result = result.filter((n) => !!n.attachment);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'latest') {
        // Pinned notices first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [
    notices,
    currentTab,
    selectedDepartment,
    searchQuery,
    showOnlyPinned,
    showOnlyAttachments,
    sortBy,
  ]);

  const pinnedCount = useMemo(() => {
    return notices.filter((n) => n.isPinned).length;
  }, [notices]);

  return (
    <div className="min-h-screen bg-slate-100/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col justify-between">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'firebase') {
            setIsFirebaseModalOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        role={role}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenPublishModal={() => {
          setEditingNotice(null);
          setIsPublishModalOpen(true);
        }}
        bookmarkCount={bookmarkCount}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {/* Welcome Dashboard Banner */}
        {currentTab === 'all' && (
          <WelcomeBanner
            totalNotices={notices.length}
            pinnedCount={pinnedCount}
            role={role}
            onOpenPublishModal={() => {
              setEditingNotice(null);
              setIsPublishModalOpen(true);
            }}
            onScrollToNotices={scrollToNotices}
          />
        )}

        {/* View Routing */}
        {currentTab === 'departments' ? (
          <DepartmentsExplorer
            notices={notices}
            onSelectDepartment={(dept) => {
              setSelectedDepartment(dept);
              setCurrentTab('all');
              scrollToNotices();
            }}
            departmentCounts={departmentCounts}
          />
        ) : (
          <div ref={noticesSectionRef}>
            {/* Header for Bookmarks view */}
            {currentTab === 'bookmarks' && (
              <div className="mb-6 flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Saved Notices ({filteredNotices.length})
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentTab('all')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View All Notices
                </button>
              </div>
            )}

            {/* Department Filter Bar */}
            <DepartmentFilterBar
              selectedDepartment={selectedDepartment}
              onSelectDepartment={(dept) => setSelectedDepartment(dept)}
              departmentCounts={departmentCounts}
            />

            {/* Search, Sort and Filters Toolbar */}
            <SearchBarAndSort
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showOnlyPinned={showOnlyPinned}
              onTogglePinnedOnly={() => setShowOnlyPinned((prev) => !prev)}
              showOnlyAttachments={showOnlyAttachments}
              onToggleAttachmentsOnly={() => setShowOnlyAttachments((prev) => !prev)}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
              totalFilteredCount={filteredNotices.length}
              totalNoticesCount={notices.length}
            />

            {/* Notice Cards Grid */}
            {filteredNotices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredNotices.map((notice) => (
                  <NoticeCard
                    key={notice.id}
                    notice={notice}
                    role={role}
                    onOpenDetails={handleOpenDetails}
                    onEditNotice={(n) => {
                      setEditingNotice(n);
                      setIsPublishModalOpen(true);
                    }}
                    onRequestDelete={(n) => setNoticeToDelete(n)}
                    onTogglePin={handleTogglePin}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            ) : (
              /* Clear Empty State */
              <div className="py-16 px-6 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Inbox className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  No Notices Found
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
                  {searchQuery || selectedDepartment !== 'All' || showOnlyPinned || showOnlyAttachments
                    ? 'No notices match your current filters. Try resetting the search terms or selecting All Departments.'
                    : 'There are currently no active circulars published on the notice board.'}
                </p>

                <div className="mt-5 flex items-center gap-3">
                  {(searchQuery || selectedDepartment !== 'All' || showOnlyPinned || showOnlyAttachments) && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedDepartment('All');
                        setShowOnlyPinned(false);
                        setShowOnlyAttachments(false);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl border border-blue-200 dark:border-blue-800 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}

                  {role === 'admin' && (
                    <button
                      onClick={() => {
                        setEditingNotice(null);
                        setIsPublishModalOpen(true);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publish First Notice</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Action Button (FAB) for Admin */}
      {role === 'admin' && (
        <button
          onClick={() => {
            setEditingNotice(null);
            setIsPublishModalOpen(true);
          }}
          title="Publish New Notice"
          className="fixed bottom-6 right-6 z-30 sm:hidden w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              College Notice Board
            </span>
            <span aria-hidden="true">·</span>
            <span>Digital Campus Communication System</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsFirebaseModalOpen(true)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Cloud & Storage Status
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {role === 'admin' ? 'Admin Access Active' : 'Administrator Login'}
            </button>
            <span aria-hidden="true">·</span>
            <span>Autumn Term 2026</span>
          </div>
        </div>
      </footer>

      {/* Notice Details Modal / Screen */}
      <NoticeDetailsModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
        role={role}
        onEditNotice={(n) => {
          setEditingNotice(n);
          setIsPublishModalOpen(true);
        }}
        onRequestDelete={(n) => setNoticeToDelete(n)}
        onTogglePin={handleTogglePin}
        onToggleBookmark={handleToggleBookmark}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      {/* Publish / Edit Notice Form Modal */}
      <PostNoticeModal
        isOpen={isPublishModalOpen}
        onClose={() => {
          setIsPublishModalOpen(false);
          setEditingNotice(null);
        }}
        onSave={handleSaveNotice}
        onUpdate={handleUpdateNotice}
        editingNotice={editingNotice}
      />

      {/* Admin Login & Role Switcher Modal */}
      <AdminLoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentRole={role}
        onSelectRole={handleSelectRole}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        notice={noticeToDelete}
        isOpen={!!noticeToDelete}
        onClose={() => setNoticeToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Firebase Cloud Sync & Setup Modal */}
      <FirebaseModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
        onResetData={handleResetDefaults}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
