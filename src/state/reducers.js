import { combineReducers } from 'redux';
import welcome from './routes/welcome';
import shop from './routes/shop';
import checkout from './routes/checkout';
import unity from './modules/unity';

export default (reducers) => combineReducers({
  ...reducers,
  routes: combineReducers({
    welcome,
    shop,
    checkout
  }),
  unity
});
