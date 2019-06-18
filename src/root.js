import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import createStore from './state/createStore';
import App from './routes/App/App';

const history = createHistory();
const store = createStore(history);

function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./routes/App/App', () => {
    const UpdatedApp = require('./routes/App/App').default;

    render(UpdatedApp);
  });
}
