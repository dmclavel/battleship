import type { CSSProperties } from 'react';

type FontSizeKey =
  | '7xl'
  | '6xl'
  | '5xl'
  | '4xl'
  | '3xl'
  | '2xl'
  | 'xl'
  | 'lg'
  | 'md'
  | 'sm'
  | 'xs';
type FontFamily = '"Noto Sans", sans-serif';
type FontSizes = Record<FontSizeKey, CSSProperties['fontSize']>;

type Typoghraphies = {
  fontFamily: FontFamily;
};

const FONTSIZES: FontSizes = {
  '7xl': '6rem',
  '6xl': '3.75rem',
  '5xl': '3rem',
  '4xl': '2.25rem',
  '3xl': '1.875rem',
  '2xl': '1.5rem',
  xl: '1.25rem',
  lg: '1.125rem',
  md: '1rem',
  sm: '0.875rem',
  xs: '0.75rem',
};

const TYPOGRAPHIES: Typoghraphies = {
  fontFamily: '"Noto Sans", sans-serif',
};

export type { Typoghraphies, FontSizes };
export { TYPOGRAPHIES, FONTSIZES };
