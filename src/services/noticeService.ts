import { Department, DepartmentInfo, Notice } from '../types/notice';

export const DEPARTMENTS_DATA: Record<Department, DepartmentInfo> = {
  All: {
    code: 'All',
    name: 'All Departments',
    iconName: 'LayoutGrid',
    badgeColor: 'blue',
    description: 'All institutional notifications across all branches',
  },
  CSE: {
    code: 'CSE',
    name: 'Computer Science & Engineering',
    iconName: 'Terminal',
    badgeColor: 'sky',
    description: 'Algorithms, Software Systems, Cloud, and Data Engineering',
  },
  AIML: {
    code: 'AIML',
    name: 'Artificial Intelligence & Machine Learning',
    iconName: 'Cpu',
    badgeColor: 'indigo',
    description: 'Deep Learning, Neural Networks, Robotics, and Computer Vision',
  },
  ECE: {
    code: 'ECE',
    name: 'Electronics & Communication',
    iconName: 'Radio',
    badgeColor: 'teal',
    description: 'VLSI, Embedded Systems, Signal Processing, and IoT',
  },
  EEE: {
    code: 'EEE',
    name: 'Electrical & Electronics Engineering',
    iconName: 'Zap',
    badgeColor: 'amber',
    description: 'Power Systems, Renewable Energy, and Electric Drives',
  },
  Mechanical: {
    code: 'Mechanical',
    name: 'Mechanical Engineering',
    iconName: 'Cog',
    badgeColor: 'orange',
    description: 'Thermodynamics, Robotics, CAD/CAM, and Manufacturing',
  },
  Civil: {
    code: 'Civil',
    name: 'Civil Engineering',
    iconName: 'Building2',
    badgeColor: 'emerald',
    description: 'Structural Analysis, Geotech, Surveying, and Urban Planning',
  },
  General: {
    code: 'General',
    name: 'General & Campus Affairs',
    iconName: 'GraduationCap',
    badgeColor: 'slate',
    description: 'Academic Calendar, Examinations, Hostel, and Administration',
  },
};

const STORAGE_KEY = 'college_notice_board_items_v2';
const BOOKMARKS_KEY = 'college_notice_board_bookmarks_v1';

