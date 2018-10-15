import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as indexActions from '../index';
import * as checkoutActions from '../../state/routes/checkout';
import CartItem from '../../components/CartItem/CartItem';
import './Checkout.css';

const mapStateToProps = (state) => ({
  checkout: state.routes.checkout
});

const mapDispatchToProps = {
  removeDesignFromCart: checkoutActions.removeDesignFromCart,
  changeItemQuantity: checkoutActions.changeItemQuantity,
  setCheckoutState: checkoutActions.setCheckoutState,
  resetCheckoutState: checkoutActions.resetCheckoutState,
  goToShop: indexActions.goToShop,
  goToWelcome: indexActions.goToWelcome
};

class _Checkout extends Component {
  static propTypes = {
    checkout: PropTypes.object.isRequired,
    removeDesignFromCart: PropTypes.func.isRequired,
    changeItemQuantity: PropTypes.func.isRequired,
    goToShop: PropTypes.func.isRequired,
    goToWelcome: PropTypes.func.isRequired,
    setCheckoutState: PropTypes.func.isRequired,
    resetCheckoutState: PropTypes.func.isRequired
  };

  generateId = () => {
    const idChars = [];
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 8; i++) idChars.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));

    return idChars.join('');
  };

  calculateDeliveryDate = (daysToAdd) => {
    const deliveryDate = new Date();

    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
    return deliveryDate;
  };

  shopMore = () => {
    const {
      goToShop,
      resetCheckoutState
    } = this.props;

    resetCheckoutState();
    goToShop();
  };

  signOut = () => {
    const {
      goToWelcome,
      resetCheckoutState
    } = this.props;

    resetCheckoutState();
    goToWelcome();
  };

  renderCartItems = () => {
    const {
      checkout: {
        cart
      },
      changeItemQuantity,
      removeDesignFromCart
    } = this.props;

    return Object.keys(cart).map((key) => (
      <CartItem
        key={key}
        item={cart[key]}
        removeDesignFromCart={removeDesignFromCart}
        changeItemQuantity={changeItemQuantity}
      />)
    );
  };

  renderCartTotal = () => {
    const {
      checkout: {
        cart
      },
      setCheckoutState
    } = this.props;

    const cartKeys = Object.keys(cart);
    let totalCost;

    switch (cartKeys.length) {
      case 0:
        totalCost = 0;
        break;
      case 1:
        const singleItem = cart[cartKeys[0]];

        totalCost = singleItem.price * singleItem.quantity;
        break;
      default:
        totalCost = cartKeys.reduce((acc, key) => acc + (cart[key].price * cart[key].quantity), 0);
        break;
    }

    if (totalCost === 0) return null;

    return (
      <div id='cart-total'>
        Cart Total $ {totalCost}
        <div>
          <button
            onClick={() => {
              setCheckoutState('confirmationNumber', this.generateId());
              setCheckoutState('deliveryDate', this.calculateDeliveryDate(10));
              setCheckoutState('purchased', true);
            }}>Confirm Purchase
          </button>
        </div>
      </div>
    );
  };

  renderPurchasedItems = () => {
    const {
      checkout: {
        cart
      }
    } = this.props;
    const cartKeys = Object.keys(cart);

    return cartKeys.map((key) => {
      const item = cart[key];

      return (
        <div key={key} id='purchased-item'>
          <div>Item: {item.name}</div>
          <div>Qty: {item.quantity}</div>
          <div>Item Total: {item.quantity * item.price}</div>
        </div>
      );
    });
  };

  render() {
    const {
      checkout: {
        cart,
        purchased,
        deliveryDate,
        confirmationNumber
      },
      goToShop
    } = this.props;

    const cartKeys = Object.keys(cart);

    if (purchased) {
      return (
        <div>
          <div>
            Thanks for your purchase! Please allow up to 10 days for your custom BRAVO snowboard to be hand crafted.
          </div>
          {deliveryDate ? <div>Delivery guaranteed by {deliveryDate.toDateString()}</div> : null}
          {confirmationNumber ? <div>Your confirmation number is: {confirmationNumber}</div> : null}
          <h1>Your Order:</h1>
          {this.renderPurchasedItems()}
          {this.renderCartTotal()}
          <button onClick={this.shopMore}>Shop More</button>
          <button onClick={this.signOut}>Sign Out</button>
        </div>
      );
    }

    return (
      <div id='checkout-screen'>
        <div id='checkout-header-container'>
          <button className='no-style-button' onClick={goToShop}>
            <img id='back-button' src="./images/arrowLeft.svg" alt='Go Back' />
            <img id='checkout-header' src='./images/title.svg' alt='' />
          </button>
        </div>
        {(cartKeys.length < 1) ? <button id='empty-cart-button' onClick={goToShop} className='no-style-button'>CART IS EMPTY - RETURN TO SNOWROOM?</button> : null}
        <div id='cart-items'>
          {this.renderCartItems()}
        </div>
        {this.renderCartTotal()}
      </div>
    );
  }
}


const Checkout = connect(mapStateToProps, mapDispatchToProps)(_Checkout);

export default Checkout;
