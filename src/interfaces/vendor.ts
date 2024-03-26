export type Vendor = {
  isPremium?: boolean;
  id: string;
  alias: string;
  categories: string[];
  userId: string;
  name: string;
  phones: Phone[];
  emails: Email[];
  address: Address;
  latitude: number;
  longitude: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  features: string[];
  faq: FAQElement[];
  links: {
    type: Socials;
    url: string;
  }[];
  rating: number;
  statistics: {
    views: {
      [key: string]: number;
      total: number;
    };
  };
  images: Image[];
  seoImageLink?: string;
  priority: number;
  premiumSubscription: {
    id: string;
    priority: number;
    status: string;
    stripeCustomerId: string, 
    stripePriceId: string,
    stripeProductId: string,  
    subscriptionId: string;
    userId: string
    vendorId: string
  },
  status: string
};

export interface FAQElement {
  question: TranslationTextContent
  questionId?: string,
  answer: TranslationTextContent,
  answerId?: string,
  vendorId: string
  id?: string
}
export interface TranslationTextContent {
  id?: string,
  defaultTranslation: Translation | null,
  translations: Translation[]
}

export interface Translation {
  id?: string,
  textContentId?: string,
  translation: string,
  languageISO: string,
}

export interface DescriptionWithLabel extends Description {
  label: string
}

export interface Language {
  language: string,
  code: string
}

export interface Phone {
  number: string;
  description?: string;
}

export interface Email {
  email: string;
  description?: string;
}

export type Socials =
  | 'website'
  | 'twitter'
  | 'pinterest'
  | 'instagram'
  | 'facebook'
  | 'tikTok'
  | 'tripAdvisor'
  | 'yelp'
  | 'youtube';

export type Image = {
  src: string;
  alt?: string;
  hash: string;
  position: number;
  id?: string,
  vendorId?: string
};


export type Address = Partial<{
  postalCode: string;
  administrativeArea: string;
  locality: string;
  subThoroughfare: string;
  postalAddress: string;
  areasOfInterest: string[];
  country: string;
  isoCountryCode: string;
  name: string;
  thoroughfare: string;
}>;

export interface SmallVendor {
  id?: string;
  name: string;
  categories: string[];
  email?: string;
  phone?: string;
  weddingId: string;
  imageUrl?: string;
  address?: string;
  webUrl?: string;
}

export type LandingVendor = {
  id: string;
  name: string;
  rating: number;
  image: Image;
  address: Partial<Address>;
  categories: Category[];
  alias: string;
};

export type Category = {
  id: string;
  updatedAt?: string;
  createdAt?: string;
  name: string;
  type: string;
};

export type VendorLink = {
  type: Socials;
  url: string;
}

export type VendorPost = {
  address: {
    postalAddress: string;
    additionalProp1: Object,
  };
  description: NewDescription,
  name: string;
  phones: Phone[];
  categories: string[];
  emails: Email[];
  links: VendorLink[];
  location: {
    latitude: number;
    longitude: number;
  };
  images: string[];
};

export interface NewDescription {
  code: string,
  text: string
}

export interface Description {
  vendorId: string,
  value: string,
  language: string,
  id: number
}
  
export interface VendorStatisticProperties {
  icon: string;
  code?: VendorStatCodes
}

export interface VendorStatistics {
  addedToFavCount: number;
  addedToTeamCount: number; 
  detailViews: number;
  emailViewedCount: number;
  listedCount: number;
  messagesWrittenCount: number;
  phoneViewedCount: number;
  socialMedViewedCount: number;
  vendorId: string,
  id: string
}

export enum VendorStatCodes {
  addedToFavCount = 'addedToFavCount',
  addedToTeamCount = 'addedToTeamCount',
  detailViews = 'detailViews',
  emailViewedCount = 'emailViewedCount',
  listedCount = 'listedCount',
  messagesWrittenCount = 'messagesWrittenCount',
  phoneViewedCount = 'phoneViewedCount',
  socialMedViewedCount = 'socialMedViewedCount',
}

export interface NewVendorForValues {
  name: string;
  description: Description;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  links: VendorLink[];
  category: { label: StaticRange, value: VendorCategory };
  postalAddress: string;
  image: Image
}

export interface VendorCategory {
  id: string;
  name: string;
  type: string;
}