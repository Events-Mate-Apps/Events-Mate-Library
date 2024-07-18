import React, { useState, useEffect, FC } from 'react';

import useNotificationStore from '../../stores/notification'
import { api } from '~/utils/api';
import { Categories, SelectCategory } from '../../interfaces/category';
import { useLocalization } from '../../service/LocalizationService';
import { Controller, useFormContext } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import useTranslation from 'next-translate/useTranslation';
import { Box, FormLabel, useColorModeValue } from '@chakra-ui/react';

interface CategorySelectProps {
  defaultValue?: string;
  name: string;
  error?: any;
}

export const CategorySelect: FC<CategorySelectProps> = ({
  defaultValue
}) => {
  const [categories, setCategories] = useState<SelectCategory[]>([]);
  const {
    formState: { errors },
    control
  } = useFormContext();

  const { showError } = useNotificationStore()
  const { getCurrentTranslation } = useLocalization()
  const { t } = useTranslation()
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  useEffect(() => {
    fetchCategories()
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: cats } = await api.get<Categories>('vendors/categories/vendor-categories')

      const selectCategories: SelectCategory[] = cats.map((e) => ({
        label: getCurrentTranslation(e.titleContent),
        value: e.id
      }))

      setCategories(selectCategories)
    } catch (error) {
      showError({ error })
    }
  }

  return (<Box w='100%'>
    <FormLabel
      textAlign="start"
      marginEnd='3'
      marginBottom='2'
      display="flex"
      marginLeft='2'
      fontSize="sm"
      color={textColor}
      fontWeight="bold"
    >
      {t('common:category')}
    </FormLabel>
    <Controller
      control={control}
      name="category"
      rules={{ required: t('common:alerts.errorMessages.required') }}
      render={({ field }) => (        
        <Select
          {...field}
          placeholder={t('common:select')}
          options={categories.map(({ value, label }) => ({
            value, label
          }))}
          defaultValue={defaultValue}
        />
      )}
    />
  </Box>)
}
