export type Department =
  | 'All'
  | 'CSE'
  | 'AIML'
  | 'ECE'
  | 'EEE'
  | 'Mechanical'
  | 'Civil'
  | 'General';

export type NoticePriority = 'normal' | 'important' | 'urgent';

export type NoticeCategory =
  | 'Academic'
  | 'Examination'
  | 'Placement'
  | 'Workshop'
  | 'Sports'
  | 'Event'
  | 'Administration';

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'doc' | 'link';
  url: string;
  dataUrl?: string; // For uploaded files
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  department: Department;
  publishedDate: string; // ISO 8601 string
  postedBy: string;
  isPinned: boolean;
  priority: NoticePriority;
  category: NoticeCategory;
  attachment?: Attachment;
  viewsCount: number;
  bookmarked?: boolean;
}

export interface DepartmentInfo {
  code: Department;
  name: string;
  iconName: string;
  badgeColor: string;
  description: string;
}

export type UserRole = 'student' | 'admin';

export interface AdminUser {
  name: string;
  designation: string;
  department: Department;
  email: string;
  role: 'admin';
}
