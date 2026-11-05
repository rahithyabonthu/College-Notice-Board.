import React from 'react';
import {
  Terminal,
  Cpu,
  Radio,
  Zap,
  Cog,
  Building2,
  GraduationCap,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { Department, Notice } from '../types/notice';
import { DEPARTMENTS_DATA } from '../services/noticeService';

interface DepartmentsExplorerProps {
  notices: Notice[];
  onSelectDepartment: (dept: Department) => void;
  departmentCounts: Record<Department, number>;
}

export const DepartmentsExplorer: React.FC<DepartmentsExplorerProps> = ({
  notices,
  onSelectDepartment,
  departmentCounts,
}) => {
  const departmentsList: Department[] = [
    'CSE',
    'AIML',
    'ECE',
    'EEE',
    'Mechanical',
    'Civil',
    'General',
  ];

  const getIcon = (dept: Department) => {
    switch (dept) {
      case 'CSE':
        return <Terminal className="w-5 h-5" />;
      case 'AIML':
        return <Cpu className="w-5 h-5" />;
      case 'ECE':
        return <Radio className="w-5 h-5" />;
      case 'EEE':
        return <Zap className="w-5 h-5" />;
      case 'Mechanical':
        return <Cog className="w-5 h-5" />;
      case 'Civil':
        return <Building2 className="w-5 h-5" />;
      case 'General':
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Academic Departments Directory
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Browse departmental bulletins, specialized academic circulars, laboratory guidelines, and faculty announcements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departmentsList.map((dept) => {
          const info = DEPARTMENTS_DATA[dept];
          const count = departmentCounts[dept] || 0;
          const deptNotices = notices.filter((n) => n.department === dept);
          const latestNotice = deptNotices[0];

          return (
            <div
              key={dept}
              onClick={() => onSelectDepartment(dept)}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(dept)}
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                    {count} {count === 1 ? 'Notice' : 'Notices'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {dept} — {info.name}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {info.description}
                </p>

                {latestNotice && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Latest Circular
                    </span>
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-1 mt-0.5">
                      {latestNotice.title}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>View Department Notices</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
