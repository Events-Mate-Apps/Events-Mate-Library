import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { Budget } from './budget';
import { ChecklistCategory } from './checklist';
import { Guest } from './guest';
import { Timeline } from './timeline';
import { SmallVendor, Vendor } from './vendor';
import { Editor } from "./editor";

export interface BuffetOption {
  id: string,
  name: string,
  allergens: string[],
  position: number
}

export interface Course {
  name: string;
  type: string,
  allergens: string[]
  ingredients: string[]
  buffetOptions: BuffetOption[]
  servingMethod: string,
  description: string,
  menuId: string,
  id: string,
  createdAt: string,
  updatedAt: string,
  position: number,
  [key: string]: any;
}

export interface Menu {
  name: string;
  description?: string;
  weddingId: string;
  courses: Course[],
  id: string,
  createdAt: string,
  updatedAt: string,
  position: number
};

export type Wedding = {
  createdAt: string;
  updatedAt: string;
  guests: Guest[];
  id: string;
  location?: Location;
  name: string;
  user: {
    id: string;
  };
  weddingDate: string;
  weddingVendors: SmallVendor[];
  checklist?: ChecklistCategory[]
  sharedWith: Editor[];
  shortlistedVendors: Vendor[];
  budget?: Budget;
  timelines: Timeline[];
  pin: string;
  description: string;
  menus: Menu[],
};

export type Location = {
  type: string;
  coordinates: [number, number];
};

export type Refetch<TPageData> = (
  options?: RefetchOptions 
) => Promise<QueryObserverResult<TPageData, unknown>>;