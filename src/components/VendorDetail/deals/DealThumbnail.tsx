import { Box, Flex } from '@chakra-ui/react';
import React from "react";
import { DealImage } from '@/interfaces/deals';
import Image from '../../image/Image';

interface DealThumbnailProps {
    dealImage: DealImage
}
  
const DealThumbnail: React.FC<DealThumbnailProps> = ({ dealImage }) => {
    return (
        <Flex
            direction="column"
            me={{ lg: '20px', xl: '30px' }}
            mb={{ sm: '24px', lg: '0px' }}
        >
            <Box
                w={{
                    sm: '40px',
                    md: '600px',
                    lg: '80px',
                    xl: '100px',
                    '2xl': '120px',
                }}
                h={{
                    sm: '40px',
                    md: '600px',
                    lg: '80px',
                    xl: '100px',
                    '2xl': '120px',
                }}
                mx={{ sm: 'auto', lg: 'auto', xl: '0px' }}
            >
                <Image
                    src={dealImage.src}
                    w="100%"
                    h="100%"
                    borderRadius="15px"
                    alt={dealImage.alt}
                />
            </Box>
        </Flex>
    );
}

export default DealThumbnail;