import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";
import { TranslationTextContent } from "../interfaces/vendor";

interface LocalizationMethods {
    getCurrentTranslation: (content: TranslationTextContent, language?: string) => string;
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

    return {
        getCurrentTranslation
    }
}