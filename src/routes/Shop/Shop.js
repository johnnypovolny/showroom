import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as shopActions from '../../state/routes/shop'
import './Shop.css';

const mapStateToProps = (state) => ({
  shop: state.routes.shop
});

const mapDispatchToProps = {
  setShopState: shopActions.setShopState
};

class _Shop extends Component {
  static propTypes = {
    setShopState: PropTypes.func.isRequired
  };

  render(){
    const {
      shop
    } = this.props;

    return (
      <div id='shop-screen'>
        SHOP
      </div>
    )
  }
}


const Shop = connect(mapStateToProps, mapDispatchToProps)(_Shop);
export default Shop;