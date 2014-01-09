
all:
	cat bower_components/angular/angular.js bower_components/d3/d3.js wcs.js app.js > main.js
	# node_modules/.bin/uglifyjs app.js -o app.js

clean:
	rm app.js