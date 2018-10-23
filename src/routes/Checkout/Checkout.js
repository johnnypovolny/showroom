import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as indexActions from '../index';
import * as checkoutActions from '../../state/routes/checkout';
import CartItem from '../../components/CartItem/CartItem';

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

  componentWillUnmount() {
    const {
      checkout: {
        purchased
      },
      resetCheckoutState
    } = this.props;

    if (purchased) resetCheckoutState();
  }

  // Figure out the total cost of all items in the cart
  calculateCartTotal = () => {
    const {
      checkout: {
        cart
      }
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

    return totalCost;
  };

  // Helper function to create a randomized confirmation number for the order
  generateId = () => {
    const idChars = [];
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 8; i++) idChars.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));

    return idChars.join('');
  };

  // Helper function to return a date string a given number of days from the moment of purchase (for delivery info).
  calculateDeliveryDate = (daysToAdd) => {
    const deliveryDate = new Date();

    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
    return deliveryDate;
  };

  // Clear checkout duck state and return to snowroom
  shopMore = () => {
    const {
      goToShop,
    } = this.props;

    goToShop();
  };


  // Clear checkout duck state and return to welcome screen
  signOut = () => {
    const {
      goToWelcome,
    } = this.props;

    goToWelcome();
  };

  // Map the list of cart items to CartItem components
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

  // Show total cost of cart and allow user to complete purchase
  renderCartTotal = () => {
    const {
      setCheckoutState
    } = this.props;

    const totalCost = this.calculateCartTotal();

    if (totalCost === 0) return null;
    return (
      <div id='cart-total'>
        <div>Cart Total $ {totalCost}</div>
        <button
          id='confirm-purchase'
          onClick={() => {
            setCheckoutState('confirmationNumber', this.generateId());
            setCheckoutState('deliveryDate', this.calculateDeliveryDate(10));
            setCheckoutState('purchased', true);
          }}>Confirm Purchase
        </button>
      </div>
    );
  };

  // Show purchased items (for listing on receipt)
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
        <div key={key} className='purchased-item'>
          <div>Item: {item.name}</div>
          <div>Qty: {item.quantity}</div>
          <div>Item Total: ${item.quantity * item.price}</div>
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
        <div className='route'>
          <img className='final-screens-background' src='/images/receiptBackground.jpg' alt='' />
          <div id='receipt-info'>
            <h2>Thanks for your purchase!</h2>
            <div id='thanks-message'>
              Please allow up to 10 days for your custom BRAVO snowboard to be hand crafted.
            </div>
            {deliveryDate ? <div>Delivery guaranteed by: <b>{deliveryDate.toDateString()}</b></div> : null}
            {confirmationNumber ? <div>Your confirmation number is: <b>{confirmationNumber}</b></div> : null}
            <h2>Your Order:</h2>
            {this.renderPurchasedItems()}
            <h4>Cart Total ${this.calculateCartTotal()}</h4>
            <div id='final-options-container'>
              <button className='final-options' onClick={this.shopMore}>Shop More</button>
              <button className='final-options' onClick={this.signOut}>Sign Out</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='route'>
        <img className='final-screens-background' src='/images/checkoutBackground.jpg' alt='' />
        <div id='checkout-header-container'>
          <button className='no-style-button' onClick={goToShop}>
            <img id='back-button' src="./images/arrowLeft.svg" alt='Go Back' />
            <img id='checkout-header' src='./images/titleBlue.svg' alt='' />
          </button>
        </div>
        {(cartKeys.length < 1) ? <button id='empty-cart' onClick={goToShop}>CART IS EMPTY - RETURN TO SNOWROOM?</button> : null}
        <div id='cart-items'>
          {this.renderCartItems()}
          {this.renderCartTotal()}
        </div>
      </div>
    );
  }
}


const Checkout = connect(mapStateToProps, mapDispatchToProps)(_Checkout);

export default Checkout;
