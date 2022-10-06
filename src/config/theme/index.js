import { extendTheme, theme as base } from '@chakra-ui/react';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fonts: {
    heading: `Open Sans, ${base.fonts?.heading}`,
    body: `Open Sans, ${base.fonts?.body}`,
  },
  breakpoints: {
    xs: '10em',
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
    '4xl': '118em',
  },
  colors: {
    blueChill: {
      500: '#4B8F8C',
    }
  }
});

export default theme;
