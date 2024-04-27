
export enum ChecklistTaskAction {
    AddToBudget = 'add_to_budget',
    AddToTeam = 'add_to_team',
    Check = 'check',
    CreateBudget = 'create_budget',
    MusicSelection = 'music_selection',
    Search = 'search',
    SelectWeddingDate = 'select_wedding_date',
    SelectWeddingLocation = 'select_wedding_location',
    SelectWeddingMonth = 'select_wedding_month',
    SelectWeddingSeason = 'select_wedding_season',
    SetMaximumGuests = 'set_maximum_guests'
  }

export interface ChecklistItem {
    id: string;
    createdAt: string;
    updatedAt: string;
    finishAt: string;
    openedAt: string;
    name: string;
    action: ChecklistTaskAction; // use the ChecklistTaskAction enum type
    position: number;
    isPinned: boolean;
    isDone: boolean;
    description: string;
    notes: string | null;
    percentInPlanning: number;
    vendors: any[]; // replace 'any' with the appropriate type for vendors
    categoryId: string;
}

export interface ChecklistItemPut {
    isPinned?: boolean;
    isDone?: boolean;
    notes?: string | null;
}

export interface ChecklistCategory {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    budgetEstimate: number;
    category: string;
    isPinned: boolean;
    isDone: boolean;
    position: number;
    weddingId: string;
    description: string;
    tasks: ChecklistItem[];
    image: {
        id: string;
        alt: string | null;
        src: string;
        hash: string;
        checklistCategoryId: string;
    };
}
