import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from '../../redux/reducers';

const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},
    store = createStore(rootReducer, initialState),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),
  history,
  store,
});

export default renderWithRouterAndRedux;
