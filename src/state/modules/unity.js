import { set } from '../../utils/objectUtils';

export const RESET_UNITY_STATE = 'unity/RESET_STATE';
export const SET_UNITY_STATE = 'unity/SET';

export const resetState = () => ({
  type: RESET_UNITY_STATE
});

export const show = () => ({
  type: SET_UNITY_STATE,
  key: 'isVisible',
  value: true
});

export const hide = () => ({
  type: SET_UNITY_STATE,
  key: 'isVisible',
  value: false
});

export const setPosition = (position) => ({
  type: SET_UNITY_STATE,
  key: 'position',
  value: position
});

export const setMaster = (masterInstance) => ({
  type: SET_UNITY_STATE,
  key: 'master',
  value: masterInstance
});

export const unityIsLoading = (value) => ({
  type: SET_UNITY_STATE,
  key: 'isLoading',
  value
});

export const unityIsReady = () => ({
  type: SET_UNITY_STATE,
  key: 'isLoaded',
  value: true
});

const initialState = {
  master: null,
  isLoaded: false,
  isVisible: false,
  isModelReady: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_UNITY_STATE:
      return {
        ...initialState,
        position: { ...initialState.position },
        master: state.master || null,
        isLoaded: state.isLoaded
      };

    case SET_UNITY_STATE:
      return set(action.key, action.value, state);

    default:
      return state;
  }
};

export default reducer;
