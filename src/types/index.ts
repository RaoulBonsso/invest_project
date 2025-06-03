export type UserRole = 'entrepreneur' | 'investor' | 'developer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  creatorId: string;
  creatorName: string;
  status: 'active' | 'pending' | 'expired';
  createdAt: string;
  updatedAt: string;
  investment?: number;
  investors?: number;
  developersCount?: number;
}

export interface Transaction {
  id: string;
  projectId: string;
  projectTitle: string;
  amount: number;
  type: 'investment' | 'sale' | 'development';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  from: string;
  to: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
  link?: string;
}