import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RouteSwitch from '../RouteSwitch';
import Welcome from '../Welcome/Welcome';
import Shop from '../Shop/Shop';
import Checkout from '../Checkout/Checkout';
import Receipt from '../Receipt/Receipt';
import UnityMaster from '../../components/UnityMaster/UnityMaster';
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

  componentDidMount(){
    window.textureLoaded = () => {}
  }

  render(){
    const {
      location
    } = this.props;

    return (
      <div id='main-app'>
        <UnityMaster unityVisibleRoute={location.type === 'SHOP'} />
        <RouteSwitch
            routes={{
              WELCOME: Welcome,
              SHOP: Shop,
              CHECKOUT: Checkout,
              RECEIPT: Receipt
            }}
        />
      </div>
    )
  }
}


const App = connect(mapStateToProps, mapDispatchToProps)(_App);
export default App;