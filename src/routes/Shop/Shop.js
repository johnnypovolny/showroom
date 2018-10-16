import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import UnityControls from '../../components/UnityControls/UnityControls';
import * as shopActions from '../../state/routes/shop';
import * as checkoutActions from '../../state/routes/checkout';
import * as unityActions from '../../state/modules/unity';
import * as indexActions from '../index';
import { loadModel, loadTexture, sendMessage } from '../../utils/unityUtils';
import './Shop.css';

const mapStateToProps = (state) => ({
  shop: state.routes.shop,
  checkout: state.routes.checkout,
  unity: state.unity
});

const mapDispatchToProps = {
  goToCheckout: indexActions.goToCheckout,
  setShopState: shopActions.setShopState,
  addDesignToCart: checkoutActions.addDesignToCart,
  setUnityControlMode: unityActions.setUnityControlMode,
  unityEnableCamera: unityActions.unityEnableCamera,
  unityDisableCamera: unityActions.unityDisableCamera,
  toggleUnityViewAngle: unityActions.toggleUnityViewAngle
};

class _Shop extends Component {
  static propTypes = {
    shop: PropTypes.object.isRequired,
    checkout: PropTypes.object.isRequired,
    unity: PropTypes.object.isRequired,
    setShopState: PropTypes.func.isRequired,
    addDesignToCart: PropTypes.func.isRequired,
    goToCheckout: PropTypes.func.isRequired,
    setUnityControlMode: PropTypes.func.isRequired,
    unityEnableCamera: PropTypes.func.isRequired,
    unityDisableCamera: PropTypes.func.isRequired,
    toggleUnityViewAngle: PropTypes.func.isRequired
  };

  componentDidMount() {
    window.ReceiveThumbnail = this.receiveThumbnail;
    const {
      unity: {
        master
      },
      shop: {
        designs,
        displayedDesign
      },
      unityEnableCamera
    } = this.props;

    const promises = [];

    unityEnableCamera(master);

    promises.push(axios.get('./objs/Snowboard.obj'));
    promises.push(axios.get('./objs/Snowboard.mtl'));

    Promise.all(promises).then(results => {
      const objText = results[0].data;
      const mtlText = results[1].data;
      const encoder = new TextEncoder();
      const objUnti8Array = encoder.encode(objText);
      const mtlUnti8Array = encoder.encode(mtlText);

      loadModel(master, objUnti8Array, 'snowboard', 'OBJ', mtlUnti8Array).then(() => {
        const shadowJSON = {
          enabled: true,
          distance: 0.1
        };

        sendMessage(master, 'SetShadows', shadowJSON);
        return displayedDesign ? this.showDesign(displayedDesign) : this.showDesign(designs[0]);
      });
    });
  }

  componentWillUnmount() {
    const {
      unity: {
        master
      },
      unityDisableCamera
    } = this.props;

    unityDisableCamera(master);
  }

  showDesign = (design) => {
    const {
      unity: {
        master
      },
      setShopState
    } = this.props;
    const {
      index
    } = design;

    const fileName = `Design${index}`;

    axios.get(`./designs/${fileName}.png`, { responseType: 'arraybuffer' })
      .then((response) => {
        const imageUint8Array = new Uint8Array(response.data);

        setShopState('displayedDesign', design);
        loadTexture(master, imageUint8Array, 'snowboard');
      });
  };

  addToCart = () => {
    const {
      unity: {
        master
      }
    } = this.props;

    sendMessage(master, 'genThumbnail');
  };

  unityHeapDataToBase64 = (pointer, length) => {
    const {
      unity
    } = this.props;

    const warpedArtFileArray = new Uint8Array(unity.master.Module.HEAPU8.buffer, pointer, length);
    const len = warpedArtFileArray.byteLength;
    let binary = '';

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(warpedArtFileArray[i]);
    }

    return btoa(binary);
  };

  receiveThumbnail = (pointer, length) => {
    const {
      shop: {
        displayedDesign,
      },
      unity: {
        master
      },
      addDesignToCart,
      setShopState
    } = this.props;
    const snapshot = this.unityHeapDataToBase64(pointer, length);

    sendMessage(master, 'SnapshotCancel');
    displayedDesign.snapshotBase64 = `data:image/png;base64,${snapshot}`;
    addDesignToCart(displayedDesign);
    setShopState('addedToCart', true);
    setTimeout(() => { setShopState('addedToCart', false); }, 3000);
  };

  renderDesignChangeControls = () => {
    const {
      shop: {
        designs,
        displayedDesign
      }
    } = this.props;

    const designCount = designs.length;
    const index = displayedDesign ? displayedDesign.index : 0;

    return (
      <div id='design-change-controls-container'>
        <button
          className='design-change-arrow'
          onClick={() => {
            const newIndex = index === 0 ? designCount - 1 : index - 1;

            this.showDesign(designs[newIndex]);
          }}>
          <img className='arrow-image' src="./images/left-arrow.png" alt='Left' />
        </button>
        {
          designs.map((design) => (
            <span
              key={`Design${design.index}`}
              id={index === design.index ? 'dot-active' : null}
              className='dot'
              onClick={() => this.showDesign(design)} />)
          )
        }
        <button
          className='design-change-arrow'
          onClick={() => {
            const newIndex = (index + 1) % designCount;

            this.showDesign(designs[newIndex]);
          }}>
          <img className='arrow-image' src="./images/right-arrow.png" alt='Right' />
        </button>
      </div>
    );
  };

  renderDesignDetails = () => {
    const {
      shop: {
        displayedDesign,
        addedToCart
      },
      checkout: {
        cart
      }
    } = this.props;

    if (!displayedDesign) return null;
    const {
      index,
      name,
      description,
      price
    } = displayedDesign;

    return (
      <div id='design-info'>
        <h2>{name}</h2>
        <div>{description}</div>
        <div> Online: ${price}</div>
        {
          cart[index] && !addedToCart
            ? null
            : (
              <button
                id={addedToCart ? 'added-to-cart' : 'add-to-cart'}
                className='no-style-button'
                disabled={addedToCart}
                onClick={this.addToCart}>
                {addedToCart ? 'Added to Cart' : 'Add to Cart'}
              </button>)
        }

      </div>
    );
  };

  renderCartButton() {
    const {
      checkout: {
        cart,
      },
      goToCheckout
    } = this.props;

    const cartKeys = Object.keys(cart);
    const totalItems = cartKeys.reduce((acc, key) => acc + (Number(cart[key].quantity)), 0);

    if (Object.keys(cart).length < 1) return;
    return (
      <button id='go-to-checkout' className='no-style-button' onClick={goToCheckout}>
        <img src='./images/shoppingCart.svg' alt='Checkout' />
        <span>{totalItems}</span>
      </button>
    );
  }

  render() {
    const {
      unity,
      setUnityControlMode,
      toggleUnityViewAngle
    } = this.props;

    return (
      <div id='shop-screen'>
        <div id='shop-header-container'>
          <img id='shop-header' src='./images/title.svg' alt='' />
        </div>
        <UnityControls
          unity={unity}
          setUnityControlMode={setUnityControlMode}
          toggleUnityViewAngle={toggleUnityViewAngle}
        />
        {this.renderDesignChangeControls()}
        {this.renderDesignDetails()}
        {this.renderCartButton()}
      </div>
    );
  }
}

const Shop = connect(mapStateToProps, mapDispatchToProps)(_Shop);

export default Shop;
