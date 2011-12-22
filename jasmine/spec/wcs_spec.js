
describe ("initialize WCS Mapper object", function () {
	
	it ("should initialize a WCS Mapper object", function () {
		var wcs;
		wcs = new WCS.Mapper(tan);
		console.log(wcs);
	});
});

describe ("unit conversion", function () {

	var value_deg = 180;
	var value_rad = Math.PI;
	
	it ("converts degrees to radians", function () {
		expect(value_deg * WCS.Math.D2R).toEqual(value_rad);
	});
	
	it ("converts radians to degrees", function () {
		expect(value_rad * WCS.Math.R2D).toEqual(value_deg);
	});
});

describe ("Compute the cosine in units of degrees", function () {
	var angle;
	
	it ("cosine of 0 degrees", function () {
		angle = 0;
		expect(WCS.Math.cosd(angle)).toEqual(1);
	});
	
	it ("cosine of 90 degrees", function () {
		angle = 90;
		expect(WCS.Math.cosd(angle)).toEqual(0);
	});
	
	it ("cosine of 180 degrees", function () {
		angle = 180;
		expect(WCS.Math.cosd(angle)).toEqual(-1);
	});
	
	it ("cosine of 270 degrees", function () {
		angle = 270;
		expect(WCS.Math.cosd(angle)).toEqual(0);
	});
	
	it ("cosine of angle in the first quadrant", function () {
		angle = 45;
		expect(WCS.Math.cosd(angle)).toBeCloseTo(1 / Math.sqrt(2), 14);
	});
	
	it ("cosine of angle in the second quadrant", function () {
		angle = 135;
		expect(WCS.Math.cosd(angle)).toBeCloseTo(-1 / Math.sqrt(2), 14);
	});
	
	it ("cosine of angle in the third quadrant", function () {
		angle = 225;
		expect(WCS.Math.cosd(angle)).toBeCloseTo(-1 / Math.sqrt(2), 14);
	});
	
	it ("cosine of angle in the fourth quadrant", function () {
		angle = 315;
		expect(WCS.Math.cosd(angle)).toBeCloseTo(1 / Math.sqrt(2), 14);
	});
});


describe ("Compute the sine in units of degrees", function () {
	var angle;
	
	it ("sine of 0 degrees", function () {
		angle = 0;
		expect(WCS.Math.sind(angle)).toEqual(0);
	});
	
	it ("sine of 90 degrees", function () {
		angle = 90;
		expect(WCS.Math.sind(angle)).toEqual(1);
	});
	
	it ("sine of 180 degrees", function () {
		angle = 180;
		expect(WCS.Math.sind(angle)).toEqual(0);
	});
	
	it ("sine of 270 degrees", function () {
		angle = 270;
		expect(WCS.Math.sind(angle)).toEqual(-1);
	});
	
	it ("sine of angle in the first quadrant", function () {
		angle = 45;
		expect(WCS.Math.sind(angle)).toBeCloseTo(1 / Math.sqrt(2), 14);
	});
	
	it ("sine of angle in the second quadrant", function () {
		angle = 135;
		expect(WCS.Math.sind(angle)).toBeCloseTo(1 / Math.sqrt(2), 14);
	});
	
	it ("sine of angle in the third quadrant", function () {
		angle = 225;
		expect(WCS.Math.sind(angle)).toBeCloseTo(-1 / Math.sqrt(2), 14);
	});
	
	it ("sine of angle in the fourth quadrant", function () {
		angle = 315;
		expect(WCS.Math.sind(angle)).toBeCloseTo(-1 / Math.sqrt(2), 14);
	});
});

