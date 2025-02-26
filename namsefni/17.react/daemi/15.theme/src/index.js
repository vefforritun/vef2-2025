import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Hér sækjum við Provider og setjum utan um App
// Þau component sem nota contextið munu sækja það hingað
import { ThemeProvider } from './Theme';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
