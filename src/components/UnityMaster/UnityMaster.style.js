export const styleFunction = (props) => ({
  position: 'absolute',
  display: props.unity.isVisible && props.unityVisibleRoute ? 'block' : 'none',
  left: '10%',
  top: '10%',
  width: '80%',
  height: '80%',
  zIndex: 0
});

