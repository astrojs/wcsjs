
EMSCRIPTEN=$(HOME)/emscripten

build: wcslib.js
	cat src/start.js wcslib.js src/end.js > wcs.js
	node_modules/.bin/uglifyjs wcs.js -o wcs.min.js

wcslib.js: wcslib
	cd wcslib; \
	$(EMSCRIPTEN)/emconfigure ./configure --prefix=$(EMSCRIPTEN)/system; \
	$(EMSCRIPTEN)/emmake make; \
	$(EMSCRIPTEN)/emmake make install;
	$(EMSCRIPTEN)/emcc -O2 src/wrapper.c -lwcs -lm -o wcslib.js -s EXPORTED_FUNCTIONS="['_getWcs', '_pix2sky', '_sky2pix']";

wcslib: wcslib.tar.bz2
	tar xjf wcslib.tar.bz2
	mv wcslib-* wcslib

wcslib.tar.bz2:
	curl "ftp://ftp.atnf.csiro.au/pub/software/wcslib/wcslib.tar.bz2" -o "wcslib.tar.bz2"

clean:
	rm -rf wcslib
	rm wcslib.js
	rm wcs.js
	rm wcs.min.js

tests:
	gcc test/create_tests.c -lwcs -lcfitsio -lm