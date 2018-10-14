import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToShop } from '../index';
import * as welcomeActions from '../../state/routes/welcome'
import './Welcome.css';

const mapStateToProps = (state) => ({
  welcome: state.routes.welcome,
  unity: state.unity
});

const mapDispatchToProps = {
  setWelcomeState: welcomeActions.setWelcomeState,
  goToShop: goToShop
};

class _Welcome extends Component {
  static propTypes = {
    welcome: PropTypes.object.isRequired,
    unity: PropTypes.object.isRequired,
    setWelcomeState: PropTypes.func.isRequired,
    goToShop: PropTypes.func.isRequired,
  };

  render(){
    const {
      welcome,
      goToShop,
      unity: {
        isLoading
      }
    } = this.props;

    return (
      <div id='welcome-screen'>
        <img id='rider'   src='./images/rider.jpg'/>
        <img id='boards'  src='./images/boards.png'/>
        <div id='title-container'>
          <img id='title'   src='./images/title.svg'/>
          {isLoading
            ?
            <div id='loading-message'><img src='./images/subtitle-loading.svg'/></div>
            :
            <button id='start-message' className='no-style-button' onClick={goToShop}><img src='./images/subtitle-start.svg'/></button>
          }
        </div>
      </div>
    )
  }
}


const Welcome = connect(mapStateToProps, mapDispatchToProps)(_Welcome);
export default Welcome;
