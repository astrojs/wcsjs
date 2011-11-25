
$(document).ready(function() {

	var x, y, ra, dec, wcs, coords;

	// Grab a few elements
	x = $('#x');
	y = $('#y');
	ra = $('#ra');
	dec = $('#dec');
	
	// Get the JSON header
	$.getJSON('example-wcs/json/1904-66_TAN.json', function(json) {
		wcs = new WCS(json);
		coords = wcs.pix_to_sky([0, 0]);		
	});

});