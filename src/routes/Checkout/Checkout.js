import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToShop } from '../index';
import * as checkoutActions from '../../state/routes/checkout'
import './Checkout.css';

const mapStateToProps = (state) => ({
  checkout: state.routes.checkout
});

const mapDispatchToProps = {
  setCheckoutState: checkoutActions.setCheckoutState,
  goToShop: goToShop
};

class _Checkout extends Component {
  static propTypes = {
    checkout: PropTypes.object.isRequired,
    setCheckoutState: PropTypes.func.isRequired,
    goToShop: PropTypes.func.isRequired
  };


  renderCartItemsCounter = () => {
    const {
      checkout: {
        cart
      }
    } = this.props;

    let itemCount = 0;
    Object.keys(cart).forEach((cartItemKey) => {
      itemCount += cart[cartItemKey].quantity;
    });

    return <div id='item-count'>Items In Cart: {itemCount}</div>
  };

  render(){
    const {
      checkout,
      goToShop
    } = this.props;

    return (
      <div id='checkout-screen'>
        CHECKOUT
        <button onClick={goToShop}>Continue Shopping</button>
        {this.renderCartItemsCounter()}
      </div>
    )
  }
}


const Checkout = connect(mapStateToProps, mapDispatchToProps)(_Checkout);
export default Checkout;