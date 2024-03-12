import { Flex, Box } from '@chakra-ui/react';

import React, { useState } from 'react';

import { TranslationTextContent, Vendor } from '../../interfaces/vendor';
import Image from '../image/Image';
import useTranslation from 'next-translate/useTranslation';


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
            <p>{JSON.stringify(lang)}</p>
            <p>{JSON.stringify(content)}</p>
            {getCurrentTranslation()}
        </>
    );
}

export default LocalizedText;