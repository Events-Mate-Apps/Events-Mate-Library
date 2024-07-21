import { FormControl, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import InputField from '../../../components/fields/InputField';
import useTranslation from 'next-translate/useTranslation';

const Email: React.FC = () => {
  const {
    register
  } = useFormContext();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const { t } = useTranslation();

  // TODO title and description are missing red star, to show they are mandatory (consider this in other components of the form too)
  return (
    <FormControl>
      <InputField
        id='authorEmail'
        label={t(`vendors:detail.reviews.form.email.email`)}
        placeholder={t(`vendors:detail.reviews.form.email.emailPlaceholder`)}
        {...register('authorEmail', {
          //TODO I don't know how is the text shown, so it is not tested, suspicion is that it is not shown at all, which it should be
          required: t('common:fieldIsRequired', { 'x': 'authorEmail' }),
        })}
      />
      <Text
        color={textColor}
        fontSize='xs'
        fontWeight='400'
      >
        {t(`vendors:detail.reviews.form.email.info`)}
      </Text>
    </FormControl>
  );
}

export default Email;