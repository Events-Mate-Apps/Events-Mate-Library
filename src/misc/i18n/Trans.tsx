import { TransProps } from 'next-translate';
import TransComponent from 'next-translate/Trans';
import { memo } from 'react';

function Trans(props: TransProps) {
  return <TransComponent {...props} />;
}

export default memo(Trans, (prev, next) => {
  if (prev.components !== next.components) return false;
  if (prev.i18nKey !== next.i18nKey) return false;
  return true;
});
