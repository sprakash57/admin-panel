import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'theme/index.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
);
