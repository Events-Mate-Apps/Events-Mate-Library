import { FormControl } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import InputField from '../../../components/fields/InputField';
import SwitchField from '../../../components/fields/SwitchField';
import TextArea from '../../../components/fields/TextArea';
import useTranslation from 'next-translate/useTranslation';
import { textToDomainText } from '../../../stores/helpers/textTodomain';

const Recommendation: React.FC = () => {
  const { register, setValue } = useFormContext();

  const [recommend, setRecommend] = useState<boolean>(true);
  const [decision, setDecision] = useState<boolean>(true);
  const { t } = useTranslation();
  const [companyName, setCompanyName] = useState('Nase-svatba');

  useEffect(() => {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const computedName = textToDomainText('WeddMate', hostname);
    setCompanyName(computedName);
  }, []);

  const onChangeRecommendation = () => {
    const updatedRecommend = !recommend;
    setRecommend(updatedRecommend);
    setValue('recommend', updatedRecommend);
  };

  const onChangeDecision = () => {
    const updatedDecision = !decision;
    setDecision(updatedDecision);
    setValue('didWeHelp', updatedDecision);
  };

  const onChangeDescription = (value: string) => {
    setValue('description', value);
  };

  // TODO title and description are missing red star, to show they are mandatory (consider this in other components of the form too)
  return (
    <FormControl>
      <SwitchField
        id='recommend'
        label={t('vendors:detail.reviews.form.recommendation.recommend')}
        isChecked={recommend}
        onChange={onChangeRecommendation}
        w={{ base: '100%', lg: '70%', xl: '80%' }}
      />
      <SwitchField
        id='didWeHelp'
        label={t('vendors:detail.reviews.form.recommendation.decision', { companyName })}
        isChecked={decision}
        onChange={onChangeDecision}
        w={{ base: '100%', lg: '70%', xl: '80%' }}
        mb={5}
      />
      <InputField
        id='title'
        label={t('vendors:detail.reviews.form.recommendation.title')}
        placeholder={t('vendors:detail.reviews.form.recommendation.titlePlaceholder')}
        {...register('title', {
          //TODO I don't know how is the text shown, so it is not tested, suspicion is that it is not shown at all, which it should be
          required: t('common:fieldIsRequired', { x: 'title' }),
        })}
      />
      {/* TODO Description is mandatory */}
      <TextArea
        id='description'
        label={t('vendors:detail.reviews.form.recommendation.description', { companyName })}
        placeholder={t('vendors:detail.reviews.form.recommendation.descriptionPlaceholder', { companyName })}
        onChange={onChangeDescription}
      />
    </FormControl>
  );
};

export default Recommendation;
