import { Box, ImageProps as ChakraImageProps } from '@chakra-ui/react';
import NextImage, { ImageProps } from 'next/legacy/image';

export type ChakraNextImageProps = Omit<ChakraImageProps, 'src'> & {
  nextProps?: Partial<ImageProps>;
  src?: ImageProps['src'];
};

const Image: React.FC<ChakraNextImageProps>  = ({ src, alt, nextProps, ...rest }) => {
  return (
    <Box overflow={'hidden'} position="relative" {...rest}>
      <NextImage
        objectFit="cover"
        layout="fill"
        src={src ?? ''}
        alt={alt}
        {...(nextProps ?? {})}
      />
    </Box>
  );
}

export default Image;
