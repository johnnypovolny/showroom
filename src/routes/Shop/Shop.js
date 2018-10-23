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

  // When shop screen mounts, load either the design that is set as the currently viewed design in the state of the shop duck,
  // or load the first design in the list of designs. Loading the design means enabling the unity main camera,
  // loading the 3D model in Unity and setting the material, then loading a texture for Unity to display on that geometry.
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

  // Latest version of Unity mandates that the camera be disabled when not displaying the unity canvas element.
  componentWillUnmount() {
    const {
      unity: {
        master
      },
      unityDisableCamera
    } = this.props;

    unityDisableCamera(master);
  }

  // Change to a different design from the list in the shop duck.
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

  // Fire off a thumbnail generation request to start the 'add to cart' process.
  addToCart = () => {
    const {
      unity: {
        master
      }
    } = this.props;

    sendMessage(master, 'genThumbnail');
  };

  // Helper function for converting binary array data into a base64 string.
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

  // Callback for unity when thumbnail generation is done. We add access the thumbnail
  // data from the heap, convert the binary array to base64, store it on the design,
  // and add that design to the shopping cart as a purchase item.
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

  // Render the arrows and dots to carousel between the different designs
  renderDesignChangeControls = () => {
    const {
      shop: {
        designs,
        displayedDesign,
      },
      setShopState
    } = this.props;

    const designCount = designs.length;
    const index = displayedDesign ? displayedDesign.index : 0;

    return (
      <div id='design-change-controls-container'>
        <button
          className='no-style-button'
          onClick={() => {
            const newIndex = index === 0 ? designCount - 1 : index - 1;

            setShopState('addedToCart', false);
            this.showDesign(designs[newIndex]);
          }}>
          <img src="./images/left-arrow.png" alt='Left' />
        </button>
        {
          designs.map((design) => (
            <span
              key={`Design${design.index}`}
              id={index === design.index ? 'dot-curr-design' : null}
              className='dot'
              onClick={() => {
                setShopState('addedToCart', false);
                this.showDesign(design);
              }} />)
          )
        }
        <button
          className='no-style-button'
          onClick={() => {
            const newIndex = (index + 1) % designCount;

            setShopState('addedToCart', false);
            this.showDesign(designs[newIndex]);
          }}>
          <img src="./images/right-arrow.png" alt='Right' />
        </button>
      </div>
    );
  };

  // Render info about the snowboard design being viewed
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
                className='no-style-button'
                id={addedToCart ? 'added-to-cart' : 'add-to-cart'}
                disabled={addedToCart}
                onClick={this.addToCart}>
                {addedToCart ? 'Added to Cart' : 'Add to Cart'}
              </button>)
        }

      </div>
    );
  };

  // Render shopping cart 'go to checkout' button and item count
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
      <button id='go-to-checkout' onClick={goToCheckout}>
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
      <div id='shop-screen' className='route'>
        <div id='shop-header-container'>
          <img src='./images/title.svg' alt='' />
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
