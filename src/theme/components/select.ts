import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['field', 'icon']);

const baseStyle = helpers.definePartsStyle({
  field: {
    fontWeight: 400,
    bg: 'transparent',
    border: '1px solid',
    color: 'secondaryGray.600',
    borderColor: 'secondaryGray.100',
    borderRadius: '16px',
    fontSize: 'sm',
    p: '20px',
    _placeholder: { color: 'secondaryGray.400' },
    _dark: {
      bg: 'navy.800',
      color: 'white',
      borderColor: 'whiteAlpha.100',
    },
  },
});

export const selectTheme = helpers.defineMultiStyleConfig({ baseStyle });
