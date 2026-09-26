export interface DocumentDate {
  id: string;
  title: string;
  date: string;
  desc: string;
  urgent: boolean;
  done: boolean;
}

export interface ChecklistItem {
  id: string;
  name: string;
  req: boolean;
  checked: boolean;
  note: string;
}

export interface ActionStep {
  num: string;
  title: string;
  desc: string;
  prio: 'Critical' | 'High' | 'Medium';
}

export interface DifficultTerm {
  id: string;
  original: string;
  meaning: string;
  why: string;
}

export interface MissingInfoItem {
  id: string;
  title: string;
  desc: string;
  fix: string;
}

export interface DocumentSummary {
  lead: string;
  bullets: string[];
}

export interface DocumentData {
  id: string;
  title: string;
  category: 'government' | 'contract' | 'insurance' | 'university';
  badge: string;
  filename: string;
  confidence: string;
  authority: string;
  office: string;
  refNo: string;
  subject: string;
  paragraphs: string[];
  rawText?: string;
  summary: DocumentSummary;
  dates: DocumentDate[];
  checklist: ChecklistItem[];
  actions: ActionStep[];
  terms: DifficultTerm[];
  missing: MissingInfoItem[];
  pages?: number;
  dateAnalyzed?: string;
}

export interface DashboardDocItem {
  id: string;
  name: string;
  cat: 'government' | 'contract' | 'insurance' | 'university';
  catName: string;
  deadline: string;
  actions: string;
  conf: string;
  status: string;
  pages: number;
  dateAnalyzed: string;
}

export interface UserProfile {
  uid?: string;
  name: string;
  email: string;
  plan: string;
  initials: string;
  persona?: string;
  photoURL?: string;
  isDemo?: boolean;
  createdAt?: string;
  updatedAt?: string;
  documentsCount?: number;
  deadlinesCount?: number;
  storageUsed?: string;
  emailVerified?: boolean;
  providerId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  citation?: string;
}

export type InsightTab = 'summary' | 'dates' | 'checklist' | 'actions' | 'terms' | 'missing';
export type DashboardTab = 'overview' | 'documents' | 'analysis' | 'deadlines' | 'action-items' | 'assistant' | 'saved' | 'settings' | 'profile';
export type AppViewMode = 'landing' | 'app';
