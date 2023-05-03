import type { CSSProperties } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';
export type Breakpoints = {
  values: Record<Breakpoint, CSSProperties['width']>;
  unit: 'rem' | 'px' | 'em';
};

const BREAKPOINTS: Breakpoints = {
  values: {
    mobile: 20,
    tablet: 48,
    desktop: 64,
  },
  unit: 'rem',
};

export { BREAKPOINTS };
