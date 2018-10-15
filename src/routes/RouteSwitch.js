import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const mapStateToProps = (state) => ({
  location: state.location
});

/**
 * General route component
 */
export const _RouteSwitch = ({ location, routes }) => {
  const RouteComponent = routes[location.type];

  if (RouteComponent) {
    return <RouteComponent location={location} />;
  }

  return null;
};

_RouteSwitch.propTypes = {
  /**
   * Route location from redux-first router
   */
  location: PropTypes.object,
  /**
   * Route object with location.type keys
   * and route component values.
   */
  routes: PropTypes.object.isRequired,
};

const RouteSwitch = connect(mapStateToProps)(_RouteSwitch);

export default RouteSwitch;
