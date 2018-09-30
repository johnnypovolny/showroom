import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import UnityControls from '../../components/UnityControls/UnityControls';
import * as shopActions from '../../state/routes/shop'
import * as unityActions from '../../state/modules/unity'
import { goToCheckout } from '../index';
import { loadModel, loadTexture, sendMessage } from '../../utils/unityUtils';
import './Shop.css';

const mapStateToProps = (state) => ({
  shop: state.routes.shop,
  unity: state.unity
});

const mapDispatchToProps = {
  goToCheckout: goToCheckout,
  setShopState: shopActions.setShopState,
  setUnityControlMode: unityActions.setUnityControlMode,
  toggleUnityViewAngle: unityActions.toggleUnityViewAngle
};

class _Shop extends Component {
  static propTypes = {
    shop: PropTypes.object.isRequired,
    unity: PropTypes.object.isRequired,
    setShopState: PropTypes.func.isRequired,
    goToCheckout: PropTypes.func.isRequired,
    setUnityControlMode: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);
  }

  showDesign = (index) => {
    const {
      unity: {
        master
      },
      setShopState
    } = this.props;

    const designName = `Design${index}`;

    axios.get(`./designs/${designName}.png`, {responseType: 'arraybuffer'})
      .then((response) => {
        const imageUint8Array = new Uint8Array(response.data);
        setShopState('displayedDesignIndex', index);
        loadTexture(master, imageUint8Array, 'snowboard')
      });
  };

  componentDidMount(){
    const {
      unity: {
        master
      },
      shop: {
        displayedDesignIndex
      }
    } = this.props;

    const promises = [];

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
            distance: .1
          };
          sendMessage(master, 'SetShadows', shadowJSON);

          this.showDesign(displayedDesignIndex)
        });
    });
  }

  renderDesignChangeControls = () => {
    const {
      shop: {
        designs,
        displayedDesignIndex
      }
    } = this.props;

    const designCount = designs.length;


    return(
      <div id='design-change-controls-container'>
        <button
          className='design-change-arrow'
          onClick = {() => {
            const newIndex = displayedDesignIndex === 0 ? designCount - 1 : displayedDesignIndex - 1;
            this.showDesign(newIndex)
        }}>
          <img className='arrow-image' src="./images/left-arrow.png" alt='Left'/>
        </button>
        {
          designs.map((designIndex) =>
            <span
              key={`Design${designIndex}`}
              id={displayedDesignIndex === designIndex ? 'dot-active' : null}
              className='dot'
              onClick= { () =>
                this.showDesign(designIndex)}/>)
        }
        <button
          className='design-change-arrow'
          onClick = {() => {
            const newIndex = (displayedDesignIndex + 1) % designCount;
            this.showDesign(newIndex)
        }}>
          <img className='arrow-image' src="./images/right-arrow.png" alt='Right'/>
        </button>
      </div>
    );
  };

  render(){
    const {
      shop,
      unity,
      goToCheckout,
      setUnityControlMode,
      toggleUnityViewAngle
    } = this.props;

    return (
      <div id='shop-screen'>
        <UnityControls
          unity={unity}
          setUnityControlMode={setUnityControlMode}
          toggleUnityViewAngle={toggleUnityViewAngle}
        />
        {this.renderDesignChangeControls()}
        <button id='go-to-checkout' onClick={goToCheckout}>Checkout</button>
      </div>
    )
  }
}


const Shop = connect(mapStateToProps, mapDispatchToProps)(_Shop);
export default Shop;