import useTranslation from 'next-translate/useTranslation';

export interface Guest {
  id: string;
  weddingId: string;
  createdAt: string;
  updatedAt: string;
  email?: string | null;
  notes?: string | null;
  messageFromGuest?: string | null;
  firstName: string;
  lastName: string;
  phone?: string | null;
  postalAddress?: string | null;
  address?: {
    name?: string;
    locality?: string;
    postalCode?: string;
    thoroughfare?: string;
    administrativeArea?: string;
  };
  allergens: string[];
  diets: string[];
  age: GuestAge;
  status: GuestStatus;
  needHotel: boolean;
  plusOneOptions: number;
}

export enum GuestStatus {
  noResponse = 0,
  attending = 1,
  notAttending = 2,
  maybe = 3,
}

export enum GuestAge {
  adult = 0,
  child = 1,
  infant = 2,
}

export const useStatusTitle = (status: GuestStatus) => {
  const { t } = useTranslation('guests');
  switch (status) {
    case GuestStatus.noResponse:
      return t('guestStatus.noResponse');
    case GuestStatus.attending:
      return t('guestStatus.confirmed');
    case GuestStatus.notAttending:
      return t('guestStatus.declined');
    case GuestStatus.maybe:
      return t('guestStatus.maybe');
    default:
      return t('guestStatus.noResponse');
  }
};

export const useAgeTitle = (age: GuestAge) => {
  const { t } = useTranslation('guests');
  switch (age) {
    case GuestAge.adult:
      return t('guestAge.adult');
    case GuestAge.child:
      return t('guestAge.child');
    case GuestAge.infant:
      return t('guestAge.infant');
    default:
      return t('guestAge.adult');
  }
};

export interface GuestPost {
  firstName: string;
  lastName: string;
  allergens: string[];
  diets: string[];
  messageFromGuest: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  status: number;
  seat?: string | undefined;
  notes: string | undefined;
  needHotel?: boolean | undefined;
  plusOneOptions?: number | undefined;
  postalAddress?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
  age: number;
  weddingId: string;
}

export interface GuestPut {
  firstName?: string;
  lastName?: string;
  allergens?: string[];
  diets?: string[];
  messageFromGuest?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: number | null;
  age?: number | null;
  notes?: string | null;
  needHotel?: boolean | null;
  postalAddress?: string | null;
  plusOneOptions: number | null;
  weddingId: string;
}

export interface Allergy {
  code: string;
  createdAt: string;
  id: string;
  info: string;
  name: string;
  updatedAt: string;
}

export interface Diet {
  code: string;
  createdAt: string;
  id: string;
  info: string;
  name: string;
  updatedAt: string;
  wikiUrl: null | string;
}

export const convertGuestToGuestPost = (guest: Guest) => ({
  firstName: guest.firstName,
  lastName: guest.lastName,
  allergens: guest.allergens,
  diets: guest.diets,
  messageFromGuest: guest.messageFromGuest,
  email: guest.email,
  phone: guest.phone,
  status: guest.status,
  notes: guest.notes || '',
  needHotel: guest.needHotel,
  plusOneOptions: guest.plusOneOptions,
  age: guest.age,
  weddingId: guest.weddingId,
});

export const convertGuestToGuestPut = (guest: Guest) => ({
  firstName: guest.firstName,
  lastName: guest.lastName,
  allergens: guest.allergens,
  diets: guest.diets,
  messageFromGuest: guest.messageFromGuest,
  email: guest.email,
  phone: guest.phone,
  status: guest.status,
  notes: guest.notes || '',
  needHotel: guest.needHotel,
  plusOneOptions: guest.plusOneOptions,
  age: guest.age,
  weddingId: guest.weddingId,
});
