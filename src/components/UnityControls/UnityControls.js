import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sendMessage } from '../../utils/unityUtils';

class UnityControls extends Component {
  static propTypes = {
    unity: PropTypes.object.isRequired,
    setUnityControlMode: PropTypes.func.isRequired,
    toggleUnityViewAngle: PropTypes.func.isRequired
  };

  // Set Unity to Tumble Mode
  tumble = () => {
    const {
      unity: {
        master
      },
      setUnityControlMode
    } = this.props;

    setUnityControlMode(master, 'tumble');
  };

  // Set Unity to Zoom Mode
  zoom = () => {
    const {
      unity: {
        master
      },
      setUnityControlMode,
    } = this.props;

    setUnityControlMode(master, 'zoom');
  };

  // Set Unity to Pan Mode
  pan = () => {
    const {
      unity: {
        master
      },
      setUnityControlMode,
    } = this.props;

    setUnityControlMode(master, 'pan');
  };

  // Toggle between the 'pespective' view of the 3D model and the 'top' and 'bottom' orthographic views
  toggleViewAngle = () => {
    const {
      unity: {
        master
      },
      toggleUnityViewAngle,
    } = this.props;

    toggleUnityViewAngle(master);
  };

  // Return the 3D model to the starting point of the view it's in- centered and standard zoomed.
  homeView = () => {
    const {
      unity: {
        unityViewAngle,
        master
      },
    } = this.props;

    if (unityViewAngle === 'perspective') sendMessage(master, 'ResetOBJPosition');
    else sendMessage(master, 'FrameView');
  };

  render() {
    const {
      unity: {
        unityControlMode,
        unityViewAngle
      }
    } = this.props;

    return (
      <div id="unity-controls-container">
        <button className='unity-control-button' onClick={() => this.toggleViewAngle()}>
          <img src='./images/toggleView.png' id='toggle-view' alt="Toggle view" />
        </button>
        <button className="unity-control-button" onClick={() => this.homeView()}>
          <img src='./images/homeView.png' alt="Home view" />
        </button>
        <button className="unity-control-button" id={unityViewAngle !== 'perspective' ? 'control-disabled' : null} onClick={() => this.tumble()} disabled={unityViewAngle !== 'perspective'}>
          <img src={unityControlMode === 'tumble' ? './images/tumbleOn.png' : './images/tumbleOff.png'} alt="Tumble mode" />
        </button>
        <button className="unity-control-button" onClick={() => this.pan()}>
          <img src={unityControlMode === 'pan' ? './images/panOn.png' : './images/panOff.png'} alt="Pan mode" />
        </button>
        <button className="unity-control-button" onClick={() => this.zoom()}>
          <img src={unityControlMode === 'zoom' ? './images/dollyOn.png' : './images/dollyOff.png'} alt="Zoom mode" />
        </button>
      </div>
    );
  }
}

export default UnityControls;
