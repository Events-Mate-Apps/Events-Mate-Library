import { FC, useEffect, useState } from 'react';
import { Questionnaire } from '../../../interfaces/questionnaire';
import useNotificationStore from '../../../stores/notification';
import { api } from '../../../utils/api';
import { Vendor } from '../../../interfaces/vendor';
import { Card, Text, useColorModeValue } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import QuestionnaireResponsesContainer from './QuestionnaireResponsesContainer';
  
const VendorDetailQuestionnaireResponses: FC<{ vendor: Vendor }> = ({ vendor }) => {
  const [availableQuestionnaires, setAvailableQuestionnaires] = useState<Questionnaire[]>([])
  const { showError } = useNotificationStore()
  const { t } = useTranslation()
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const getAvailableQuestionnaires = async () => {
    try {
      const { data: questionnaireIds } = await api.get<string[]>(`vendors/${vendor.id}/availableQuestionnaires`)
      questionnaireIds.forEach(async id => {
        const { data: questionnaire } = await api.get<Questionnaire>(`questionnaire/${id}/forVendor/${vendor.id}`)
        setAvailableQuestionnaires(prevState => ([
          ...prevState,
          questionnaire
        ]))
      })

    } catch (error) {
      showError({ error })
    }
  }

  useEffect(() => {
    getAvailableQuestionnaires()
  }, [])

  if (availableQuestionnaires[0]) return (
    <Card p='20px' mb='20px'>
      <Text color={textColor} fontSize='2xl' fontWeight='700'>
        {t('vendors:questionnaire.questionnaire')}
      </Text>
      {availableQuestionnaires.map(questionnaire => {
        return <QuestionnaireResponsesContainer  
          key={questionnaire.id}
          questionnaire={questionnaire}
        />
      })}
    </Card>
  );
}
  
export default VendorDetailQuestionnaireResponses;