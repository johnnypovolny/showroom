import routes from 'routes';
import { createStore as _createStore } from 'redux'
import reducers from './reducers';

const createStore = () => {
  const {
    reducer: location,
    thunk: routeThunk
  } = connectRoutes(history, routes);

  const store = _createStore(reducers({ location }));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducers({ location }));
    });
  }

  return {
    store,
    thunk: routeThunk
  };
};

export default createStore;