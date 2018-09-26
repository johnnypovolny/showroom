import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import UnityControls from '../../components/UnityControls/UnityControls';
import * as shopActions from '../../state/routes/shop'
import * as unityActions from '../../state/modules/unity'
import { goToCheckout } from '../index';
import { loadModel, sendMessage } from '../../utils/unityUtils';
import './Shop.css';

const mapStateToProps = (state) => ({
  shop: state.routes.shop,
  unity: state.unity
});

const mapDispatchToProps = {
  goToCheckout: goToCheckout,
  setShopState: shopActions.setShopState,
  setUnityControlMode: unityActions.setUnityControlMode,
  toggleUnityViewAngle: unityActions.toggleUnityViewAngle
};

class _Shop extends Component {
  static propTypes = {
    shop: PropTypes.object.isRequired,
    unity: PropTypes.object.isRequired,
    setShopState: PropTypes.func.isRequired,
    goToCheckout: PropTypes.func.isRequired,
    setUnityControlMode: PropTypes.func.isRequired
  };

  componentDidMount(){
    const {
      unity: {
        master
      }
    } = this.props;

    const promises = [];
    promises.push(axios.get('./objs/Snowboard.obj'));
    promises.push(axios.get('./objs/Snowboard.mtl'));

    Promise.all(promises).then(results => {
        const objText = results[0].data;
        const mtlText = results[1].data;
        const encoder = new TextEncoder();
        const objUnti8Array = encoder.encode(objText);
        const mtlUnti8Array = encoder.encode(mtlText);

        loadModel(master, objUnti8Array, 'snowboard', 'OBJ', mtlUnti8Array);


        const shadowJSON = {
          enabled: true,
          distance: .1
        };
        sendMessage(master, 'SetShadows', shadowJSON);
    });
  }

  render(){
    const {
      shop,
      unity,
      goToCheckout,
      setUnityControlMode,
      toggleUnityViewAngle
    } = this.props;

    return (
      <div id='shop-screen'>
        SHOP
        <UnityControls
          unity={unity}
          setUnityControlMode={setUnityControlMode}
          toggleUnityViewAngle={toggleUnityViewAngle}
        />
        <button onClick={goToCheckout}>Checkout</button>
      </div>
    )
  }
}


const Shop = connect(mapStateToProps, mapDispatchToProps)(_Shop);
export default Shop;