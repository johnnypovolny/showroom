import { combineReducers } from 'redux';

//Routes
import welcome from './routes/welcome';
import shop from './routes/shop';
import checkout from './routes/checkout';
import receipt from './routes/receipt';
import unity from './modules/unity';

export default (reducers) => combineReducers({
    ...reducers,
    routes: combineReducers({
        welcome,
        shop,
        checkout,
        receipt
    }),
    unity
});
