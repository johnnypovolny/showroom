import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as indexActions from '../index';
import './Welcome.css';

const mapStateToProps = (state) => ({
  welcome: state.routes.welcome,
  unity: state.unity
});

const mapDispatchToProps = {
  goToShop: indexActions.goToShop
};

class _Welcome extends Component {
  static propTypes = {
    unity: PropTypes.object.isRequired,
    goToShop: PropTypes.func.isRequired,
  };

  render() {
    const {
      goToShop,
      unity: {
        isLoading
      }
    } = this.props;

    return (
      <div id='welcome-screen'>
        <img id='rider' src='./images/rider.jpg' alt='' />
        <img id='boards' src='./images/boards.png' alt='' />
        <div id='title-container'>
          <img id='title' src='./images/title.svg' alt='Snowroom' />
          {isLoading
            ? (
              <div id='loading-message'>
                <img src='./images/subtitle-loading.svg' alt='Loading' />
              </div>
            )
            : (
              <button id='start-message' className='no-style-button' onClick={goToShop}>
                <img src='./images/subtitle-start.svg' alt='Shop Decks' />
              </button>
            )
          }
        </div>
      </div>
    );
  }
}


const Welcome = connect(mapStateToProps, mapDispatchToProps)(_Welcome);

export default Welcome;
