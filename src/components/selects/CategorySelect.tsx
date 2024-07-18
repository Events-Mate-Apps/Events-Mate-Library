import React, { useState, useEffect, FC } from 'react';
// import { Select } from 'chakra-react-select';

import useNotificationStore from '../../stores/notification'
import { api } from '~/utils/api';
import { Categories, SelectCategory } from '../../interfaces/category';
import { useLocalization } from '../../service/LocalizationService';
import { Controller, useFormContext } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import useTranslation from 'next-translate/useTranslation';

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

  return <>
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
  </>
}
