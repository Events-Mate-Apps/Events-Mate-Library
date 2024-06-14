import { FC } from 'react';
import { Question } from '../../../interfaces/questionnaire';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useLocalization } from '../../../service/LocalizationService';  
import { QUESTION_DISPLAY_COMPONENT } from '../../../constants/questionnaire';
import QTextDisplay from './QTextDisplay';

const QQuestionDisplay: FC<{ question: Question, fsTitle: number, fsDesc: number }> = ({ question, fsTitle, fsDesc }) => {
  const { getCurrentTranslation } = useLocalization()
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const secondaryTextColor = useColorModeValue('secondaryGray.700', 'white');

  const ResponseComponent = QUESTION_DISPLAY_COMPONENT[question.type];

  // const Component = question.subQuestions[0] ? AccordionItem : AccordionPanel

  return (
    <Accordion py='10px' pl='10px' allowToggle>
      <AccordionItem>
        <Box 
          display={ResponseComponent === QTextDisplay ? 'flex' : 'block'} 
          alignItems='center'
          justifyContent='space-between'
        >
          <AccordionButton>
            <AccordionIcon />
            <Box>
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
            {question.responses ? <ResponseComponent 
              responses={question.responses}
              options={question.options} 
              fsTitle={fsTitle - 2}
            /> : 'No Responses'}
          </AccordionButton>
        </Box>
        <AccordionPanel>
          {question.subQuestions && question.subQuestions.map((q) => (
            <QQuestionDisplay
              fsTitle={fsTitle - 2}
              fsDesc={fsDesc - 2}
              question={q}
              key={q.id}
            />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default QQuestionDisplay;