import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import routes from '../routes/index';
import reducer from './reducers';

const createStore = (history) => {
  const {
    reducer: location,
    middleware,
    enhancer
  } = connectRoutes(history, routes);

  const middlewares = applyMiddleware(middleware);
  const store = _createStore(reducer({ location }), compose(enhancer, middlewares));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducer({ location }));
    });
  }

  return store;
};

export default createStore;