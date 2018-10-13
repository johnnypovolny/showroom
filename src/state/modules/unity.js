import { set, merge } from '../../utils/objectUtils';
import { sendMessage } from "../../utils/unityUtils";

const RESET_UNITY_STATE = 'unity/RESET_STATE';
const SET_UNITY_STATE = 'unity/SET_UNITY_STATE';
const SET_UNITY_CONTROL_MODE = 'unity/SET_UNITY_CONTROL_MODE';
const TOGGLE_UNITY_VIEW_ANGLE = 'unity/TOGGLE_UNITY_VIEW_ANGLE';
const UNITY_ENABLE_CAMERA = 'unity/UNITY_ENABLE_CAMERA';
const UNITY_DISABLE_CAMERA = 'unity/UNITY_DISABLE_CAMERA';

export const resetUnityState = () => ({
  type: RESET_UNITY_STATE
});

export const showUnity = () => ({
  type: SET_UNITY_STATE,
  key: 'isVisible',
  value: true
});

export const hideUnity = () => ({
  type: SET_UNITY_STATE,
  key: 'isVisible',
  value: false
});

export const setUnityMaster = (masterInstance) => ({
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

export const setUnityControlMode = (unityMaster, controlMode) => ({
  type: SET_UNITY_CONTROL_MODE,
  unityMaster,
  controlMode
});

export const toggleUnityViewAngle = (unityMaster) => ({
  type: TOGGLE_UNITY_VIEW_ANGLE,
  unityMaster
});

export const unityEnableCamera = (unityMaster) => ({
  type: UNITY_ENABLE_CAMERA,
  unityMaster
});

export const unityDisableCamera = (unityMaster) => ({
  type: UNITY_DISABLE_CAMERA,
  unityMaster
});


const initialState = {
  master: null,
  isLoaded: false,
  isVisible: false,
  isModelReady: false,
  unityControlMode: 'tumble',
  unityViewAngle: 'perspective',
  cameraEnabled: true
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

    case SET_UNITY_CONTROL_MODE:
      switch (action.controlMode) {
        case 'tumble':
          sendMessage(action.unityMaster, 'TumbleMode');
          break;
        case 'zoom':
          sendMessage(action.unityMaster, 'ZoomMode');
          break;
        case 'pan':
          sendMessage(action.unityMaster, 'PanMode');
          break;
        default:
          return state;
      }
      return set('unityControlMode', action.controlMode, state);

    case TOGGLE_UNITY_VIEW_ANGLE:
      let controlMode = state.unityControlMode;
      let shadowJSON = {
        enabled: false,
        distance: .1
      };

      switch (state.unityViewAngle) {
        case 'perspective':
          if(controlMode === 'tumble'){
            controlMode = 'pan';
            sendMessage(action.unityMaster, 'PanMode');
          }
          sendMessage(action.unityMaster, 'SetShadows', shadowJSON);
          sendMessage(action.unityMaster, 'SetView', 'TOP');
          sendMessage(action.unityMaster, 'FrameView');
          return merge(state, {unityViewAngle: 'top', unityControlMode: controlMode});
        case 'top':
          if(controlMode === 'tumble'){
            controlMode = 'pan';
            sendMessage(action.unityMaster, 'PanMode');
          }
          sendMessage(action.unityMaster, 'SetShadows', shadowJSON);
          sendMessage(action.unityMaster, 'SetView', 'BOTTOM');
          sendMessage(action.unityMaster, 'FrameView');
          return merge(state, {unityViewAngle: 'bottom', unityControlMode: controlMode});
        case 'bottom':
          if(controlMode === 'pan'){
            controlMode = 'tumble';
            sendMessage(action.unityMaster, 'TumbleMode');
          }
          shadowJSON.enabled = true;
          sendMessage(action.unityMaster, 'SetShadows', shadowJSON);
          sendMessage(action.unityMaster, 'SetView', 'Perspective');
          sendMessage(action.unityMaster, 'ResetOBJPosition');
          return merge(state, {unityViewAngle: 'perspective', unityControlMode: controlMode});
        default:
          return state;
      }
    case UNITY_ENABLE_CAMERA:
      sendMessage(action.unityMaster, 'EnableCamera');
      return set('cameraEnabled', true, state);
    case UNITY_DISABLE_CAMERA:
      sendMessage(action.unityMaster, 'DisableCamera');
      return set('cameraEnabled', false, state);
    default:
      return state;
  }
};

export default reducer;
