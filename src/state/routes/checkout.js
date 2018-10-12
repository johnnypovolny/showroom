import { set } from '../../utils/objectUtils';

const RESET_CHECKOUT_STATE = 'checkout/RESET_CHECKOUT_STATE';
const SET_CHECKOUT_STATE = 'checkout/SET_APP_STATE';
const ADD_TO_CART = 'checkout/ADD_TO_CART';
const REMOVE_FROM_CART = 'checkout/REMOVE_FROM_CART';

export const resetAppState = () => ({
  type: RESET_CHECKOUT_STATE
});

export const setCheckoutState = (key, value) => ({
  type: SET_CHECKOUT_STATE,
  key,
  value
});

export const addDesignToCart = (design) => ({
  type: ADD_TO_CART,
  design
});

export const removeDesignFromCart = (index) => ({
  type: REMOVE_FROM_CART,
  index
});

const initialState = {
  cart: {}
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_CHECKOUT_STATE:
      return initialState;
    case SET_CHECKOUT_STATE:
      return set(action.key, action.value, state);
    case ADD_TO_CART:
      const addItemCart = JSON.parse(JSON.stringify(state.cart));
      const existingAddCartItem = addItemCart[action.design.index];

      if(existingAddCartItem) existingAddCartItem.quantity++;
      else{
        addItemCart[action.design.index] = action.design;
        addItemCart[action.design.index].quantity = 1;
      }
      return set('cart', addItemCart, state);
    case REMOVE_FROM_CART:
      const removeItemCart = JSON.parse(JSON.stringify(state.cart));
      const existingRemoveCartItem = removeItemCart[action.index];

      if(existingRemoveCartItem && existingRemoveCartItem.quantity > 1) existingRemoveCartItem.quantity--;
      else delete removeItemCart[action.index];
      return set('cart', removeItemCart, state);
    default:
      return state;
  }
};

export default reducer;