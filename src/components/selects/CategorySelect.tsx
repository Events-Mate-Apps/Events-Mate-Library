import React, { useState, useEffect, FC } from 'react';
import useNotificationStore from '../../stores/notification';
import { api } from '~/utils/api';
import { Categories, SelectCategory } from '../../interfaces/category';
import { useLocalization } from '../../service/LocalizationService';
import { Controller, useFormContext } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import useTranslation from 'next-translate/useTranslation';
import { Box, FormLabel, useColorModeValue } from '@chakra-ui/react';

interface CategorySelectProps {
  defaultValue?: string[];
  name: string;
}

export const CategorySelect: FC<CategorySelectProps> = ({
  defaultValue = [],
  name,
}) => {
  const [categories, setCategories] = useState<SelectCategory[]>([]);
  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext();

  const { showError } = useNotificationStore();
  const { getCurrentTranslation } = useLocalization();
  const { t } = useTranslation();
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && defaultValue.length > 0) {
      const selectedCategories = defaultValue.map(value => {
        const category = categories.find(cat => cat.value === value);
        return category ? { label: category.label, value: category.value } : null;
      }).filter(Boolean);
      setValue(name, selectedCategories[0] || null);
    }
  }, [categories, defaultValue, setValue, name]);

  const fetchCategories = async () => {
    try {
      const { data: cats } = await api.get<Categories>('vendors/categories/vendor-categories');

      const selectCategories: SelectCategory[] = cats.map((e) => ({
        label: getCurrentTranslation(e.titleContent),
        value: e.id // Assuming `e.id` is the unique identifier for the category
      }));

      setCategories(selectCategories);
    } catch (error) {
      showError({ error });
    }
  };

  return (
    <Box w='100%'>
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
        name={name}
        rules={{ required: t('common:alerts.errorMessages.required') }}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={t('common:select')}
            options={categories}
            value={field.value ? { label: categories.find(cat => cat.value === field.value)?.label, value: field.value } : null}
            onChange={(selected) => field.onChange(selected ? selected.value : '')}
            isClearable
          />
        )}
      />
    </Box>
  );
}
