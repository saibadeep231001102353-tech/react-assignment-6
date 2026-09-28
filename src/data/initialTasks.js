/**
 * Initial Tasks Dataset & Constants
 * React Assignment 6: Task Manager with Routing
 * Author: Saibadeep Mullick (BCA 4th Year)
 */

export const TASK_CATEGORIES = ['Academic', 'Personal', 'Projects'];
export const TASK_PRIORITIES = ['High', 'Medium', 'Low'];
export const TASK_STATUSES = ['Raised', 'Pending', 'Closed'];

export const initialTasks = [
  {
    id: 'TSK-101',
    header: 'Complete BCA Cloud Computing & Distributed Systems Paper',
    description: 'Draft the theoretical framework, compare AWS Lambda vs Google Cloud Functions performance benchmarks, and finalize IEEE formatted citations.',
    priority: 'High',
    category: 'Academic',
    raisedDateTime: '2026-08-20 09:30 AM',
    dueDate: '28 Aug 2026',
    status: 'Pending',
    tags: ['Cloud', 'Research', 'BCA Sem 7']
  },
  {
    id: 'TSK-102',
    header: 'Prepare React Router & Dynamic Nested Routes Presentation',
    description: 'Assemble interactive slides showcasing useParams, ProtectedRoute authentication guards, and breadcrumb navigation architectures.',
    priority: 'High',
    category: 'Academic',
    raisedDateTime: '2026-08-22 11:15 AM',
    dueDate: '28 Aug 2026',
    status: 'Raised',
    tags: ['React', 'Routing', 'Seminar']
  },
  {
    id: 'TSK-103',
    header: 'Renew University Digital Library & IEEE Explore Access Pass',
    description: 'Submit institutional verification credentials to the computer department admin portal for semester-end research journal entitlements.',
    priority: 'Medium',
    category: 'Academic',
    raisedDateTime: '2026-08-23 02:45 PM',
    dueDate: '28 Aug 2026',
    status: 'Closed',
    tags: ['Library', 'Admin']
  },
  {
    id: 'TSK-104',
    header: 'Configure PostgreSQL Database Migration for Web App Project',
    description: 'Design relational schemas for users, tasks, and audit logs. Implement indexing on foreign keys and run Prisma ORM migrations.',
    priority: 'High',
    category: 'Projects',
    raisedDateTime: '2026-08-24 10:00 AM',
    dueDate: '28 Aug 2026',
    status: 'Pending',
    tags: ['Database', 'PostgreSQL', 'Backend']
  },
  {
    id: 'TSK-105',
    header: 'Schedule Bi-Annual Health Checkup & Optometry Consultation',
    description: 'Book weekend appointment at City Medical Centre for vision screening and screen-fatigue eye drop prescription.',
    priority: 'Low',
    category: 'Personal',
    raisedDateTime: '2026-08-24 04:20 PM',
    dueDate: '28 Aug 2026',
    status: 'Raised',
    tags: ['Health', 'Wellness']
  },
  {
    id: 'TSK-106',
    header: 'Audit & Backup Workspace Repositories to External SSD',
    description: 'Perform git bundle archives for all 6 practical assignment directories, verify checksums, and update offline developer storage.',
    priority: 'Medium',
    category: 'Personal',
    raisedDateTime: '2026-08-25 08:30 PM',
    dueDate: '28 Aug 2026',
    status: 'Closed',
    tags: ['Backup', 'Git', 'Storage']
  },
  {
    id: 'TSK-107',
    header: 'Review Advanced React Component Patterns & Profiling',
    description: 'Deep dive into React 19 compiler enhancements, memoization techniques, and performance auditing with Chrome DevTools.',
    priority: 'Medium',
    category: 'Academic',
    raisedDateTime: '2026-08-26 01:10 PM',
    dueDate: '28 Aug 2026',
    status: 'Pending',
    tags: ['React', 'Performance']
  },
  {
    id: 'TSK-108',
    header: 'Finalize Internship Application Portfolio & Cover Letters',
    description: 'Tailor resume for Software Development Engineering (Frontend) roles, update GitHub project links, and test live deployment URLs.',
    priority: 'High',
    category: 'Personal',
    raisedDateTime: '2026-08-26 06:00 PM',
    dueDate: '28 Aug 2026',
    status: 'Raised',
    tags: ['Career', 'Internship']
  }
];

/**
 * Format current date & time automatically (Requirement: "Raised Date and Time: Automatically picked")
 */
export function getAutoRaisedDateTime() {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return `${dateStr} ${timeStr}`;
}
