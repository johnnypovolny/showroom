import routes from '../routes/index';
import { combineReducers, createStore as _createStore, applyMiddleware, compose } from 'redux'

import { connectRoutes } from 'redux-first-router';
import reducers from './reducers';

const createStore = (history) => {
  const {
    reducer: location,
    middleware,
    enhancer
  } = connectRoutes(history, routes);

  const middlewares = applyMiddleware(middleware);
  const store = _createStore(reducers({location}), compose(enhancer, middlewares));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducers({ location }));
    });
  }

  return store
};

export default createStore;