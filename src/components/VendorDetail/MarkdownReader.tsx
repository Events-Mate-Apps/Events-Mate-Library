import { Box } from '@chakra-ui/react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from 'styles/Markdown.module.scss';

const MarkdownReader = ({ source }: { source: string }) => {
    return (
      <Box className={styles['markdown-reader']}>
        <ReactMarkdown> 
          {source}
        </ReactMarkdown>	
      </Box>
    );
};

export default MarkdownReader;