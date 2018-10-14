/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import * as unityActions from '../../state/modules/unity';
import { styleFunction } from './UnityMaster.style';
import { sendMessage } from "../../utils/unityUtils";

export const mapStateToProps = (state) => ({
  unity: state.unity
});

export const mapDispatchToProps = {
  resetUnityState: unityActions.resetUnityState,
  setUnityMaster: unityActions.setUnityMaster,
  unityIsLoading: unityActions.unityIsLoading,
  unityIsReady: unityActions.unityIsReady,
  showUnity: unityActions.showUnity
};

class _UnityMaster extends React.Component {
  static propTypes = {
    unity: PropTypes.object.isRequired,
    resetUnityState: PropTypes.func.isRequired,
    setUnityMaster: PropTypes.func.isRequired,
    unityIsLoading: PropTypes.func.isRequired,
    unityIsReady: PropTypes.func.isRequired,
    showUnity: PropTypes.func.isRequired,
    unityVisibleRoute: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired
  };

  componentWillMount() {
    this.props.unityIsLoading(true);
  }

  componentDidMount() {
    this.initializeUnity();
  }

  componentWillUpdate() {
    return !(this.props.unity.isLoading);
  }

  componentWillUnmount() {
    this.props.resetUnityState();
  }

  startUnity = () => {
    const {
      setUnityMaster
    } = this.props;

    console.log('startUnity()');
    const master = window.UnityLoader.instantiate('unity-master', '/unity/unity.json');

    window.addEventListener('resize', this.resizeUnity);
    setUnityMaster(master);
  };

  resizeUnity = () => {
    const unityCanvas = document.getElementById('#canvas');
    if(!unityCanvas) return;

    const {
      unityMaster
    } = this;

    const unityMasterDimensions = unityMaster.getBoundingClientRect();

    unityCanvas.width = unityMasterDimensions.width;
    unityCanvas.height = unityMasterDimensions.height;
  };

  initializeUnity = () => {
    const {
      showUnity,
      unityIsLoading,
      unityIsReady,
    } = this.props;
    const {
      unityMaster
    } = this;

    const script = document.createElement('script');

    window.UnityStarted = () => {
      unityIsReady();
      unityIsLoading(false);
      showUnity();
      unityMaster.style.backgroundColor = 'transparent';
      console.log('UNITY IS READY');
    };
    window.objLoaded = () => console.log('OBJ LOADED');

    script.id = 'unityScript';
    script.src = '/unity/UnityLoader.js';
    script.onload = this.startUnity;
    script.async = 1;
    script.defer = 1;

    document.body.appendChild(script);
  };

  render() {
    const {
      className
    } = this.props;

    return (
      <div
      id="unity-master"
      className={className}
      ref={(unityMaster) => { this.unityMaster = unityMaster; }}
      />
    );
  }
}

const GlamorousUnityMaster = glamorous(_UnityMaster)(styleFunction);
const UnityMaster = connect(mapStateToProps, mapDispatchToProps)(GlamorousUnityMaster);

export default UnityMaster;
