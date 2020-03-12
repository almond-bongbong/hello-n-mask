import React from 'react';
import ReactDOM from 'react-dom';
import { UAParser } from 'ua-parser-js';
import App from './App';
import * as serviceWorker from './serviceWorker';
import OldBrowser from './components/OldBrowser';

const ua = new UAParser();
const browser = ua.getBrowser();
const isOldBrowser =
  browser.name === 'IE' &&
  browser.version &&
  parseInt(browser.version, 10) < 11;

ReactDOM.render(
  isOldBrowser ? <OldBrowser /> : <App />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
