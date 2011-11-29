
describe ("unit conversion", function () {

	var value_deg = 180;
	var value_rad = Math.PI;
	
	it ("converts degrees to radians", function () {
		expect(value_deg * D2R).toEqual(value_rad);
	});
	
	it ("converts radians to degrees", function () {
		expect(value_rad * R2D).toEqual(value_deg);
	});
});

describe ("Compute the cosine in units of degrees", function () {
	var angle;
	
	it ("cosine of 0 degrees", function () {
		angle = 0;
		expect(cosd(angle)).toEqual(1);
	});
	
	it ("cosine of 90 degrees", function () {
		angle = 90;
		expect(cosd(angle)).toEqual(0);
	});
	
	it ("cosine of 180 degrees", function () {
		angle = 180;
		expect(cosd(angle)).toEqual(-1);
	});
	
	it ("cosine of 270 degrees", function () {
		angle = 270;
		expect(cosd(angle)).toEqual(0);
	});
	
	it ("cosine of angle in the first quadrant", function () {
		angle = 45;
		expect(cosd(angle)).toBeCloseTo(1 / Math.sqrt(2), 14);
	});
	
	it ("cosine of angle in the second quadrant", function () {
		angle = 135;
		expect(cosd(angle)).toBeCloseTo(-1 / Math.sqrt(2), 14);
	});
	
	it ("cosine of angle in the third quadrant", function () {
		angle = 225;
		expect(cosd(angle)).toBeCloseTo(-1 / Math.sqrt(2), 14);
	});
	
	it ("cosine of angle in the fourth quadrant", function () {
		angle = 315;
		expect(cosd(angle)).toBeCloseTo(1 / Math.sqrt(2), 14);
	});
});


describe ("Compute the sine in units of degrees", function () {
	var angle;
	
	it ("sine of 0 degrees", function () {
		angle = 0;
		expect(sind(angle)).toEqual(0);
	});
	
	it ("sine of 90 degrees", function () {
		angle = 90;
		expect(sind(angle)).toEqual(1);
	});
	
	it ("sine of 180 degrees", function () {
		angle = 180;
		expect(sind(angle)).toEqual(0);
	});
	
	it ("sine of 270 degrees", function () {
		angle = 270;
		expect(sind(angle)).toEqual(-1);
	});
	
	it ("sine of angle in the first quadrant", function () {
		angle = 45;
		expect(sind(angle)).toBeCloseTo(1 / Math.sqrt(2), 14);
	});
	
	it ("sine of angle in the second quadrant", function () {
		angle = 135;
		expect(sind(angle)).toBeCloseTo(1 / Math.sqrt(2), 14);
	});
	
	it ("sine of angle in the third quadrant", function () {
		angle = 225;
		expect(sind(angle)).toBeCloseTo(-1 / Math.sqrt(2), 14);
	});
	
	it ("sine of angle in the fourth quadrant", function () {
		angle = 315;
		expect(sind(angle)).toBeCloseTo(-1 / Math.sqrt(2), 14);
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
					if (!state) {
						return state;
					}
				}

				return state;
			}
		});
	});
	
	//
	// Zenithal Projections
	//
	
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
	
	it ("STG Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [269.37826, -73.25613];

		wcs = new WCS(stg);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});	
	
	it ("TAN Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [270.33284, -72.61583];

		wcs = new WCS(tan);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});

	it ("ZEA Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [268.89430, -73.57490];

		wcs = new WCS(zea);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});

	//
	// Cylindrical Projections
	//
	it ("CYP Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [263.69301, -75.95480];
		
		wcs = new WCS(cyp);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});

	it ("CEA Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [268.44085, -73.37969];
		
		wcs = new WCS(cea);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});

	it ("CAR Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [268.47851, -73.37997];
		
		wcs = new WCS(car);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});

	it ("MER Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [268.51628, -73.38024];
		
		wcs = new WCS(mer);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});

	it ("SFL Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [268.46738, -73.50406];
		
		wcs = new WCS(sfl);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});

	it ("PAR Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [269.47944, -73.49563];
		
		wcs = new WCS(par);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});

	it ("MOL Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [270.72846, -74.16980];
		
		wcs = new WCS(mol);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});

	it ("AIT Projection", function () {
		var wcs, pix, sky;
		pix = [0, 0];
		sky = [268.56814, -73.49846];

		wcs = new WCS(ait);
		expect(wcs.pix_to_sky(pix)).toBeCloseToElementwise(sky, 5);
	});
});