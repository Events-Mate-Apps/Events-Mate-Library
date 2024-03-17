import React from 'react';

import { TranslationTextContent } from '../../interfaces/vendor';
import useTranslation from 'next-translate';


interface LocalizedTextProps  { 
    content: TranslationTextContent,
}

const LocalizedText: React.FC<LocalizedTextProps> = ({ content }) => {
    const { lang } = useTranslation()
    const getCurrentTranslation = () => {
        const translation = content.translations.find(e => e.languageISO === lang)?.translation
        if (!translation) return content.defaultTranslation?.translation
        return translation
    }

    return (
        <>
            {getCurrentTranslation()}
        </>
    );
}

export default LocalizedText;