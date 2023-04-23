import { createTheme } from '@mui/material/styles';
import {
  PRIMARY,
  SECONDARY,
  GREY,
  FEEDBACK,
  type FeedbackPalette,
} from './constants/colors';
import { BREAKPOINTS, type Breakpoints } from './constants/breakpoints';
import { TYPOGRAPHIES } from './constants/typography';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    feedback: FeedbackPalette;
  }

  interface ThemeOptions {
    breakpoints: Breakpoints;
  }

  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    desktop: true;
  }
}

const theme = createTheme({
  palette: {
    primary: PRIMARY,
    secondary: SECONDARY,
    grey: GREY,
    feedback: FEEDBACK,
  },
  breakpoints: BREAKPOINTS,
  typography: TYPOGRAPHIES,
});

export default theme;
