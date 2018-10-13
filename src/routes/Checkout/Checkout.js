import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToShop, goToReceipt } from '../index';
import * as checkoutActions from '../../state/routes/checkout'
import CartItem from "../../components/CartItem/CartItem";
import './Checkout.css';

const mapStateToProps = (state) => ({
  checkout: state.routes.checkout
});

const mapDispatchToProps = {
  setCheckoutState: checkoutActions.setCheckoutState,
  removeDesignFromCart: checkoutActions.removeDesignFromCart,
  changeItemQuantity: checkoutActions.changeItemQuantity,
  goToShop: goToShop,
  goToReceipt: goToReceipt
};

class _Checkout extends Component {
  static propTypes = {
    checkout: PropTypes.object.isRequired,
    setCheckoutState: PropTypes.func.isRequired,
    removeDesignFromCart: PropTypes.func.isRequired,
    changeItemQuantity: PropTypes.func.isRequired,
    goToShop: PropTypes.func.isRequired
  };


  renderCartItems = () => {
    const {
      checkout: {
        cart
      },
      changeItemQuantity,
      removeDesignFromCart
    } = this.props;

    return Object.keys(cart).map((key) =>
      <CartItem key={key}
                item={cart[key]}
                removeDesignFromCart={removeDesignFromCart}
                changeItemQuantity={changeItemQuantity}/>);
  };

  renderCartTotal = () => {
    const {
      checkout:{
        cart
      },
      goToReceipt
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
      <div id='cart-total'>
        Cart Total $ {totalCost}
        <button onClick={() => {goToReceipt()}}>Confirm Purchase</button>
      </div>
    )
  };

  render(){
    const {
      checkout:{
        cart
      },
      goToShop
    } = this.props;

    let cartKeys = Object.keys(cart);

    return (
      <div id='checkout-screen'>
        <div id='checkout-header-container'>
          <button className='no-style-button' onClick={goToShop}>
            <img id='back-button' src="./images/arrowLeft.svg"/>
            <img id='checkout-header' src='./images/title.svg'/>
          </button>
        </div>
        {(cartKeys.length < 1) ? <button id='empty-cart-button' onClick={goToShop} className='no-style-button'>CART IS EMPTY - RETURN TO SNOWROOM?</button> : null}
        <div id='cart-items'>
            {this.renderCartItems()}
        </div>
        {this.renderCartTotal()}
      </div>
    )
  }
}


const Checkout = connect(mapStateToProps, mapDispatchToProps)(_Checkout);
export default Checkout;

