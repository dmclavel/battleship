import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import App from './App';
import theme from './shared/theme';
import store from './shared/store';

import { generateFontSize } from './shared/utils/styles';


declare global {
  interface Window {
    generateFontSize: typeof generateFontSize;
  }
}

window.generateFontSize = generateFontSize;

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
