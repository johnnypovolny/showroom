export const styleFunction = (props) => ({
  position: 'absolute',
  display: 'block',
  width: props.unity.isVisible && props.unityVisibleRoute ? '100%' : '0',
  height: props.unity.isVisible && props.unityVisibleRoute ? '100%' : '0',
  overflow: 'hidden',
  zIndex: 0,
  background: 'transparent',
  padding: '0 0 0 0',
  margin: '0 0 0 0',
  '& canvas':{
    width: props.unity.isVisible && props.unityVisibleRoute ? '100%' : '1px',
    height: props.unity.isVisible && props.unityVisibleRoute ? '100%' : '1px',
    // left: props.unity.isVisible && props.unityVisibleRoute ? '0%' : '100%'
  }
});

