import { FC } from 'react';
import { Question } from '../../../interfaces/questionnaire';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';  
import { QUESTION_DISPLAY_COMPONENT } from '../../../constants/questionnaire';
import QTextDisplay from './QTextDisplay';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

interface QQuestionDisplayProps {
  question: Question,
  fsTitle: number,
  fsDesc: number,
  index: number,
  isRoot: boolean
}

const QQuestionDisplay: FC<QQuestionDisplayProps> = ({ question, fsTitle, fsDesc, index, isRoot }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');
  const columns = useBreakpointValue({ base: 1, lg: 2 })

  const ResponseComponent = QUESTION_DISPLAY_COMPONENT[question.type];

  return (
    <Accordion allowToggle>
      <AccordionItem 
        textAlign='left' 
        borderColor='chakra-border-color._dark'
        borderTop={`${(index < (columns as number) && isRoot) ? 0 : 1}px`} 
        borderBottom='none !important'
      >
        {({ isExpanded }) => {
          const AccordionIcon = isExpanded ? MinusIcon : AddIcon
          
          return (<>
            <Box 
              display={ResponseComponent === QTextDisplay ? 'flex' : 'block'} 
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
                  {ResponseComponent === QTextDisplay && (question.responses ? <ResponseComponent 
                    responses={question.responses}
                    options={question.options} 
                    fsTitle={fsTitle - 2}
                  /> : 'No Responses')}
                </Flex>
              
                <Box w='30px' h='30px'>
                  {(question.subQuestions && question.subQuestions.length > 0) && <AccordionIcon />}
                </Box>
              </AccordionButton>
              {ResponseComponent !== QTextDisplay && (question.responses ? <ResponseComponent 
                responses={question.responses}
                options={question.options} 
                fsTitle={fsTitle - 2}
              /> : 'No Responses')}
            </Box>
            {(question.subQuestions && question.subQuestions[0]) && question.subQuestions.map((q, questionIndex) => (
              <AccordionPanel key={q.id} p='0'>
                <QQuestionDisplay
                  index={questionIndex}
                  fsTitle={fsTitle - 2}
                  fsDesc={fsDesc - 2}
                  question={q}
                  isRoot={false}
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