import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { goToCheckout } from '../index';
import * as shopActions from '../../state/routes/shop'
import { loadModel } from '../../utils/unityUtils';
import './Shop.css';

const mapStateToProps = (state) => ({
  shop: state.routes.shop,
  unity: state.unity
});

const mapDispatchToProps = {
  setShopState: shopActions.setShopState,
  goToCheckout: goToCheckout
};

class _Shop extends Component {
  static propTypes = {
    shop: PropTypes.object.isRequired,
    unity: PropTypes.object.isRequired,
    setShopState: PropTypes.func.isRequired,
    goToCheckout: PropTypes.func.isRequired,
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

        loadModel(master, objUnti8Array, 'snowboard', 'OBJ', mtlUnti8Array)
    });
  }

  render(){
    const {
      shop,
      goToCheckout
    } = this.props;

    return (
      <div id='shop-screen'>
        SHOP
        <button onClick={goToCheckout}>Checkout</button>
      </div>
    )
  }
}


const Shop = connect(mapStateToProps, mapDispatchToProps)(_Shop);
export default Shop;