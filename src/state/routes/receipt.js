import { set } from '../../utils/objectUtils';

const RESET_RECEIPT_STATE = 'receipt/RESET_RECEIPT_STATE';
const SET_RECEIPT_STATE = 'receipt/SET_RECEIPT_STATE';
// const RESET_STATES = 'RESET_STATES';
//
//
// export const resetStates = () =>  ({
//   type: 'RESET_STATES'
// });

export const resetReceiptState = () => ({
  type: RESET_RECEIPT_STATE
});

export const setReceiptState = (key, value) => ({
  type: SET_RECEIPT_STATE,
  key,
  value
});

const initialState = {
  confirmationNumber: null,
  deliveryDate: null
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_RECEIPT_STATE:
      return initialState;
    case SET_RECEIPT_STATE:
      return set(action.key, action.value, state);
    default:
      return state;
  }
};

export default reducer;