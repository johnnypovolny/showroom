import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToShop } from '../index';
import * as welcomeActions from '../../state/routes/welcome'
import './Welcome.css';

const mapStateToProps = (state) => ({
  welcome: state.routes.welcome
});

const mapDispatchToProps = {
  setWelcomeState: welcomeActions.setWelcomeState,
  goToShop: goToShop
};

class _Welcome extends Component {
  static propTypes = {
    setWelcomeState: PropTypes.func.isRequired,
    goToShop: PropTypes.func.isRequired,
  };

  render(){
    const {
      welcome,
      goToShop
    } = this.props;

    return (
      <div id='welcome-screen'>
        WELCOME
        <button onClick={goToShop}>Start Shopping</button>
      </div>
    )
  }
}


const Welcome = connect(mapStateToProps, mapDispatchToProps)(_Welcome);
export default Welcome;