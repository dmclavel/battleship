import { type CSSProperties } from 'react';

type Hue = 500 | 400 | 300 | 200 | 100 | 'main';
type Feedback = 'success' | 'warning' | 'error' | 'info';
type ColorPalette = Record<Hue, CSSProperties['color']>;
type FeedbackPalette = Record<Feedback, CSSProperties['color']>;

const PRIMARY: ColorPalette = {
  main: '#562B6B',
  500: '#562B6B',
  400: '#8B45AD',
  300: '#BC5EEB',
  200: '#D3A4EB',
  100: '#DAC7EB',
};

const SECONDARY: ColorPalette = {
  main: '#666611',
  500: '#666611',
  400: '#B0B01E',
  300: '#E3E327',
  200: '#E8E86D',
  100: '#F5FCB1',
};

const GREY: ColorPalette = {
  main: '#050503',
  500: '#050503',
  400: '#414442',
  300: '#949AA3',
  200: '#D5D5D5',
  100: '#F1F1F1',
};

const FEEDBACK: FeedbackPalette = {
  success: '#37E06A',
  warning: '#E1D165',
  error: '#E15348',
  info: '#2897D6',
};

export {
  PRIMARY,
  SECONDARY,
  GREY,
  FEEDBACK,
  type ColorPalette,
  type FeedbackPalette,
};
