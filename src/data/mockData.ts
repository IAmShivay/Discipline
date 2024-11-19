import { v4 as uuidv4 } from 'uuid';
import type { Notification } from '../types';

export const mockNotifications: Notification[] = [
  {
    id: uuidv4(),
    type: 'CASE_CREATED',
    title: 'New Disciplinary Case Created',
    message: 'A new case "Attendance Policy Violation" has been created for John Smith.',
    caseId: '1',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: uuidv4(),
    type: 'EMPLOYEE_JOINED',
    title: 'New Employee Joined',
    message: 'Sarah Johnson has joined the organization as Senior Developer.',
    employeeId: '2',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: uuidv4(),
    type: 'RESPONSE_SUBMITTED',
    title: 'Response Submitted',
    message: 'John Smith has submitted a response to the case "Attendance Policy Violation".',
    caseId: '1',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
  },
  {
    id: uuidv4(),
    type: 'CASE_UPDATED',
    title: 'Case Status Updated',
    message: 'The status of case "Code of Conduct Breach" has been updated to "Under Review".',
    caseId: '2',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: uuidv4(),
    type: 'REMINDER',
    title: 'Response Required',
    message: 'Reminder: Your response is required for the case "Performance Issue".',
    caseId: '3',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: uuidv4(),
    type: 'CASE_CLOSED',
    title: 'Case Closed',
    message: 'The case "Policy Violation" has been closed.',
    caseId: '4',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  },
  {
    id: uuidv4(),
    type: 'STRIKE_RECORDED',
    title: 'Strike Recorded',
    message: 'A strike has been recorded for Emma Davis due to invalid response.',
    employeeId: '3',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
  },
];