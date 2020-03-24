import React from 'react';
import ReactDOM from 'react-dom';

import App from 'containers/App';

import GlobalContextProvider from 'contexts/global';

ReactDOM.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>,
  document.getElementById('root'),
);
