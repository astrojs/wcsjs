# wcsjs

`wcsjs` is a Javascript port of Mark Calabretta's [WCSLIB](http://www.atnf.csiro.au/people/mcalabre/WCS/) using [Emscripten](https://github.com/kripken/emscripten/wiki). The library works in either NodeJS or in the browser.

## Usage

### NodeJS
    
    
    var wcs = require('wcs');
    
    var w = new wcs();
    w.init(headerString);
    var world = w.pix2sky(x, y);
    var pixcrd = w.sky2pix(ra, dec);
    

### Browser

    <script src="wcs.js" type="text/javascript"></script>
    <script type="text/javascript">
      var w = new wcs();
      w.init(headerString);
      var world = w.pix2sky(x, y);
      var pixcrd = w.sky2pix(ra, dec);
    </script>
    
