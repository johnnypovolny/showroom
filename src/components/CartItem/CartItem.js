import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CartItem.css';

class CartItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    removeDesignFromCart: PropTypes.func.isRequired,
    changeItemQuantity: PropTypes.func.isRequired,
  };

  render() {
    const {
      item: {
        index,
        quantity,
        price,
        snapshotBase64
      },
      removeDesignFromCart,
      changeItemQuantity
    } = this.props;

    return (
      <div className='cart-item'>
        <img className='cart-item-image' src={snapshotBase64} alt='' />
        <div className='cart-item-info'>
          <div>Online Price: ${price}</div>
          <span>Quantity</span>
          <input
            type='number'
            min='1'
            value={quantity}
            onChange={(event) => { changeItemQuantity(index, event.target.value); }}
          />
          <div>Item Total: ${price * quantity}</div>
          <button
            className='remove-from-cart'
            onClick={() => { removeDesignFromCart(index); }}>
            Remove From Cart
          </button>
        </div>
      </div>
    );
  }
}

export default CartItem;
