export interface Vendor {
  status: string
  isPremium?: boolean,
  id: string,
  alias: string,
  categories: string[],
  category: Category,
  userId: string,
  name: string,
  phone: string,
  email: string,
  address: Address,
  latitude: number,
  longitude: number,
  location?: {
    latitude: number,
    longitude: number,
  },
  features: string[],
  faq: FAQElement[],
  links: {
    type: Socials,
    url: string,
  }[],
  rating: number,
  statistics: {
    views: {
      [key: string]: number,
      total: number,
    },
  },
  images: Image[],
  seoImageLink?: string,
  priority: number,
  descriptionContent?: TranslationTextContent,
  premiumSubscription: {
    id: string,
    priority: number,
    status: string,
    stripeCustomerId: string, 
    stripePriceId: string,
    stripeProductId: string,  
    subscriptionId: string,
    userId: string
    vendorId: string
  },
  supportedCountries: SupportedCountry[]  
  supportedAdministrativeArea: VendorAdministrativeArea[] 
}

export interface NewVendorForValues {
  name: string;
  descriptionContent: TranslationTextContent;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  links: VendorLink[];
  category: { label: StaticRange, value: VendorCategory };
  postalAddress: string;
  image: Image
}

export interface FAQElement {
  question: TranslationTextContent
  questionId?: string,
  answer: TranslationTextContent,
  answerId?: string,
  vendorId: string
  id?: string
}

export interface TranslationTextContent {
  id?: string | number,
  defaultTranslation: Translation | null,
  translations: Translation[]
}

export interface Translation {
  id?: string | number,
  textContentId?: string | number,
  translation: string,
  languageISO: string,
}

export interface DescriptionWithLabel extends Description {
  label: string
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
  | 'youtube'

export interface Image {
  src: string,
  alt?: string,
  hash: string,
  position: number,
  id?: string,
  vendorId?: string
}


export type Address = Partial<{
  postalCode: string,
  administrativeArea: string,
  locality: string,
  subThoroughfare: string,
  postalAddress: string,
  areasOfInterest: string[],
  country: string,
  isoCountryCode: string,
  name: string,
  thoroughfare: string,
}>

export interface SmallVendor {
  id?: string,
  name: string,
  categories: string[],
  email?: string,
  phone?: string,
  weddingId: string,
  imageUrl?: string,
  address?: string,
  webUrl?: string,
}

export interface LandingVendor {
  id: string,
  name: string,
  rating: number,
  image: Image,
  address: Partial<Address>,
  categories: Category[],
  alias: string,
}

export interface Category {
  id: string,
  updatedAt?: string,
  createdAt?: string,
  name: string,
  type: string,
}

export interface VendorLink {
  type: Socials,
  url: string,
}

export interface VendorPost {
  address: {
    postalAddress: string,
    additionalProp1: object,
  },
  descriptionContent: TranslationTextContent,
  name: string,
  phone: string,
  email: string,
  categories: string[],
  links: VendorLink[],
  location: {
    latitude: number,
    longitude: number,
  },
  images: []
}

export interface Description {
  vendorId: string,
  value: string,
  language: string,
  id: number
}
 
export interface VendorStatisticProperties {
  icon: string,
  code?: VendorStatCodes
}

export interface VendorStatistics {
  addedToFavCount: number,
  addedToTeamCount: number, 
  detailViews: number,
  emailViewedCount: number,
  listedCount: number,
  messagesWrittenCount: number,
  phoneViewedCount: number,
  socialMedViewedCount: number,
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

export interface VendorAdministrativeArea {
  countryIso: string
  haveSVGMap: boolean
  id: number,
  isoCode: string
  nameContent: TranslationTextContent,
  subVendorAdministrativeArea?: VendorAdministrativeArea,
  nameId: number
}

export interface SupportedCountry {
  haveSVGMap: boolean,
  iso: string,
  nameContent: TranslationTextContent,
  nameId: number,
  administrativeAreas?: VendorAdministrativeArea[],
}

export interface Language {
  language: string,
  code: string
}

export interface VendorCategory {
  id: string;
  name: string;
  type: string;
}

export interface VendorAdministrativeArea {
  countryIso: string
  haveSVGMap: boolean
  id: number,
  isoCode: string
  nameContent: TranslationTextContent,
  subVendorAdministrativeArea?: VendorAdministrativeArea,
  nameId: number
}

export interface SupportedCountry {
  haveSVGMap: boolean,
  iso: string,
  nameContent: TranslationTextContent,
  nameId: number,
  administrativeAreas?: VendorAdministrativeArea[],
}