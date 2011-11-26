
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

	var wcs, pixel, sky;
	pixel = [0, 0];
	sky = [270.33284, -72.61583];
	it ("TAN", function () {
		wcs = new WCS(tan);
		sky = wcs.pix_to_sky(pixel);
		expect(wcs.pix_to_sky(pixel)).toEqual(sky);
	});
});