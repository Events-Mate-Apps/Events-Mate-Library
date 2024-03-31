import React, { useMemo, useState } from 'react';

import { TranslationTextContent } from '../../interfaces/vendor';
import useTranslation from 'next-translate/useTranslation';
import { Box } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import styles from 'styles/Markdown.module.scss';

interface LocalizedTextProps  { 
    content: TranslationTextContent,
    language?: string
}

const LocalizedText: React.FC<LocalizedTextProps> = ({ content, language }) => {
    const { lang } = useTranslation()

    const currentLang = useMemo<string>(() => {
        return language ? language : lang;
    }, [lang, language]);

    const getCurrentTranslation = () => {
        const translation = content.translations.find(e => e.languageISO === currentLang)?.translation
        if (!translation) {
            return content.translations.find(e => e.languageISO === lang)?.translation || content.translations[0].translation
        }
        return translation
    }

    return (
        <Box className={styles['markdown-reader']}>
            <ReactMarkdown> 
                {getCurrentTranslation()}
            </ReactMarkdown>	
        </Box>
    );
}

export default LocalizedText;