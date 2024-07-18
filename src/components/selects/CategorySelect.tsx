import React, { useState, useEffect, FC } from 'react';
// import { Select } from 'chakra-react-select';

import useNotificationStore from '../../stores/notification'
import { api } from '~/utils/api';
import { Categories, SelectCategory } from '../../interfaces/category';
import { useLocalization } from '../../service/LocalizationService';

interface CategorySelectProps {
  defaultValue?: string;
  name: string;
  error?: any;
}

export const CategorySelect: FC<CategorySelectProps> = ({
  defaultValue
}) => {
  const [categories, setCategories] = useState<SelectCategory[]>([]);

  const { showError } = useNotificationStore()
  const { getCurrentTranslation } = useLocalization()

  useEffect(() => {
    fetchCategories()
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: cats } = await api.get<Categories>('vendors/categories/vendor-categories')

      const selectCategories: SelectCategory[] = cats.map((e) => ({
        title: getCurrentTranslation(e.titleContent),
        value: e.id
      }))

      setCategories(selectCategories)
    } catch (error) {
      showError({ error })
    }
  }

  return <>
    {categories.map((e) => 
      <p key={e.value}>title: {e.title}, value: {e.value}</p>
    )}
  </>
}
