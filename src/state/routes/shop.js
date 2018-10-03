import { set } from '../../utils/objectUtils';

const RESET_SHOP_STATE = 'shop/RESET_SHOP_STATE';
const SET_SHOP_STATE = 'shop/SET_SHOP_STATE';

export const resetShopState = () => ({
  type: RESET_SHOP_STATE
});

export const setShopState = (key, value) => ({
  type: SET_SHOP_STATE,
  key,
  value
});

const initialState = {
  displayedDesignIndex: 0,
  designs: [0, 1, 2, 3, 4, 5, 6, 7, 8]
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_SHOP_STATE:
      return initialState;
    case SET_SHOP_STATE:
      return set(action.key, action.value, state);
    default:
      return state;
  }
};

export default reducer;