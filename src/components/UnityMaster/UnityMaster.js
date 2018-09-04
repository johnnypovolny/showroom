/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import * as unityActions from '../../state/modules/unity';

import { styleFunction } from './UnityMaster.style';

export const mapStateToProps = (state) => ({
  unity: state.unity
});

export const mapDispatchToProps = {
  resetState: unityActions.resetState,
  setMaster: unityActions.setMaster,
  unityIsLoading: unityActions.unityIsLoading,
  unityIsReady: unityActions.unityIsReady,
  show: unityActions.show,
};

class _UnityMaster extends React.Component {
  static propTypes = {
    unityIsLoading: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    setMaster: PropTypes.func.isRequired,
    unity: PropTypes.object.isRequired,
    unityIsReady: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    unityVisibleRoute: PropTypes.bool.isRequired
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
    this.props.resetState();
  }

  startUnity = () => {
    console.log('startUnity()');
    const master = window.UnityLoader.instantiate('unity-master', '/unity/unity.json');

    window.addEventListener('resize', this.resizeUnity);
    this.props.setMaster(master);
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
      show
    } = this.props;
    const script = document.createElement('script');

    window.UnityStarted = () => {
      this.props.unityIsReady();
      this.props.unityIsLoading(false);
      show();
      console.log('UNITY IS READY')
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
