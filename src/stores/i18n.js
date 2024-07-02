import useTranslation from 'next-translate/useTranslation';

const useCustomTranslation = () => {
  const { t } = useTranslation();
  return t;
};

export default useCustomTranslation;
