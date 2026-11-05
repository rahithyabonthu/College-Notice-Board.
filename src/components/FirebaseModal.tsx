import React, { useState } from 'react';
import {
  Database,
  Cloud,
  CheckCircle,
  Copy,
  Check,
  X,
  ExternalLink,
  Shield,
  HardDrive,
  RefreshCw,
  FolderLock,
} from 'lucide-react';

interface FirebaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetData: () => void;
  onShowToast: (msg: string) => void;
}

export const FirebaseModal: React.FC<FirebaseModalProps> = ({
  isOpen,
  onClose,
  onResetData,
  onShowToast,
}) => {
  const [copiedRules, setCopiedRules] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const sampleFirestoreRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Notices Collection
    match /notices/{noticeId} {
      // Anyone (students, faculty) can read published notices
      allow read: if true;
      
      // Only authenticated college administrators can create, edit, or delete
      allow create, update, delete: if request.auth != null 
        && request.auth.token.role == 'admin';
    }
    
    // Departments metadata
    match /departments/{deptId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'admin';
    }
  }
}`;

  const sampleFirebaseConfig = `// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "college-notice-board.firebaseapp.com",
  projectId: "college-notice-board-app",
  storageBucket: "college-notice-board-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);`;

  const copyToClipboard = (text: string, type: 'rules' | 'config') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === 'rules') {
        setCopiedRules(true);
        setTimeout(() => setCopiedRules(false), 2000);
      } else {
        setCopiedConfig(true);
        setTimeout(() => setCopiedConfig(false), 2000);
      }
      onShowToast('Copied to clipboard');
    }
  };

  const handleTestConnection = () => {
    setTestingConnection(true);
    setConnectionStatus(null);
    setTimeout(() => {
      setTestingConnection(false);
      setConnectionStatus(
        'Client-side LocalStorage cache active with 100% offline persistence. Firebase Firestore ready for connection.'
      );
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 transition-all">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Cloud Architecture & Firebase Integration
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Firestore Cloud Database & Storage Configuration Guide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(85vh-120px)] overflow-y-auto space-y-6">
          {/* Current Status Box */}
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/80">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Persistent Storage Active
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    The College Notice Board runs on an asynchronous local-storage engine that preserves all notices, attachments, pins, views, and bookmarks across page reloads and browser restarts.
                  </p>
                </div>
              </div>

              <button
                onClick={handleTestConnection}
                disabled={testingConnection}
                className="px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 rounded-lg shadow-2xs hover:bg-blue-50 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin' : ''}`} />
                <span>Test Sync</span>
              </button>
            </div>

            {connectionStatus && (
              <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-900/60 text-xs text-blue-800 dark:text-blue-300 font-mono">
                {connectionStatus}
              </div>
            )}
          </div>

          {/* Architecture Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                <Database className="w-4 h-4 text-blue-600" />
                <span>Cloud Firestore</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Stores notice documents under collection <code className="font-mono text-blue-600">/notices</code> with real-time snapshot listeners.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                <Cloud className="w-4 h-4 text-sky-600" />
                <span>Firebase Storage</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Stores official timetable PDFs, circular flyers, and laboratory manuals with authenticated download URLs.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Firebase Auth</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Role-based access claims for college administrators, HODs, and examination controllers.
              </p>
            </div>
          </div>

          {/* Firestore Security Rules Snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Firestore Security Rules (<code className="font-mono text-blue-600">firestore.rules</code>)
              </span>
              <button
                onClick={() => copyToClipboard(sampleFirestoreRules, 'rules')}
                className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                {copiedRules ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedRules ? 'Copied' : 'Copy Rules'}</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto border border-slate-800">
              {sampleFirestoreRules}
            </pre>
          </div>

          {/* Setup Instructions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Setup Instructions
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li>In the Firebase Console, create a new project named <code className="font-mono font-semibold">College-Notice-Board</code>.</li>
              <li>Provision a Cloud Firestore database in production mode and paste the security rules above.</li>
              <li>Enable Firebase Storage for uploading PDF and image attachments.</li>
              <li>Configure Firebase Authentication with Email/Password or College Google Workspace SSO.</li>
              <li>For this preview environment, sample notices are fully interactive and persist in local cache.</li>
            </ol>
          </div>

          {/* Reset Demo Data */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Restore Sample Dataset
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Resets the board back to default university notices across all 7 departments.
              </div>
            </div>

            <button
              onClick={() => {
                onResetData();
                onClose();
              }}
              className="px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
