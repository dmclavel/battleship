import { type CSSProperties } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';
export type Breakpoints = Record<Breakpoint, CSSProperties['width']>;

const BREAKPOINTS: Breakpoints = {
  mobile: '20rem',
  tablet: '48rem',
  desktop: '64rem',
};

export { BREAKPOINTS };