// Initial realistic seed dataset
const SEED_NOTICES: Notice[] = [
  {
    id: 'notice-1',
    title: 'Autumn Semester 2026 End-Term Examination Schedule & Hall Ticket Release',
    description:
      'The Controller of Examinations hereby notifies all B.Tech and M.Tech students that the Autumn 2026 End-Term Theory and Practical Examinations will commence on November 24, 2026. Hall tickets will be accessible via the student ERP portal starting November 12, 2026. Any discrepancies in course registration codes or syllabus tracking must be brought to the Dean of Examinations before November 15. The detailed timetable branch-wise is attached below. Calculators are permitted only for specified analytical subjects.',
    department: 'General',
    publishedDate: '2026-11-05T09:30:00Z', // Today
    postedBy: 'Controller of Examinations',
    isPinned: true,
    priority: 'urgent',
    category: 'Examination',
    viewsCount: 684,
    attachment: {
      id: 'att-1',
      name: 'Autumn_2026_Exam_Timetable_Official.pdf',
      size: '2.4 MB',
      type: 'pdf',
      url: '#',
    },
  },
  {
    id: 'notice-2',
    title: 'Google & Microsoft Joint Campus Recruitment Drive 2026 - Registration Open',
    description:
      'The Training and Placement Cell is pleased to announce the Joint Campus Recruitment Drive for 2027 batch graduating students. Roles offered include Software Development Engineer (SDE-1), Cloud Systems Engineer, and AI Research Associate. Minimum CGPA criterion is 7.5 with zero active backlogs. Interested candidates must register using the T&P portal before November 10, 2026, 5:00 PM IST. Online coding assessments will take place on HackerRank on November 14, 2026.',
    department: 'CSE',
    publishedDate: '2026-11-04T14:15:00Z', // Yesterday
    postedBy: 'Prof. Arvind Sharma (Dean - Training & Placement)',
    isPinned: true,
    priority: 'important',
    category: 'Placement',
    viewsCount: 1420,
    attachment: {
      id: 'att-2',
      name: 'Google_Microsoft_Placement_Guidelines_2026.pdf',
      size: '1.8 MB',
      type: 'pdf',
      url: '#',
    },
  },
  {
    id: 'notice-3',
    title: 'National Conference on Foundation Models & Autonomous Agents (NCAI 2026)',
    description:
      'The Department of Artificial Intelligence & Machine Learning is hosting a 3-day National Conference from December 4-6, 2026. Keynote speakers include eminent AI scientists from IIT Madras and Google DeepMind. Undergraduate and postgraduate scholars are encouraged to submit draft research papers in IEEE format by November 18. Accepted papers will be indexed in IEEE Xplore. Registration is free for internal students.',
    department: 'AIML',
    publishedDate: '2026-11-04T10:00:00Z', // Yesterday
    postedBy: 'HOD - Artificial Intelligence & Data Science',
    isPinned: false,
    priority: 'important',
    category: 'Workshop',
    viewsCount: 512,
    attachment: {
      id: 'att-3',
      name: 'NCAI_2026_Call_for_Papers_Brochure.pdf',
      size: '3.1 MB',
      type: 'pdf',
      url: '#',
    },
  },
  {
    id: 'notice-4',
    title: 'Hands-on Workshop: VLSI Design and FPGA Implementation using Verilog',
    description:
      'The ECE Department in association with Cadence Systems will conduct an intensive two-day workshop on modern FPGA synthesis, timing closure, and RTL verification in the VLSI Research Center (Lab 304). Third and final-year students of ECE and EEE are eligible. Certificates of completion with IEEE student chapter badges will be awarded to all participants who submit the capstone counter design.',
    department: 'ECE',
    publishedDate: '2026-11-03T16:45:00Z', // 2 days ago
    postedBy: 'Dr. Priya Nambiar (VLSI Lab In-Charge)',
    isPinned: false,
    priority: 'normal',
    category: 'Workshop',
    viewsCount: 389,
    attachment: {
      id: 'att-4',
      name: 'VLSI_Workshop_Schedule_and_Prerequisites.pdf',
      size: '950 KB',
      type: 'pdf',
      url: '#',
    },
  },
  {
    id: 'notice-5',
    title: 'Renewable Microgrid Lab Safety Clearance and High-Voltage Equipment Protocol',
    description:
      'Effective immediately, all students conducting experimental measurements on the 440V Solar Microgrid Inverter setup in the Power Systems Lab must carry verified safety gloves and standard insulated footwear. No loose garments or jewelry are permitted. Students must sign the lab safety logbook before energizing circuit breakers. Review the updated safety manual attached.',
    department: 'EEE',
    publishedDate: '2026-11-02T11:20:00Z', // 3 days ago
    postedBy: 'Department Safety Committee - EEE',
    isPinned: false,
    priority: 'normal',
    category: 'Academic',
    viewsCount: 247,
    attachment: {
      id: 'att-5',
      name: 'EEE_Power_Systems_Safety_Manual_2026.pdf',
      size: '1.2 MB',
      type: 'pdf',
      url: '#',
    },
  },
  {
    id: 'notice-6',
    title: 'Annual SAE Baja Vehicle Prototype Fabrication & Aerodynamics Testing Call',
    description:
      'The Mechanical Engineering Department announces the recruitment test for the SAE Baja Racing Team 2026-27. We are looking for passionate engineers across Suspension, Powertrain, Chassis Fabrication, and Telemetry divisions. An introductory briefing session will be held this Friday in Seminar Hall 2 at 4:30 PM. All year-2 and year-3 students are invited.',
    department: 'Mechanical',
    publishedDate: '2026-11-01T08:00:00Z',
    postedBy: 'SAE Collegiate Club & Dept of Mechanical Engg',
    isPinned: false,
    priority: 'normal',
    category: 'Event',
    viewsCount: 420,
    attachment: {
      id: 'att-6',
      name: 'SAE_Baja_Recruitment_Problem_Statement.pdf',
      size: '1.6 MB',
      type: 'pdf',
      url: '#',
    },
  },
  {
    id: 'notice-7',
    title: 'Geotechnical Soil Testing Field Visit to Metro Line Elevated Corridor Site',
    description:
      'A mandatory field site visit has been arranged for 7th Semester Civil Engineering students to the Metro Line Viaduct and Foundation Pier construction site. Transportation buses will depart from the main academic gate at 8:30 AM on Saturday, November 8, 2026. Hard hats and reflective safety vests will be provided at the entrance. Submission of field observation reports will carry 10 internal marks.',
    department: 'Civil',
    publishedDate: '2026-10-31T15:00:00Z',
    postedBy: 'HOD - Department of Civil Engineering',
    isPinned: false,
    priority: 'normal',
    category: 'Academic',
    viewsCount: 310,
    attachment: {
      id: 'att-7',
      name: 'Civil_Field_Visit_Route_and_Instructions.pdf',
      size: '840 KB',
      type: 'pdf',
      url: '#',
    },
  },
  {
    id: 'notice-8',
    title: 'Odd Semester Tuition Fee Remittance Deadline & Online ERP Payment Gateway',
    description:
      'This is an official reminder from the Finance & Accounts Section regarding payment of balance tuition and laboratory fees for the current academic session. The final date without late penalty is November 15, 2026. Payments can be completed online via UPI, Net Banking, or Debit/Credit cards through the college ERP portal. Students seeking fee concession or installment arrangements must submit their Dean-approved applications prior to November 10.',
    department: 'General',
    publishedDate: '2026-10-30T10:30:00Z',
    postedBy: 'Chief Accounts Officer & Bursar',
    isPinned: false,
    priority: 'important',
    category: 'Administration',
    viewsCount: 890,
    attachment: {
      id: 'att-8',
      name: 'Fee_Remittance_Procedure_Notice_2026.pdf',
      size: '720 KB',
      type: 'pdf',
      url: '#',
    },
  },
];

