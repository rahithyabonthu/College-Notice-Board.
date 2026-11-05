import React from 'react';
import {
  LayoutGrid,
  Terminal,
  Cpu,
  Radio,
  Zap,
  Cog,
  Building2,
  GraduationCap,
  RotateCcw,
} from 'lucide-react';
import { Department } from '../types/notice';
import { DEPARTMENTS_DATA } from '../services/noticeService';

interface DepartmentFilterBarProps {
  selectedDepartment: Department;
  onSelectDepartment: (dept: Department) => void;
  departmentCounts: Record<Department, number>;
}

export const DepartmentFilterBar: React.FC<DepartmentFilterBarProps> = ({
  selectedDepartment,
  onSelectDepartment,
  departmentCounts,
}) => {
  const departments: Department[] = [
    'All',
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
      case 'All':
        return <LayoutGrid className="w-3.5 h-3.5" />;
      case 'CSE':
        return <Terminal className="w-3.5 h-3.5" />;
      case 'AIML':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'ECE':
        return <Radio className="w-3.5 h-3.5" />;
      case 'EEE':
        return <Zap className="w-3.5 h-3.5" />;
      case 'Mechanical':
        return <Cog className="w-3.5 h-3.5" />;
      case 'Civil':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'General':
        return <GraduationCap className="w-3.5 h-3.5" />;
      default:
        return <LayoutGrid className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Filter by Department
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {selectedDepartment === 'All'
              ? 'Showing all academic divisions'
              : DEPARTMENTS_DATA[selectedDepartment].name}
          </span>
        </div>

        {selectedDepartment !== 'All' && (
          <button
            onClick={() => onSelectDepartment('All')}
            className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filter</span>
          </button>
        )}
      </div>

      {/* Horizontal scrolling chips on small screens, wrap on large */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none sm:flex-wrap">
        {departments.map((dept) => {
          const isSelected = selectedDepartment === dept;
          const count = departmentCounts[dept] || 0;
          const meta = DEPARTMENTS_DATA[dept];

          return (
            <button
              key={dept}
              onClick={() => onSelectDepartment(dept)}
              title={meta.name}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-slate-500 dark:text-slate-400'}>
                {getIcon(dept)}
              </span>
              <span className="whitespace-nowrap">{dept === 'All' ? 'All Departments' : dept}</span>
              <span
                className={`font-mono tabular-nums text-[11px] px-1.5 py-0.2 rounded-md ${
                  isSelected
                    ? 'bg-blue-700/80 text-white'
                    : 'bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
