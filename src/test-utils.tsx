import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import store from './shared/store';
import theme from './shared/theme';

import type { FC, ReactNode, ReactElement } from 'react';

interface AllTheProvidersProps {
  children: ReactNode;
}

const AllTheProviders: FC<AllTheProvidersProps> = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Provider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
