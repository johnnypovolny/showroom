import { set } from '../../utils/objectUtils';

const RESET_CHECKOUT_STATE = 'checkout/RESET_CHECKOUT_STATE';
const SET_CHECKOUT_STATE = 'checkout/SET_APP_STATE';

export const resetAppState = () => ({
  type: RESET_CHECKOUT_STATE
});

export const setCheckoutState = (key, value) => ({
  type: SET_CHECKOUT_STATE,
  key,
  value
});

const initialState = {
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_CHECKOUT_STATE:
      return initialState;
    case SET_CHECKOUT_STATE:
      return set(action.key, action.value, state);
    default:
      return state;
  }
};

export default reducer;