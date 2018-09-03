import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './state/reducers'
import App from './routes/App/App.js';

const store = createStore(reducers);

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
  module.hot.accept('./routes/App', () => {
    const UpdatedApp = require('./routes/App/App.js').default;
    render(UpdatedApp);
  });
}