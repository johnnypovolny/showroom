import { set } from '../../utils/objectUtils';

const RESET_CHECKOUT_STATE = 'checkout/RESET_CHECKOUT_STATE';
const SET_CHECKOUT_STATE = 'checkout/SET_CHECKOUT_STATE';
const ADD_TO_CART = 'checkout/ADD_TO_CART';
const REMOVE_FROM_CART = 'checkout/REMOVE_FROM_CART';
const CHANGE_ITEM_QUANTITY = 'checkout/CHANGE_ITEM_QUANTITY';

export const resetCheckoutState = () => ({
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

export const changeItemQuantity = (index, quantity) => ({
  type: CHANGE_ITEM_QUANTITY,
  index,
  quantity
});

const initialState = {
  cart: {}
};

const reducer = (state = initialState, action = {}) => {
  const cart = state.cart;
  switch (action.type) {
    case RESET_CHECKOUT_STATE:
      console.log('RESETTING CHECKOUT');
      return initialState;
    case SET_CHECKOUT_STATE:
      return set(action.key, action.value, state);
    case ADD_TO_CART:
      cart[action.design.index] = action.design;
      cart[action.design.index].quantity = 1;
      return set('cart', cart, state);
    case REMOVE_FROM_CART:
      delete cart[action.index];
      return set('cart', cart, state);
    case CHANGE_ITEM_QUANTITY:
      cart[action.index].quantity = action.quantity;
      return set('cart', cart, state);
    default:
      return state;
  }
};

export default reducer;