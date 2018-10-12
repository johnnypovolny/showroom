import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CartItem.css';

class CartItem extends Component {
  static propTypes = {
    cartItem: PropTypes.object.isRequired
  };

  render() {
    const {
      cartItem: {
        snapshotBase64
      }
    } = this.props;

    return (
      <div id="unity-controls-container">
        <img id='cartItemImage' src={snapshotBase64} alt='No file loaded'/>
      </div>
    );
  }
}

export default CartItem;