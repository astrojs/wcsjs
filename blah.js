
$(document).ready(function() {

	var x, y, ra, dec, wcs, coords;

	// Grab a few elements
	x = $('#x');
	y = $('#y');
	ra = $('#ra');
	dec = $('#dec');
	
	// Get the JSON header
	$.getJSON('ngc2967-g.json', function(json) {
		wcs = new WCS(json);
		coords = wcs.pix_to_sky([300, 200]);
		console.log(coords);
	});
	
	// x.text('x coord');
	// y.text('y coord');
	// ra.text('right ascension');
	// dec.text('declination');
	
	
});