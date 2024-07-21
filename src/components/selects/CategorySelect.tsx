import React, { useState, useEffect, FC } from 'react';
import { api } from '../../utils/api';
import { Categories, SelectCategory } from '../../interfaces/category';
import { useLocalization } from '../../service/LocalizationService';
import { useFormContext, Controller } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import useTranslation from 'next-translate/useTranslation';
import { Box, FormLabel, useColorModeValue } from '@chakra-ui/react';
import useNotificationStore from '../../stores/notification';

interface CategorySelectProps {
  name: string;
}

const CategorySelect: FC<CategorySelectProps> = ({ name }) => {
  const [categories, setCategories] = useState<SelectCategory[]>([]);
  const { control } = useFormContext();
  const { showError } = useNotificationStore();
  const { getCurrentTranslation } = useLocalization();
  const { t } = useTranslation();
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: cats } = await api.get<Categories>('vendors/categories/vendor-categories');
      const selectCategories: SelectCategory[] = cats.map((cat) => ({
        label: getCurrentTranslation(cat.titleContent),
        value: cat
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
            value={categories.find(option => option.value.id === field.value?.[0]?.id) || null}
            onChange={(selectedOption) => field.onChange(selectedOption ? [selectedOption.value] : [])}
          />
        )}
      />
    </Box>
  );
};

export default CategorySelect;
