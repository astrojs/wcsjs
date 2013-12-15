
all:
	cat lib/d3.v3.min.js lib/wcs.js lib/main.js > app.js
	node_modules/.bin/uglifyjs app.js -o app.js

clean:
	rm app.js.gz