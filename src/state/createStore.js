import routes from '../routes/index';
import { createStore as _createStore } from 'redux'
import { connectRoutes } from 'redux-first-router';
import reducers from './reducers';

const createStore = (history) => {
  const {
    reducer: location,
  } = connectRoutes(history, routes);

  const store = _createStore(reducers({ location }));

  console.log('STORE CREATED!');

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducers({ location }));
    });
  }

  return store
};

export default createStore;