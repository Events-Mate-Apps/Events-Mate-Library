export interface LocalizedContent {
  cz: string;
  en: string;
  fr: string;
}
  
export interface ColorScheme {
  primary: string;
  secondary: string;
}
  
export interface Event {
  id?: number;
  eventType: number;
  descriptionShort: LocalizedContent;
  description: LocalizedContent;
  dressCodeDesc: LocalizedContent;
  guestsInfoLocEntityId: LocalizedContent;
  colorScheme: ColorScheme;
  preferredLanguage: string;
  datetimeFrom: string;
  datetimeTo: string;
  justDate: boolean;
  pinInfo: string;
}
  
export interface EventResponse {
  id: string;
  event: Event;
}
  
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
  
export interface CreateEventRequest extends Event {}
  
export interface GetEventResponse extends ApiResponse<Event> {}
  
export interface GetEventsResponse extends ApiResponse<Event[]> {}
  