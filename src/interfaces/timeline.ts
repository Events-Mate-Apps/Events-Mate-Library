export interface TimelineEvent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    hexColor: string;
    note: string;
    title: string;
    startAt: Date;
    endAt: Date;
    timelineId: string;
}

export interface Timeline {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    date: Date;
    weddingId: string;
    events: TimelineEvent[];
}

export interface TimelinePost {
    title: string;
    date: Date;
    weddingId: string;
    events: TimelineEvent[];
}

export interface TimelinePut {
    title?: string;
    date?: Date;
}

export interface TimelineEventPost {
    hexColor: string;
    note: string;
    title: string;
    startAt: Date;
    endAt: Date;
    timelineId: string;
}

export interface TimelineEventPut {
    hexColor?: string;
    note?: string;
    title?: string;
    startAt?: Date;
    endAt?: Date;
}