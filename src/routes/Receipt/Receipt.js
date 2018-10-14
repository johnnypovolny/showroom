import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { goToShop, goToWelcome, resetStates } from '../index';
import * as receiptActions from "../../state/routes/receipt"
import './Receipt.css';

const mapStateToProps = (state) => ({
  receipt: state.routes.receipt,
  checkout: state.routes.checkout
});

const mapDispatchToProps = {
  goToShop: goToShop,
  goToWelcome: goToWelcome,
  resetStates: resetStates,
  setReceiptState: receiptActions.setReceiptState,
};

class _Receipt extends Component {
  static propTypes = {
    setReceiptState: PropTypes.func.isRequired
  };

  shopMore = () => {
    const {
      goToShop,
      resetStates
    } = this.props;
    resetStates();
    goToShop();
  };

  signOut = () => {
    const {
      goToWelcome,
      resetStates
    } = this.props;

    resetStates();
    goToWelcome();
  };

  generateId = () => {
    let idChars = [];
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for(let i = 0; i < 8; i++) idChars.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));

    return idChars.join('');
  };

  calculateDeliveryDate = (daysToAdd) => {
    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
    return deliveryDate;
  };

  componentDidMount(){
    const {
      receipt: {
        confirmationNumber,
        deliveryDate
      },
      setReceiptState
    } = this.props;
    if(!confirmationNumber) setReceiptState('confirmationNumber', this.generateId());
    if(!deliveryDate) setReceiptState('deliveryDate', this.calculateDeliveryDate(10));
  }


  renderPurchasedItems = () => {
    const {
      checkout: {
        cart
      }
    } = this.props;
    let cartKeys = Object.keys(cart);

    return cartKeys.map((key) => {
      const item = cart[key];
      return (
      <div key={key} id='purchased-item'>
        <div>Item: {item.name}</div>
        <div>Qty: {item.quantity}</div>
        <div>Item Total: {item.quantity * item.price}</div>
      </div>
      )
    });
  };

  renderCartTotal = () => {
    const {
      checkout:{
        cart
      },
    } = this.props;

    let cartKeys = Object.keys(cart);
    let totalCost;
    switch(cartKeys.length){
      case 0:
        totalCost = 0;
        break;
      case 1:
        const singleItem = cart[cartKeys[0]];
        totalCost = singleItem.price * singleItem.quantity;
        break;
      default:
        totalCost = cartKeys.reduce((acc, key) => {return acc + (cart[key].price * cart[key].quantity)}, 0);
        break;
    }

    if(totalCost === 0) return null;

    return (
      <div>
        Order Total $ {totalCost}
      </div>
    )
  };

  render() {
    const {
      receipt: {
        deliveryDate,
        confirmationNumber
      }
    } = this.props;

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
}

const Receipt = connect(mapStateToProps, mapDispatchToProps)(_Receipt);
export default Receipt;
