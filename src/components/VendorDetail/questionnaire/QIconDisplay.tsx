import { FC } from 'react';
import { QDisplayComponentProps } from '../../../interfaces/questionnaire';
import { Flex, Text, VStack, Wrap, useColorModeValue } from '@chakra-ui/react';
import FontAwesomeIconWrapper from '~/components/FontAwesomeIconWrapper';
import { useLocalization } from '~/service/LocalizationService';

const QIconDisplay: FC<QDisplayComponentProps> = ({ responses, options }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColorDesc = useColorModeValue('gray.500', 'white');

  if (!options) return (<Text>No options were selected... :(</Text>)
  const selectedOptions = options.filter(e => responses[0].optionIds.includes(e.id))

  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      flexFlow='column'
      gap='10px'
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
            w='220px'
            h='160px'
            fontSize='16px'
            fontWeight='semibold'
            borderRadius='3xl'
            // {...borderStyles} TODO: Global BorderStyles?
            placeContent='left'
            cursor='pointer'
            bg='white'
            p='15px'
          >
            {e.faIcon && <FontAwesomeIconWrapper
              icon={e.faIcon}
              color='brand.900'
              size='75px'
            />}
            <Text pt='10px'>
              {getCurrentTranslation(e.titleContent)}
            </Text>
            {e.descriptionContent && <Text color={textColorDesc} pt='10px'>
              {getCurrentTranslation(e.descriptionContent)}
            </Text>}
          </VStack>
        )}
        <p>{JSON.stringify(responses.map(e => e.optionIds))}</p>
      </Wrap>
    </Flex>
  );
}
  
export default QIconDisplay;