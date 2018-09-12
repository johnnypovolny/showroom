export const sendMessage = (unityMaster, method, data) => {
  if (data) {
    if (typeof data === 'object') unityMaster.SendMessage('JavaScript Interface', method, JSON.stringify(data));
    else if (typeof data === 'string') unityMaster.SendMessage('JavaScript Interface', method, data);
  } else {
    unityMaster.SendMessage('JavaScript Interface', method);
  }
};

export const loadTexture = (unityMaster, array, objName, width, height) => {
  // Create JSON to send to Unity
  const textureJSON = {
    name: objName,
    pointer: unityMaster.Module._malloc(array.byteLength),
    length: array.byteLength,
    width,
    height
  };

  const dataHeap = new Uint8ClampedArray(unityMaster.Module.HEAPU8.buffer, textureJSON.pointer, textureJSON.length);

  dataHeap.set(array);
  sendMessage(unityMaster, 'LoadTextureRaw', textureJSON);
  unityMaster.Module._free(imageJSON.pointer);
};

export const loadMaterial = (unityMaster, array, objName) => {
  const mtlJSON = {
    name: objName,
    pointer: unityMaster.Module._malloc(array.byteLength),
    length: array.byteLength,
  };

  const dataHeap = new Uint8Array(unityMaster.Module.HEAPU8.buffer, mtlJSON.pointer, mtlJSON.length);
  dataHeap.set(array);
  sendMessage(unityMaster, 'LoadMTL', mtlJSON);
  unityMaster.Module._free(mtlJSON.pointer);
};

export const loadModel = (unityMaster, objArray, objName, fileFormat, mtlArray) => (
  new Promise((resolve) => {
    const objJSON = {
      name: objName,
      fileFormat,
      upAxis: 'X',
      pointer: unityMaster.Module._malloc(objArray.byteLength),
      length: objArray.byteLength
    };

    const dataHeap = new Uint8Array(unityMaster.Module.HEAPU8.buffer, objJSON.pointer, objJSON.length);
    dataHeap.set(objArray);
    sendMessage(unityMaster, 'RemoveModels');
    sendMessage(unityMaster, 'LoadModel', objJSON);

    loadMaterial(unityMaster, mtlArray, objName);

    unityMaster.Module._free(objJSON.pointer);

    resolve('Loaded Model ', objName);
  })
);

