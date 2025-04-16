export type Title =
  | 'PROJECT_MANAGER'
  | 'SITE_MANAGER'
  | 'ARCHITECT'
  | 'CIVIL_ENGINEER'
  | 'ELECTRICAL_ENGINEER'
  | 'MECHANICAL_ENGINEER'
  | 'SAFETY_OFFICER'
  | 'QUANTITY_SURVEYOR'
  | 'CONTRACTOR'
  | 'SUBCONTRACTOR'
  | 'CLIENT_REPRESENTATIVE'
  | 'SUPPLIER'
  | 'TECHNICIAN'
  | 'LABORER'
  | 'OTHER';

export type AttendanceType =
  | 'IN_PERSON'
  | 'REMOTE'
  | 'HYBRID';

export type AttendanceStatus =
  | 'REGISTERED'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'ATTENDED'
  | 'NO_SHOW';

export interface Attendee {
  id?: number;
  name?: string;
  title?: Title;
  email?: string;
  attendanceType?: AttendanceType;
  attendanceStatus?: AttendanceStatus;
  safetyBriefingCompleted?: boolean;
  meetingId?: number; // Optional reference to meeting, just ID here for simplicity
}
