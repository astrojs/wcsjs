
build: wcslib.js
	cat src/start.js wcslib.js src/end.js > wcs.js
	node_modules/.bin/uglifyjs wcs.js -o wcs.min.js

wcslib.js: wcslib
	cd wcslib; \
	~/emscripten/emconfigure ./configure --prefix=/Users/amit/emscripten/system; \
	~/emscripten/emmake make; \
	~/emscripten/emmake make install;
	~/emscripten/emcc src/wrapper.c -lwcs -lm -o wcslib.js -s EXPORTED_FUNCTIONS="['_getWcs', '_pix2sky']";

wcslib: wcslib.tar.bz2
	tar xjf wcslib.tar.bz2
	mv wcslib-* wcslib

wcslib.tar.bz2:
	curl "ftp://ftp.atnf.csiro.au/pub/software/wcslib/wcslib.tar.bz2" -o "wcslib.tar.bz2"

clean:
	rm -rf wcslib
	rm wcslib.*
	rm wcs.js