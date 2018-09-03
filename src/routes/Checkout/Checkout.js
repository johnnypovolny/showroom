import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as checkoutActions from '../../state/routes/checkout'
import './Checkout.css';

const mapStateToProps = (state) => ({
  checkout: state.routes.checkout
});

const mapDispatchToProps = {
  setCheckoutState: checkoutActions.setCheckoutState
};

class _Checkout extends Component {
  static propTypes = {
    setCheckoutState: PropTypes.func.isRequired
  };

  render(){
    const {
      checkout
    } = this.props;

    return (
      <div id='checkout-screen'>
        CHECKOUT
      </div>
    )
  }
}


const Checkout = connect(mapStateToProps, mapDispatchToProps)(_Checkout);
export default Checkout;