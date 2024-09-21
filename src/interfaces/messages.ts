import { UserData } from './user';
import { Vendor } from './vendor'

export interface Conversation {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  vendorId: string;
  weddingId: string;
}

export interface Message {
  id: string;
  createdAt: string;
  updatedAt: string;
  readAt: string | null;
  content: string;
  senderId: string;
  conversationId: string;
  attachments: any[]; 
}

export interface MyConversation {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  vendorId: string;
  weddingId: string;
  messages: Message[]; 
  user: UserData;
  vendor: Vendor;
}

