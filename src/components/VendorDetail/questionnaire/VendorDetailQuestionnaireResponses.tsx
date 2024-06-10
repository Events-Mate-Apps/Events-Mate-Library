import { FC, useEffect, useState } from 'react';
import { Questionnaire } from '~/interfaces/questionnaire';
import { useNotification } from '../../../service/NotificationService';
import { api } from '~/utils/api';
import { Vendor } from '~/interfaces/vendor';
  


const VendorDetailQuestionnaireResponses: FC<{ vendor: Vendor }> = ({ vendor }) => {
  const [availableQuestionnaires, setAvailableQuestionnaires] = useState<Questionnaire[]>([])
  const { showError } = useNotification()
  
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

  return (
    <>
      <p>{availableQuestionnaires.map(e => e.titleContent.translations[0].translation)}</p>
      <p>{vendor.id}</p>x
    </>
  );
}
  
export default VendorDetailQuestionnaireResponses;