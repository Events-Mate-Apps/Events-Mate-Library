import { Wedding } from './wedding';

export interface Editor {
  id: string;
  email?: string;
  budgetPermission: Permission;
  checklistPermission: Permission;
  guestsPermission: Permission;
  timelinesPermission: Permission;
  vendorsPermission: Permission;
  wedding: Wedding;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
  status: EditorStatus;
}

export interface NewEditor {
  email: string;
  userId: string;
  weddingId: string;
  budgetPermission: Permission;
  checklistPermission: Permission;
  guestsPermission: Permission;
  timelinesPermission: Permission;
  vendorsPermission: Permission;
}

export enum EditorStatus {
  INVITED = 'INVITED',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export enum Permission {
  NONE = 'NONE',
  VIEW = 'VIEW',
  EDIT = 'EDIT',
}