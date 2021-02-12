import React from 'react';
import ReactDOM from 'react-dom';
import { createGenerateClassName, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import Parse from 'parse';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import preset from 'jss-preset-default';
import { create } from 'jss';

import reportWebVitals from './reportWebVitals';
import { history, store } from './store';
import Routes from './Routes';
import { theme } from './utils/theme';
import './styles.css';

const { location } = window;
// LOCAL can also mean "accessed by a remote machine (like a Mac) on the local dev network"
const hostName = location.hostname;
(window as any).LOCAL = hostName.indexOf('coovz') === -1 && hostName.indexOf('starry-embassy-283615') === -1;
(window as any).PRODUCTION = hostName.indexOf('bo.coovz.com') !== -1;

// ---------------------------------------------------//
// ------------------- Parse init --------------------//
// ---------------------------------------------------//
const portWithColon = (window as any).LOCAL ? ':1338' : '';
Parse.initialize(process.env.REACT_APP_APP_ID as string);
Parse.serverURL = `${location.protocol  }//${  location.hostname  }${portWithColon  }/parse`;

const jss = create(preset());

// very important for react-await-dialog
const generateClassName = createGenerateClassName();

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <StylesProvider jss={jss} generateClassName={generateClassName}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </StylesProvider>
      </ConnectedRouter>
    </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
