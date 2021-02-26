import './index.css';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import reportWebVitals from './reportWebVitals';
import store from 'store/createStore';
import theme from 'style/theme';

let app = <App />;

// Hook redux
app = <Provider store={store}>{app}</Provider>;

// Hook styled-components theme and GlobalStyle
app = <ThemeProvider theme={theme}>{app}</ThemeProvider>;

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
