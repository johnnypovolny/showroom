export const styleFunction = (props) => ({
  position: 'absolute',
  display: props.unity.isVisible && props.unityVisibleRoute ? 'block' : 'none',
  left: '10%',
  top: '10%',
  width: '80%',
  height: '80%',
  zIndex: 0,
  background: 'transparent',
  padding: '0 0 0 0',
  margin: '0 0 0 0'
});

