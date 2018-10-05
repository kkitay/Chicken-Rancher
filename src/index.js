import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Ranch from './ranch/Ranch';

render(
  <Provider store={store}>
    <Ranch />
  </Provider>,
  document.getElementById('root')
);