import { combineReducers } from 'redux';

// Views
import welcome from './routes/welcome';
import shop from './routes/shop';
import checkout from './routes/checkout';

export default (reducers) => combineReducers({
    ...reducers,
    routes: combineReducers({
        welcome,
        shop,
        checkout})
});
