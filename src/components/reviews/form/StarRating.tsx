import React, { useState } from 'react';
import { Box, Flex, Text, Divider } from '@chakra-ui/react';
import { Rating } from 'react-simple-star-rating';
import { useFormContext } from 'react-hook-form';
import useTranslation from 'next-translate';

const StarRating: React.FC<{ attribute: string }> = ({ attribute }) => {
  const {
    setValue
  } = useFormContext();

  const [rating, setRating] = useState<number>(0);
  const [displayRating, setDisplayRating] = useState<number>(0);
  const [hovering, setHovering] = useState<boolean>(false);

  const { t } = useTranslation();

  const onPointerEnter = () => setHovering(true);
  const onPointerLeave = () => setHovering(false);
  const onPointerMove = (value: number) => {
    if (value != displayRating) setDisplayRating(value);
  }

  const handleRating = (rate: number) => {
    setValue(attribute, rate)
    setRating(rate)
  }

  //TODO I am pretty sure it is going to be possible to show and maybe even save partial stars
  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      w={{ base: '100%', lg: '90%', '2xl': '60%' }}
      alignItems={{ sm: 'center' }}
      justifyContent='space-between'
    >
      <Box mb={{ base: '2', sm: '0' }}>
        <Text>
          {t(`vendors:detail.reviews.form.qualities.${attribute}`)}
        </Text>
      </Box>
      <Flex mt='4px' justifyContent='space-between'>
        <Rating
          onClick={(newRating) => handleRating(newRating)}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
          transition={true}
          size={22}
          SVGstyle={{ 'display': 'inline' }}
        />
        <Text ms='15px'>
          {hovering ? displayRating : rating}
        </Text>
      </Flex>
      <Divider
        display={{ base: 'block', sm: 'none' }}
        mb={{ base: '4', sm: '0' }}
        mt={{ base: '2', sm: '0' }}
      />
    </Flex>
  )
}

export default StarRating;