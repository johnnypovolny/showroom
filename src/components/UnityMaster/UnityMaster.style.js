export const styleFunction = (props) => ({
  position: 'absolute',
  display: props.unity.isVisible && props.unityVisibleRoute ? 'block' : 'none',
  width: '100%',
  height: '100%',
  zIndex: 0,
  background: 'transparent',
  padding: '0 0 0 0',
  margin: '0 0 0 0',
  '& canvas': {
    width: '100%',
    height: '100%'
  }
});
