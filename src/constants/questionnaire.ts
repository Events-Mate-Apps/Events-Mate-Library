import { QDisplayComponentProps, QuestionType } from '../interfaces/questionnaire'

import QIconDisplay from '../components/VendorDetail/questionnaire/QIconDisplay'
import QTextDisplay from '../components/VendorDetail/questionnaire/QTextDisplay'
import QLinkDisplay from '../components/VendorDetail/questionnaire/QVendorLinkDisplay'
import QPriceDisplay from '../components/VendorDetail/questionnaire/QPriceEntryDisplay'
import { FC } from 'react'

type QuestionDisplayHandler = Record<QuestionType, FC<QDisplayComponentProps>>

export const QUESTION_DISPLAY_COMPONENT: QuestionDisplayHandler = {
  [QuestionType.SINGLE_CHOICE]: QIconDisplay, 
  [QuestionType.MULTIPLE_CHOICE]: QIconDisplay, 
  [QuestionType.TEXT]: QTextDisplay,
  [QuestionType.NUMERIC]: QTextDisplay,
  [QuestionType.DATE_TIME]: QTextDisplay,
  [QuestionType.FILE_UPLOAD]: QTextDisplay,
  [QuestionType.SLIDER]: QTextDisplay,
  [QuestionType.YES_NO]: QTextDisplay,
  [QuestionType.PRICE_ENTRY]: QPriceDisplay,
  [QuestionType.VENDOR_LINK]: QLinkDisplay,
}