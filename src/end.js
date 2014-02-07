  
  function wcs() {
    this._getWCS = Module.cwrap('getWcs', 'number', ['String', 'number']);
    this._pix2sky = Module.cwrap('pix2sky', 'number', ['number', 'number', 'number', 'number']);
    this._sky2pix = Module.cwrap('sky2pix', 'number', ['number', 'number', 'number', 'number']);
  }
  
  function string2buffer(str) {
    var buffer = new ArrayBuffer(str.length);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < str.length; i += 1) {
      view[i] = str.charCodeAt(i);
    }
    
    return buffer;
  }
  
  function splice(str1, index, remove, str2) {
    return (str1.slice(0, index) + str2 + str1.slice(index + Math.abs(remove)));
  }
  
  function toHeader(wcsObj) {
    var header = [];
    var line = "                                                                                ";
    
    for (var card in wcsObj) {
      var value = wcsObj[card];
      if (value === undefined || value === null) {
        continue;
      }
      
      if (typeof value === "string" && value !== 'T' && value !== 'F') {
        value = "'" + value + "'";
      }
      
      var entry = splice(line, 0, card.length, card);
      entry = splice(entry, 8, 1, "=");
      entry = splice(entry, 10, value.toString().length, value);
      
      header.push(entry);
    }
    
    return header.join('\n');
  }
  
  var wcsRegEx = [
    'DATE-OBS',
    'EQUINOX',
    'WCSAXES',
    'RADESYS',
    'LONPOLE',
    'LATPOLE',
    /NAXIS\d*/,
    /CTYPE\d+/,
    /CRPIX\d+/,
    /CRVAL\d+/,
    /CUNIT\d+/,
    /CDELT\d+/,
    /CD.+/,
    /PV.+/,
    /CROTA\d+/
  ];
  
  // Initialize a WCS object using either a string or object of key value pairs
  wcs.prototype.init = function(header) {
    var headerStr, nkeyrec, nHeaderBytes, headerPtr, headerHeap;
    
    if (typeof header === "object") {
      header = toHeader(header);
    }
    
    // Split the string into an array and filter based on the WCS regular expressions
    var headerArray = header.match(/.{1,80}/g);
    headerArray = headerArray.filter(function(line) {
      
      // Extract the keyword
      var keyword = line.slice(0, 8).trim();
      
      for (var i = 0; i < wcsRegEx.length; i += 1) {
        var regEx = wcsRegEx[i];
        if (keyword.match(regEx)) { return true; }
      }
      
      return false;
    });
    headerStr = headerArray.join('\n');
    
    nkeyrec = headerArray.length;
    header = string2buffer(headerStr);
    
    // Allocate string on Emscripten heap and get byte offset
    nHeaderBytes = header.byteLength;
    headerPtr = Module._malloc(nHeaderBytes);
    headerHeap = new Uint8Array(Module.HEAPU8.buffer, headerPtr, nHeaderBytes);
    headerHeap.set(new Uint8Array(header));
    
    // Allocate memory on the Emscripten heap for coordinates
    this.coordinatePtr = Module._malloc(16);
    
    // Use byte offset to pass header string to libwcs
    this.wcsPtr = this._getWCS(headerHeap.byteOffset, nkeyrec);
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
  
  wcs.version = '0.2.3';
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = wcs;
  }
  else {
    window.wcs = wcs;
  }

}());