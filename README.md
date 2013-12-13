# wcsjs

`wcsjs` is a port of Mark Calabretta's [WCSLIB](http://www.atnf.csiro.au/people/mcalabre/WCS/) using [Emscripten](https://github.com/kripken/emscripten/wiki)

## Usage

    var w = new wcs();
    w.init(headerString);
    var world = w.pix2sky(x, y);
