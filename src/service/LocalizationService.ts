import useTranslation from 'next-translate/useTranslation';
import { TranslationTextContent } from '../interfaces/vendor';
import { Price } from '../interfaces/questionnaire';

interface LocalizationMethods {
  getCurrentTranslation: (content: TranslationTextContent, language?: string) => string,
  getCurrentPrice: (prices: Price[], language?: string) => Price,
  extractLanguageISOCodesFromObject: (obj: object) => string[]
}

const languageToCurrency: Map<string, string> = new Map([
  ['cs', 'CZK'],
  ['sk', 'EUR'],
  ['us', 'USD'],
]);

export function useLocalization(): LocalizationMethods {
  const { lang } = useTranslation()

  const getCurrentTranslation = (content: TranslationTextContent, language?: string): string => {
    const currentLang = language ? language : lang;
    
    const translation = content.translations?.find(e => e.languageISO === currentLang)?.translation;
    if (!translation) {
      return content.translations?.find(e => e.languageISO === lang)?.translation || content.translations?.[0]?.translation || '';
    }
    
    return translation;
  };

  const getCurrentPrice = (prices: Price[], language?: string): Price => {
    const currentLang = language ? language : lang;
    
    const price = prices.find(e => e.currencyISO === languageToCurrency.get(currentLang));
    
    return price || prices[0];
  };

  function extractLanguageISOCodesFromObject(obj: object): string[] {
    const langs: string[] = [];
      
    function extractLanguages(obj: any) {
      if (obj !== null && typeof obj === 'object') {
        Object.entries(obj).forEach(([key, value]) => {
          if ((key === 'languageISO' || key === 'language') && typeof value === 'string') {
            !langs.includes(value) && langs.push(value);
          } else if (typeof value === 'object') {
            extractLanguages(value);
          }
        });
      }
    }    
      
    extractLanguages(obj);
    return langs;
  }

  return {
    getCurrentTranslation,
    extractLanguageISOCodesFromObject,
    getCurrentPrice,
  }
}