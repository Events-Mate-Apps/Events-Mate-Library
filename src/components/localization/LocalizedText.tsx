import React, { useMemo, useState } from 'react';

import { TranslationTextContent } from '../../interfaces/vendor';
import useTranslation from 'next-translate/useTranslation';
import { Box } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import styles from 'styles/Markdown.module.scss';
import { useLocalization } from '~/service/LocalizationService';

interface LocalizedTextProps  { 
    content: TranslationTextContent,
    language?: string,
    markdown?: boolean,
}

const LocalizedText: React.FC<LocalizedTextProps> = ({ content, language, markdown }) => {
    const { getCurrentTranslation } = useLocalization()

    return (
        <>
            {markdown ? <Box className={styles['markdown-reader']}>
                <ReactMarkdown> 
                    {getCurrentTranslation(content, language)}
                </ReactMarkdown>	
            </Box>
            : getCurrentTranslation(content, language)}
        </>
    );
}

LocalizedText.defaultProps = {
    markdown: false,
}

export default LocalizedText;