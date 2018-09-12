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

    if (isLoading) return <div id='loading-message'>LOADING 3D ENGINE...</div>;

    return (
      <div id='welcome-screen'>
        <div>Welcome to the Snowroom</div>
        <button onClick={goToShop}>Start Shopping</button>
      </div>
    )
  }
}


const Welcome = connect(mapStateToProps, mapDispatchToProps)(_Welcome);
export default Welcome;