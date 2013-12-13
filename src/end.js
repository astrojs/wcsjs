  
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
    this._sky2pix = Module.cwrap('sky2pix', 'number', ['number', 'number', 'number', 'number']);
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
    
    // Allocate memory on the Emscripten heap for coordinates
    this.coordinatePtr = Module._malloc(16);
  }
  
  wcs.prototype.pix2sky = function(x, y) {
    var world;
    
    this._pix2sky(this.wcsPtr, x, y, this.coordinatePtr);
    world = new Float64Array(Module.HEAPU8.buffer, this.coordinatePtr, 2);
    
    return [world[0], world[1]];
  }
  
  wcs.prototype.sky2pix = function(ra, dec) {
    var pixcrd;
    
    this._sky2pix(this.wcsPtr, ra, dec, this.coordinatePtr);
    pixcrd = new Float64Array(Module.HEAPU8.buffer, this.coordinatePtr, 2);
    
    return [pixcrd[0], pixcrd[1]];
  }
  
  wcs.version = '0.2.0';
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = wcs;
  }
  else {
    window.wcs = wcs;
  }

}());