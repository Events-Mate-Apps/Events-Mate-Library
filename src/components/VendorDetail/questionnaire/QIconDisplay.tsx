import { FC } from 'react';
import { QDisplayComponentProps } from '../../../interfaces/questionnaire';
import { Flex, Text, VStack, Wrap, useColorModeValue } from '@chakra-ui/react';
import FontAwesomeIconWrapper from '../../../components/FontAwesomeIconWrapper';
import { useLocalization } from '../../../service/LocalizationService';

const QIconDisplay: FC<QDisplayComponentProps> = ({ responses, options }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColorDesc = useColorModeValue('gray.500', 'white');
  const iconColor = useColorModeValue('#718096', '#ffffff');

  const borderStyles = useColorModeValue({
    boxShadow: 'lg',
    borderWidth: '0px',
    background: 'none',
  },
  {
    borderColor: 'whiteAlpha.100',
    boxShadow: 'unset',
    borderWidth: '1px',
    background: 'navy.800',
  })

  if (!options) return (<Text>No options were selected... :(</Text>)
  const selectedOptions = options.filter(e => responses[0].optionIds.includes(e.id))

  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      flexFlow='column'
      mt='10px'
      mb='20px'
    >
      <Wrap
        spacing='20px'
        justify='center'
        w='100%'
      >
        {selectedOptions.map((e) => 
          <VStack
            key={e.id}
            flexFlow='column'
            justifyContent='center'
            alignItems='center'
            w='110px'
            h='80px'
            fontSize='16px'
            fontWeight='semibold'
            borderRadius='3xl'
            {...borderStyles}
            placeContent='left'
            bg='white'
          >
            {e.faIcon && <FontAwesomeIconWrapper
              icon={e.faIcon}
              color={iconColor}
              size='25px'
            />}
            <Text fontSize='16px'>
              {getCurrentTranslation(e.titleContent)}
            </Text>
            {e.descriptionContent && <Text color={textColorDesc} pt='5px'>
              {getCurrentTranslation(e.descriptionContent)}
            </Text>}
          </VStack>
        )}
      </Wrap>
    </Flex>
  );
}
  
export default QIconDisplay;