export const noticeService = {
  // Load notices from LocalStorage or seed data
  getNotices(): Notice[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_NOTICES));
        return SEED_NOTICES;
      }
      const parsed: Notice[] = JSON.parse(stored);
      // Merge with bookmarks
      const bookmarks = noticeService.getBookmarks();
      return parsed.map((item) => ({
        ...item,
        bookmarked: bookmarks.includes(item.id),
      }));
    } catch {
      return SEED_NOTICES;
    }
  },

  // Save notices to LocalStorage
  saveNotices(notices: Notice[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
    } catch (e) {
      console.error('Failed to save notices to localStorage', e);
    }
  },

  // Add new notice
  addNotice(
    noticeData: Omit<Notice, 'id' | 'viewsCount' | 'bookmarked'>
  ): Notice {
    const existing = noticeService.getNotices();
    const newNotice: Notice = {
      ...noticeData,
      id: 'notice-' + Date.now(),
      viewsCount: 1,
      bookmarked: false,
    };
    const updated = [newNotice, ...existing];
    noticeService.saveNotices(updated);
    return newNotice;
  },

  // Update existing notice
  updateNotice(id: string, updates: Partial<Notice>): Notice | null {
    const existing = noticeService.getNotices();
    const index = existing.findIndex((n) => n.id === id);
    if (index === -1) return null;

    const updatedItem = { ...existing[index], ...updates };
    existing[index] = updatedItem;
    noticeService.saveNotices(existing);
    return updatedItem;
  },

  // Delete notice
  deleteNotice(id: string): boolean {
    const existing = noticeService.getNotices();
    const filtered = existing.filter((n) => n.id !== id);
    if (filtered.length !== existing.length) {
      noticeService.saveNotices(filtered);
      return true;
    }
    return false;
  },

  // Toggle Pin
  togglePin(id: string): Notice | null {
    const existing = noticeService.getNotices();
    const item = existing.find((n) => n.id === id);
    if (!item) return null;
    return noticeService.updateNotice(id, { isPinned: !item.isPinned });
  },

  // Increment views
  incrementViews(id: string): void {
    const existing = noticeService.getNotices();
    const item = existing.find((n) => n.id === id);
    if (item) {
      noticeService.updateNotice(id, { viewsCount: (item.viewsCount || 0) + 1 });
    }
  },

  // Bookmarks
  getBookmarks(): string[] {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  toggleBookmark(id: string): boolean {
    const bookmarks = noticeService.getBookmarks();
    const isBookmarked = bookmarks.includes(id);
    const updated = isBookmarked
      ? bookmarks.filter((bId) => bId !== id)
      : [...bookmarks, id];
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update bookmarks', e);
    }
    return !isBookmarked;
  },

  // Reset to default seed notices
  resetToDefault(): Notice[] {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_NOTICES));
      return SEED_NOTICES;
    } catch {
      return SEED_NOTICES;
    }
  },

  // Department counts
  getDepartmentCounts(notices: Notice[]): Record<Department, number> {
    const counts: Record<Department, number> = {
      All: notices.length,
      CSE: 0,
      AIML: 0,
      ECE: 0,
      EEE: 0,
      Mechanical: 0,
      Civil: 0,
      General: 0,
    };

    notices.forEach((n) => {
      if (counts[n.department] !== undefined) {
        counts[n.department]++;
      }
    });

    return counts;
  },

  // Relative Date Formatting
  formatRelativeDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      const now = new Date('2026-11-05T10:30:00Z'); // synchronized with current applet time
      const diffMs = now.getTime() - date.getTime();
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSecs < 60) return 'Just now';
      if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
      if (diffHours < 24 && diffDays === 0) {
        const timeStr = date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        return `Today at ${timeStr}`;
      }
      if (diffDays === 1) {
        const timeStr = date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        return `Yesterday at ${timeStr}`;
      }
      if (diffDays === 2) return '2 days ago';
      if (diffDays < 7) return `${diffDays} days ago`;

      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  },

  // Full readable date
  formatFullDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  },
};
