import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Questionnaire } from '~/interfaces/questionnaire';
import { useNotification } from '../../../service/NotificationService';
import { api } from '~/utils/api';
  


const VendorDetailQuestionnaireResponses: FC = () => {
  const [availableQuestionnaires, setAvailableQuestionnaires] = useState<Questionnaire[]>([])
  const { query: { vendorId } } = useRouter()
  const { showError } = useNotification()
  
  const getAvailableQuestionnaires = async () => {
    try {
      const { data: questionnaireIds } = await api.get<string[]>(`vendors/${vendorId as string}/availableQuestionnaires`)
      questionnaireIds.forEach(async id => {
        const { data: questionnaire } = await api.get<Questionnaire>(`questionnaire/${id}/forVendor/${vendorId as string}`)
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

  return (
    <>
      <p>{availableQuestionnaires.map(e => e.titleContent.translations[0].translation)}</p>
    </>
  );
}
  
export default VendorDetailQuestionnaireResponses;