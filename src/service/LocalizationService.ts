import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';
import { TranslationTextContent } from '../interfaces/vendor';

interface LocalizationMethods {
  getCurrentTranslation: (content: TranslationTextContent, language?: string) => string,
  extractLanguageISOCodesFromObject: (obj: object) => string[]
}

export function useLocalization(): LocalizationMethods {
  const { lang } = useTranslation()

  const getCurrentTranslation = (content: TranslationTextContent, language?: string): string => {
    const currentLang = language ? language : lang;

    const translation = content.translations.find(e => e.languageISO === currentLang)?.translation
    if (!translation) {
      return content.translations.find(e => e.languageISO === lang)?.translation || content.translations[0].translation
    }
    return translation
  }

  function extractLanguageISOCodesFromObject(obj: object): string[] {
    const langs: string[] = [];
      
    function extractLanguages(obj: any) {
      if (obj !== null && typeof obj === 'object') {
        Object.entries(obj).forEach(([key, value]) => {
          if (key === 'languageISO' && typeof value === 'string') {
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
    extractLanguageISOCodesFromObject
  }
}