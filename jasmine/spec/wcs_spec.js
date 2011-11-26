
describe ("unit conversion", function () {

	var value_deg = 180;
	var value_rad = Math.PI;
	
	it ("converts degrees to radians", function () {
		expect(deg_to_rad(value_deg)).toEqual(value_rad);
	});
	
	it ("converts radians to degrees", function () {
		expect(rad_to_deg(value_rad)).toEqual(value_deg);
	});
});

describe ("pixel to sky transformations", function () {

	beforeEach(function () {

		this.addMatchers ({
			toBeCloseToElementwise: function (expected, precision) {
				if (!(precision === 0)) {
					precision = precision || 2;
				}
				var state, multiplier, length, i, actual, expected_elem;
				
				// Check that the array lengths are the same
				if (expected.length != this.actual.length) {
					throw new Error('Arrays are not the same length');
				}
				
				state = true;
				multiplier = Math.pow(10, precision);
				length = expected.length;

				for (i = 0; i < length; i += 1) {
					actual = Math.round(this.actual[i] * multiplier);
					expected_elem = Math.round(expected[i] * multiplier);
					state = expected_elem == actual;
				}

				return state;
			}
		});
	});

	it ("ARC Projection", function() {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [269.05673, -73.46830];
		
		wcs = new WCS(arc);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});
	
	it ("SIN Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [269.39151, -73.90354];

		wcs = new WCS(sin);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});	
	
	it ("TAN Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [270.33284, -72.61583];

		wcs = new WCS(tan);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});

	

});