export type CaseStatus = 'DRAFT' | 'OPEN' | 'PENDING_RESPONSE' | 'UNDER_REVIEW' | 'CLOSED';

export type NotificationType = 
  | 'CASE_CREATED'
  | 'CASE_UPDATED'
  | 'CASE_CLOSED'
  | 'EMPLOYEE_JOINED'
  | 'RESPONSE_SUBMITTED'
  | 'REMINDER'
  | 'STRIKE_RECORDED';

export interface DisciplinaryCase {
  id?: string;
  title: string;
  employeeName: string;
  category: string;
  description: string;
  status?: CaseStatus;
  incidentDate: string;
  attachments?: any |[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  caseId?: string;
  employeeId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalCases: number;
  openCases: number;
  closedCases: number;
  pendingActions: number;
}

export type FieldType = 'text' | 'number' | 'date' | 'select' | 'email' | 'phone';

export interface CustomField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joinDate: string;
  customFields: Record<string, string>;
}