describe ("pixels to projection plane coordinates and back", function () {
	
	it ("pixels to projection plane", function () {
		var pixels;
		pixels = [50, 40];
		
		wcs = new WCS.Mapper(tan);
		proj = wcs.to_intermediate(pixels);
		expect(proj[0]).toBeCloseTo(-21.271053914143966, 8);
		expect(proj[1]).toBeCloseTo(2.7708695813419855, 8);
	});
	
	it ("projection plane to pixels", function () {
		var proj;
		proj = [-21.271053914143966, 2.7708695813419855];
		wcs = new WCS.Mapper(tan);
		pixels = wcs.from_intermediate(proj);
		expect(pixels[0]).toBeCloseTo(50, 8);
		expect(pixels[1]).toBeCloseTo(40, 8);
	});

});

describe ("sky to pixel transformations", function () {
	
	//
	// Zenithal Projections
	//
	it ("ARC Projection", function() {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];
		
		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);

		sky.push([269.05673077774, -73.46829958535]);
		sky.push([269.46714963295, -60.73594102637]);
		sky.push([307.01180433182, -69.29965938607]);
		sky.push([293.06610193764, -58.19446383811]);
		sky.push([284.90543739577, -66.30663097651]);

		wcs = new WCS.Mapper(arc);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
			expect(coords.x).toBeCloseTo(pixels[i][0], 8);
			expect(coords.y).toBeCloseTo(pixels[i][1], 8);
		}
	});
	
	it ("TAN Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);
		
		sky.push([270.33283605009, -72.61583231845]);
		sky.push([270.19465794261, -61.83923481247]);
		sky.push([305.59026284675, -68.94388297928]);
		sky.push([292.71201278074, -59.87298900275]);
		sky.push([284.90874458094, -66.30003124798]);

		wcs = new WCS.Mapper(tan);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
			expect(coords.x).toBeCloseTo(pixels[i][0], 8);
			expect(coords.y).toBeCloseTo(pixels[i][1], 8);
		}
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
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];
		
		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);

		sky.push([269.05673077774, -73.46829958535]);
		sky.push([269.46714963295, -60.73594102637]);
		sky.push([307.01180433182, -69.29965938607]);
		sky.push([293.06610193764, -58.19446383811]);
		sky.push([284.90543739577, -66.30663097651]);

		wcs = new WCS.Mapper(arc);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});

	it ("SIN Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);

		sky.push([268.39150699215, -73.90353552624]);
		sky.push([269.10716399624, -60.03668870909]);
		sky.push([307.73275850866, -69.48636458818]);
		sky.push([293.24065113325, -57.07877059966]);
		sky.push([284.90376923726, -66.31039234200]);

		wcs = new WCS.Mapper(sin);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});
	
	it ("STG Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);
		
		sky.push([269.37825680266, -73.25613046025]);
		sky.push([269.64574155082, -61.03602098451]);
		sky.push([306.65846712587, -69.21034027654]);
		sky.push([292.97934645515, -58.65820590407]);
		sky.push([284.90625709548, -66.30490865995]);

		wcs = new WCS.Mapper(stg);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});	
	
	it ("TAN Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);
		
		sky.push([270.33283605009, -72.61583231845]);
		sky.push([270.19465794261, -61.83923481247]);
		sky.push([305.59026284675, -68.94388297928]);
		sky.push([292.71201278074, -59.87298900275]);
		sky.push([284.90874458094, -66.30003124798]);

		wcs = new WCS.Mapper(tan);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});

	it ("ZEA Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);

		sky.push([268.89429694488, -73.57489559933]);
		sky.push([269.37808163249, -60.57684091173]);
		sky.push([307.18909348552, -69.34483973313]);
		sky.push([293.10932896827, -57.94570137254]);
		sky.push([284.90502664962, -66.30752029696]);

		wcs = new WCS.Mapper(zea);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});

	//
	// Cylindrical Projections
	//
	it ("CYP Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);
		
		sky.push([263.69300640788, -75.95480262512]);
		sky.push([267.11650280878, -57.99620775699]);
		sky.push([314.47700550214, -70.78754655132]);
		sky.push([294.10767800687, -55.63518650347]);
		sky.push([284.89605048654, -66.32061940296]);
		
		wcs = new WCS.Mapper(cyp);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});

	it ("CEA Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);
		
		sky.push([268.44085265462, -73.37969380549]);
		sky.push([269.09024385942, -60.64908874812]);
		sky.push([307.52044819239, -69.38302901111]);
		sky.push([294.13191054912, -58.36209566279]);
		sky.push([284.90109941802, -66.30599022330]);
		
		wcs = new WCS.Mapper(cea);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});

	it ("CAR Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);
		
		sky.push([268.47850587888, -73.37997130772]);
		sky.push([269.11222126114, -60.64923604906]);
		sky.push([307.32299968118, -69.43277061051]);
		sky.push([293.97962362308, -58.39244690857]);
		sky.push([284.90153565747, -66.30594750654]);
		
		wcs = new WCS.Mapper(car);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});

	it ("MER Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);
		
		sky.push([268.51628090050, -73.38024288395]);
		sky.push([269.13426924501, -60.64938020277]);
		sky.push([307.13073648219, -69.48077163725]);
		sky.push([293.83175889043, -58.42169429877]);
		sky.push([284.90196957302, -66.30590501598]);
		
		wcs = new WCS.Mapper(mer);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});

	it ("SFL Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);
		
		sky.push([268.46737987111, -73.50405652146]);
		sky.push([269.10879603428, -60.77298321216]);
		sky.push([306.90291088836, -69.22328916258]);
		sky.push([293.61495994868, -57.87845261548]);
		sky.push([284.90245830848, -66.30746896901]);
		
		wcs = new WCS.Mapper(sfl);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});

	it ("PAR Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);
		
		sky.push([269.47944138196, -73.49563038873]);
		sky.push([269.69722708408, -60.76256251520]);
		sky.push([306.32989302475, -69.41721246570]);
		sky.push([293.18212343779, -58.05648713597]);
		sky.push([284.90591012398, -66.30689603965]);
		
		wcs = new WCS.Mapper(par);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});

	it ("MOL Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);
		
		sky.push([270.72846180802, -74.16980073050]);
		sky.push([270.39774981058, -60.02718873940]);
		sky.push([306.84442527764, -70.24462868694]);
		sky.push([292.26796386222, -57.66494958439]);
		sky.push([284.91211049555, -66.30961122414]);
		
		wcs = new WCS.Mapper(mol);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});

	it ("AIT Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);
		
		sky.push([268.56813922636, -73.49845984257]);
		sky.push([269.17359044102, -60.70174516331]);
		sky.push([307.08620023155, -69.28342195718]);
		sky.push([293.58502491896, -57.98593060648]);
		sky.push([284.90284110443, -66.30720454723]);

		wcs = new WCS.Mapper(ait);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});
	
	//
	// Conic Projections
	//
	it ("COP Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);

		sky.push([266.18968688018, -74.06989101020]);
		sky.push([267.67691932876, -60.11053528952]);
		sky.push([309.80345421720, -69.59935740589]);
		sky.push([294.34194790408, -57.41606027287]);
		sky.push([284.89656549659, -66.31056875328]);

		wcs = new WCS.Mapper(cop);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});
	
	it ("COD Projection", function () {
		var wcs, pixels, sky, i, coords;
		pixels = [];
		sky = [];

		pixels.push([0.0, 0.0]);
		pixels.push([191.0, 0.0]);
		pixels.push([0.0, 191.0]);
		pixels.push([191.0, 191.0]);
		pixels.push([95.5, 95.5]);

		sky.push([267.30957853599, -74.13710817538]);
		sky.push([269.35196969676, -60.38022869447]);
		sky.push([307.69256427630, -69.93150666907]);
		sky.push([294.13212798941, -57.41928223106]);
		sky.push([284.89946477515, -66.31058316212]);

		wcs = new WCS.Mapper(cod);
		for (i = 0; i < pixels.length; i += 1) {
			coords = wcs.pixelToCoordinate(pixels[i]);
			expect(coords.ra).toBeCloseTo(sky[i][0], 8);
			expect(coords.dec).toBeCloseTo(sky[i][1], 8);
		}
	});	
	
});