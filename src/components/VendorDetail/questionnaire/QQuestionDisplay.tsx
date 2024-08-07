import { FC } from 'react';
import { Question, QuestionType } from '../../../interfaces/questionnaire';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';  
import { QUESTION_DISPLAY_COMPONENT } from '../../../constants/questionnaire';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

interface QQuestionDisplayProps {
  isFirst: boolean,
  question: Question,
  fsTitle: number,
  fsDesc: number,
}

const QQuestionDisplay: FC<QQuestionDisplayProps> = ({ question, fsTitle, fsDesc, isFirst }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  const ResponseComponent = QUESTION_DISPLAY_COMPONENT[question.type];

  const isBooleanOrNumeric = question.type === QuestionType.YES_NO || question.type === QuestionType.NUMERIC

  return (
    <Accordion allowToggle>
      <AccordionItem 
        textAlign='left' 
        borderColor='chakra-border-color._dark'
        borderTop={`${isFirst ? 0 : 1}px` }
        borderBottom='none !important'
      >
        {({ isExpanded }) => {
          const AccordionIcon = isExpanded ? MinusIcon : AddIcon
          
          return (<>
            <Box 
              display={isBooleanOrNumeric ? 'flex' : 'block'} 
            >
              <AccordionButton   
                pointerEvents={question.subQuestions && question.subQuestions.length > 0 ? 'all' : 'none'}
                display='flex'
              >
                <Flex
                  alignItems='center'
                  justifyContent='space-between'
                  w='100%'
                >
                  <Box textAlign='left'>
                    {(question.titleContent && question.titleContent.translations) && (
                      <Text color={textColor} fontSize={`${fsTitle}px`} fontWeight='700'>
                        {getCurrentTranslation(question.titleContent)}
                      </Text>
                    )}
                    {(question.descriptionContent && question.descriptionContent.translations) && (
                      <Text color={secondaryTextColor} fontSize={`${fsDesc}px`} fontWeight='500'>
                        {getCurrentTranslation(question.descriptionContent)}
                      </Text>
                    )}
                  </Box>
                  {isBooleanOrNumeric && (question.responses ? <ResponseComponent 
                    responses={question.responses}
                    options={question.options} 
                    fsTitle={fsTitle - 2}
                  /> : 'No Responses')}
                </Flex>
              
                <Box 
                  w='30px'
                  h='30px'
                  display='grid'
                  placeContent='center'
                  fontSize='15px'
                >
                  {(question.subQuestions && question.subQuestions.length > 0) && <AccordionIcon />}
                </Box>
              </AccordionButton>
              {!isBooleanOrNumeric && (question.responses ? <ResponseComponent 
                responses={question.responses}
                options={question.options} 
                fsTitle={fsTitle - 2}
              /> : 'No Responses')}
            </Box>
            {(question.subQuestions && question.subQuestions[0]) && question.subQuestions.map((q, idx) => (
              <AccordionPanel key={q.id} p='0'>
                <QQuestionDisplay
                  isFirst={idx === 0}
                  fsTitle={fsTitle - 2}
                  fsDesc={fsDesc - 2}
                  question={q}
                />
              </AccordionPanel>
            ))}
          </>)
        }}
      </AccordionItem>
    </Accordion>
  );
}

export default QQuestionDisplay;