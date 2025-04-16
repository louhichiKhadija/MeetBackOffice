export interface Address {
    street: string;
    city: string;
    country: string;
    postalCode?: string;
  }
  
  export type Frequency =
    | 'ONE_TIME'
    | 'WEEKLY'
    | 'BIWEEKLY'
    | 'MONTHLY'
    | 'QUARTERLY'
    | 'ANNUAL'
    | 'AD_HOC';
  
  export type MeetingType =
    | 'REVIEW'
    | 'PROGRESS_UPDATE'
    | 'DEMO'
    | 'SAFETY'
    | 'PLANNING'
    | 'COORDINATION'
    | 'CLIENT'
    | 'EMERGENCY'
    | 'TRAINING';
  
  export interface Meeting {
    id?: number;
    title: string;
    date: string; // ISO string format e.g. "2025-04-15T10:00:00"
    duration?: number;
    location?: string;
    address?: Address;
    frequency?: Frequency;
    type?: MeetingType;
    description?: string;
  }