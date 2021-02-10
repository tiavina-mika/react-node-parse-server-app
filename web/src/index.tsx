import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Parse from 'parse';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DEFAULT } from './utils/theme';

const location = window.location;
// LOCAL can also mean "accessed by a remote machine (like a Mac) on the local dev network"
const hostName = location.hostname;
(window as any).LOCAL = hostName.indexOf('coovz') === -1 && hostName.indexOf('starry-embassy-283615') === -1;
(window as any).PRODUCTION = hostName.indexOf('bo.coovz.com') !== -1;
//---------------------------------------------------//
//------------------- Parse init --------------------//
//---------------------------------------------------//
const portWithColon = (window as any).LOCAL ? ':1337' : '';
Parse.initialize(process.env.REACT_APP_APP_ID as string);
Parse.serverURL = location.protocol + '//' + location.hostname + portWithColon + '/parse';

ReactDOM.render(
  <React.StrictMode>
		<ThemeProvider theme={DEFAULT}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
