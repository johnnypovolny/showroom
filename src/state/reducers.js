import { combineReducers } from 'redux';

//Routes
import welcome from './routes/welcome';
import shop from './routes/shop';
import checkout from './routes/checkout';
import receipt from './routes/receipt';
import unity from './modules/unity';

export const rootReducer = reducer => {
  const appReducer = combineReducers({
        ...reducer,
        routes: combineReducers({
        welcome,
        shop,
        checkout,
        receipt
        }),
        unity
  });
  return (state, action) => {
    if (action.type === 'RESET_STATES') {
      const {
        unity
      } = state;
      state = undefined;
    }
    return appReducer(state, action);
  }
};

export default rootReducer;
