import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as welcomeActions from '../../state/routes/welcome'
import './Welcome.css';

const mapStateToProps = (state) => ({
  welcome: state.routes.welcome
});

const mapDispatchToProps = {
  setWelcomeState: welcomeActions.setWelcomeState
};

class _Welcome extends Component {
  static propTypes = {
    setWelcomeState: PropTypes.func.isRequired
  };

  render(){
    const {
      welcome
    } = this.props;

    return (
      <div id='welcome-screen'>
        WELCOME
      </div>
    )
  }
}


const Welcome = connect(mapStateToProps, mapDispatchToProps)(_Welcome);
export default Welcome;