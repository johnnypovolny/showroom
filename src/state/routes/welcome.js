import { set } from '../../utils/objectUtils';

const RESET_WELCOME_STATE = 'welcome/RESET_STATE';
const SET_WELCOME_STATE = 'welcome/SET_APP_STATE';

export const resetAppState = () => ({
  type: RESET_WELCOME_STATE
});

export const setWelcomeState = (key, value) => ({
  type: SET_WELCOME_STATE,
  key,
  value
});

const initialState = {
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_WELCOME_STATE:
      return initialState;
    case SET_WELCOME_STATE:
      return set(action.key, action.value, state);
    default:
      return state;
  }
};

export default reducer;