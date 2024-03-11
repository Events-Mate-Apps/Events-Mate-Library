import {Box, Flex} from '@chakra-ui/react';
import React from "react";
import Image from "../../image/Image";
import { Vendor } from '~/interfaces/vendor';

export default function ReviewVendorImage(props: { vendor: Vendor }) {
    const { vendor } = props;

    //TODO more complex selection of image
    const image = vendor.images[0].src;

    return (
        <Flex
            direction="column"
            me={{ lg: '40px', xl: '60px' }}
            mb={{ sm: '24px', lg: '0px' }}
        >
            <Box
                w={{
                    sm: '100%',
                    md: '100%',
                    lg: '800px',
                    xl: '450px',
                    '2xl': '745px',
                }}
                h={{
                    sm: '450px',
                    md: '670px',
                    lg: '600px',
                    xl: '555px',
                    '2xl': '745px',
                }}
                mb="26px"
                mx={{ sm: 'auto', lg: 'auto', xl: '0px' }}
            >
                <Image
                    src={image}
                    w="100%"
                    h="100%"
                    borderRadius="15px"
                    alt=""
                />
            </Box>
        </Flex>
    );
}