  
  function string2buffer(str) {
    var buffer = new ArrayBuffer(str.length);
    var view = new Uint8Array(buffer);
    for (var i=0; i < str.length; i += 1) {
      view[i] = str.charCodeAt(i);
    }
    
    return view;
  }
  
  function wcs() {
    
    this._getWCS = Module.cwrap('getWcs', 'number', ['String', 'number']);
    this._pix2sky = Module.cwrap('pix2sky', 'number', ['number', 'number', 'number', 'number']);
    
  }
  
  wcs.prototype.init = function(headerStr) {
    var nkeyrec, header, nHeaderBytes, headerPtr, headerHeap;
    
    nkeyrec = (headerStr.length - 1) / 80;
    header = string2buffer(headerStr);
    
    // Allocate string on Emscripten heap and get byte offset
    nHeaderBytes = header.length * header.BYTES_PER_ELEMENT;
    headerPtr = Module._malloc(nHeaderBytes);
    
    headerHeap = new Uint8Array(Module.HEAPU8.buffer, headerPtr, nHeaderBytes);
    headerHeap.set(new Uint8Array(header.buffer));
    
    // Use byte offset to pass header string to libwcs
    this.wcsPtr = this._getWCS(headerHeap.byteOffset, nkeyrec);
  }
  
  wcs.prototype.pix2sky = function(x, y) {
    var world, nWorldBytes, worldPtr;
    
    world = new Float64Array(2);
    nWorldBytes = world.length * world.BYTES_PER_ELEMENT;
    worldPtr = Module._malloc(nWorldBytes);
    
    this._pix2sky(this.wcsPtr, x, y, worldPtr);
    world = new Float64Array(Module.HEAPU8.buffer, worldPtr, world.length);
    
    return [world[0], world[1]];
  }
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = wcs;
  }
  else {
    window.wcs = wcs;
  }

}());