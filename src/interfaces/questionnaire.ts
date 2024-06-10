import { Dispatch, SetStateAction } from 'react';
import { TranslationTextContent, Vendor } from '../interfaces/vendor';

export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TEXT = 'TEXT',
  NUMERIC = 'NUMERIC',
  DATE_TIME = 'DATE_TIME',
  FILE_UPLOAD = 'FILE_UPLOAD',
  SLIDER = 'SLIDER',
  YES_NO = 'YES_NO',
  PRICE_ENTRY = 'PRICE_ENTRY',
  VENDOR_LINK = 'VENDOR_LINK',
}

export enum PriceUnitType {
  PERSON = 'PERSON',
  PIECE = 'PIECE',
  HOUR = 'HOUR',
  TOTAL = 'TOTAL',
}

export interface QuestionComponentType {
  question: Question,
  res: QuestionResponse,
  setRes: Dispatch<SetStateAction<QuestionResponse>>,
  youHaventAnsweredYet: boolean,
  priority: number
} 


export interface Translation {
  id?: number,
  languageISO: string,
  textContentId?: number,
  translation: string
}

export interface VendorPartnership {
  id?: string;
  parentId: string;       // Reference to the parent vendor (e.g., wedding venue)
  partnerId: string;      // Reference to the partner vendor (e.g., catering service)
  relationship?: string;  // Description of the relationship
  createdAt?: Date;
  updatedAt?: Date;
  questionResponseId?: string
}

export interface QuestionOption {
  iconUrl?: string | null
  faIcon?: string | null
  position: number
  description?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  titleContent: TranslationTextContent,
  descriptionContent?: TranslationTextContent,
  id: string
}

export interface QuestionnairePlan {
  id?: string,
  titleId?: number,
  titleContent: TranslationTextContent,
  descriptionId?: number,
  descriptionContent: TranslationTextContent,
  prices: Price[],
  perUnit: boolean,
  unitVolume?: number,
  unit?: PriceUnitType,
  createdAt?: Date,
  updatedAt?: Date,
  position: number,
  questionResponseId?: string,
  vendorId?: string,
}

export interface Price {
  id?: string,
  amount: number,
  currencyISO: string,
  planId?: string,
}

export interface QuestionResponse {
  id?: string,
  questionType: string,
  numericResponse: number,
  booleanResponse: boolean | null,
  dateResponse: string,
  fileUrl: string,
  optionIds: string[]
  createdAt?: Date ,
  updatedAt?: Date ,
  partnerVendorIds: string[]
  textResponseContent: TranslationTextContent
  plans: QuestionnairePlan[],
  questionId?: string,
  vendorPartnerships?: VendorPartnership[],
  vendorId?: string,
}  

export interface Question {
  allowMultiplePlans: boolean, 
  code: string,
  createdAt: string,
  descriptionId: number,
  descriptionContent: TranslationTextContent,
  titleId: string,
  titleContent: TranslationTextContent,
  faIcon?: string,
  iconUrl?: string, 
  id: string,
  isPublic: boolean, 
  options: QuestionOption[],
  parentId?: string,
  position: number, 
  publicDescriptionId: number,
  publicOnlyIcon: boolean, 
  publicTitleContent: TranslationTextContent,
  publicTitleId: number, 
  sectionId: string,
  subQuestions?: Question[],
  type: QuestionType, 
  updatedAt: string,
  responses?: QuestionResponse[]
}

export interface Section {
  id: string,
  descriptionId: number,
  descriptionContent: TranslationTextContent,
  titleId: string,
  titleContent: TranslationTextContent,
  imageUrl: string,
  position: number,
  questions: Question[],
  createdAt: string,
  updatedAt: string,
  questionnaireId: string
}

export interface Questionnaire {
  id: string,
  descriptionId: number,
  descriptionContent: TranslationTextContent,
  titleContent: TranslationTextContent,
  titleId: number,
  sections: Section[]
  version: number,
  vendorId: string,
  createdAt: string,
  updatedAt: string
}


export interface QuestionnairePickerProps {
  vendor: Vendor,
}
  
export interface QuestionnairePickerItem {
  titleContent: TranslationTextContent,
  questionsLength: number,
  responsesLength: number,
  id: string,
}
  