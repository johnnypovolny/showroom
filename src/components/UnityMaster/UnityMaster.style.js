export const styleFunction = (props) => ({
  position: 'absolute',
  display: props.unity.isVisible && props.unityVisibleRoute ? 'block' : 'none',
  width: '100%',
  height: '100%',
  // overflow: 'hidden',
  zIndex: 0,
  background: 'transparent',
  padding: '0 0 0 0',
  margin: '0 0 0 0',
  '& canvas':{
    width: '100%',
    height: '100%'
    // left: props.unity.isVisible && props.unityVisibleRoute ? '0%' : '100%'
  }
});

