  
  function string2buffer(str) {
    var buffer = new ArrayBuffer(str.length);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < str.length; i += 1) {
      view[i] = str.charCodeAt(i);
    }
    
    return buffer;
  }
  
  // function toHeader(wcsObj) {
  //   var header = [];
  //   
  //   // 80 character line
  //   var line = "                                                                                ";
  //   
  //   for (var card in wcsObj) {
  //     var value = wcsObj[card];
  //     
  //     if (typeof value === "string") {
  //       console.log(value);
  //     }
  //     
  //     var entry = line.splice(0, card.length, card);
  //     entry = entry.splice(8, 1, "=");
  //     
  //     entry = entry.splice(10, value.toString().length, value);
  //     header.push(entry);
  //   }
  //   
  //   return header.join('\n');
  // }
  
  function wcs() {
    this._getWCS = Module.cwrap('getWcs', 'number', ['String', 'number']);
    this._pix2sky = Module.cwrap('pix2sky', 'number', ['number', 'number', 'number', 'number']);
    this._sky2pix = Module.cwrap('sky2pix', 'number', ['number', 'number', 'number', 'number']);
  }
  
  // // TODO: Expand on WCS keywords
  // var wcsKeywords = [
  //     'NAXIS', 'NAXIS1', 'NAXIS2', 'DATE-OBS', 'EQUINOX', 'WCSAXES', 'RADESYS',
  //     'CTYPE1', 'CRPIX1', 'CRVAL1', 'CUNIT1', 'CTYPE2', 'CRPIX2', 'CRVAL2',
  //     'CUNIT2', 'CD1_1', 'CD1_2', 'CD2_1', 'CD2_2', 'CDELT1', 'CDELT2', 'LONPOLE',
  //     'LATPOLE', 'PV2_1', 'PV2_2', 'PV2_3'];
      
  var wcsRegEx = [
    /NAXIS\d*/, 'DATE-OBS', 'EQUINOX', 'WCSAXES', 'RADESYS',
    /CTYPE\d+/, /CRPIX\d+/, /CRVAL\d+/, /CUNIT\d+/, /CDELT\d+/,
    /CD.+/, 'LONPOLE', 'LATPOLE', /PV.+/
  ];
  
  // Initialize a WCS object using either a string or object of key value pairs
  wcs.prototype.init = function(headerStr) {
    var nkeyrec, header, nHeaderBytes, headerPtr, headerHeap;
    
    // TODO: Allow init to accept objects
    if (typeof header === "object") {
      // Construct a header string from the header object, filtering based on WCS keywords
    }
    
    // Split the string into an array and filter based on the WCS regular expressions
    var headerArray = headerStr.match(/.{1,80}/g);
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
    
    nkeyrec = parseInt( (headerStr.length - 1) / 80 );
    header = string2buffer(headerStr);
    
    // Allocate string on Emscripten heap and get byte offset
    // nHeaderBytes = header.length * header.BYTES_PER_ELEMENT;
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
  
  wcs.version = '0.2.1';
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = wcs;
  }
  else {
    window.wcs = wcs;
  }

}());