import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RouteSwitch from '../RouteSwitch';
import Welcome from '../Welcome/Welcome';
import Shop from '../Shop/Shop';
import Checkout from '../Checkout/Checkout';
import './App.css';

const mapStateToProps = (state) => ({
  location: state.location
});

const mapDispatchToProps = {
};

class _App extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  render(){
    const {
      location
    } = this.props;

    console.log("LOCATION:", location );

    return (
      <div id='main-app'>
        HELLO I'M THE APP
        <RouteSwitch
            routes={{
              WELCOME: Welcome,
              SHOP: Shop,
              CHECKOUT: Checkout
            }}
        />
      </div>
    )
  }
}


const App = connect(mapStateToProps, mapDispatchToProps)(_App);
export default App;