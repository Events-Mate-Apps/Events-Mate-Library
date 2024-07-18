export type Categories = Category[]

export interface Category {
  id: string
  titleContent: TranslationTextContent
  descriptionContent: TranslationTextContent
  iconUrl: string
  parentId: string
  parent: Parent
  subCategories: SubCategory[]
}

export interface TranslationTextContent {
  id?: string | number,
  defaultTranslation: Translation | null,
  translations: Translation[]
}
  
export interface Translation {
  id?: number,
  languageISO: string,
  textContentId?: number,
  translation: string
}

export interface Parent {}

export interface SubCategory {}

export interface SelectCategory {
  title: string
  value: string
}