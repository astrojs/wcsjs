var precision = 8;

describe ("CD Matrix", function () {
  it ("TAN Projection with a CD matrix", function () {

    var tanWithCD = {
      'WCSAXES': 2,
      'RADESYS': 'ICRS',
      'CTYPE1': 'RA---TAN',
      'CRPIX1': 446.000000,
      'CRVAL1': 210.801868,
      'CUNIT1': 'deg',
      'CTYPE2': 'DEC--TAN',
      'CRPIX2': 447.000000,
      'CRVAL2': 54.348171,
      'CUNIT2': 'deg',
      'CD1_1': -0.0002798094,
      'CD1_2': 0.0000156364,
      'CD2_1': 0.0000155823,
      'CD2_2': 0.0002791902
    };

    wcs = new WCS.Mapper(tanWithCD);
    coords = wcs.coordinateToPixel(210.95827, 54.24580);
    expect(coords.x).toBeCloseTo(100.000000, precision);
    expect(coords.y).toBeCloseTo(100.000000, precision);

  });
});
// 
// describe ("unit conversion", function () {
//   var value_deg = 180;
//   var value_rad = Math.PI;
// 
//   it ("converts degrees to radians", function () {
//     expect(value_deg * WCS.Math.D2R).toEqual(value_rad);
//   });
// 
//   it ("converts radians to degrees", function () {
//     expect(value_rad * WCS.Math.R2D).toEqual(value_deg);
//   });
// });
// 
// describe ("compute the determinant", function () {
//   var mat2d, mat3d, mat4d;
//   mat2d = [[1, 2], [3, 4]];
//   mat3d = [[1, 2, 3], [4, 5, 60], [7, 8, 9]];
//   mat4d = [[1, 2, 3, 4], [5, 60, 7, 8], [9, 10, 11, 120], [13, 14, 15, 16]];
// 
//   it ("should compute the determinant of a 2 by 2 matrix", function () {
//     expect(WCS.Math.determinant(mat2d)).toEqual(-2);
//   });
// 
//   it ("should compute the determinant of a 3 by 3 matrix", function () {
//     expect(WCS.Math.determinant(mat3d)).toEqual(324);
//   });
// 
//   it ("should compute the determinant of a 4 by 4 matrix", function () {
//     expect(WCS.Math.determinant(mat4d)).toEqual(139968);
//   });
// });
// 
// describe ("Compute the cosine in units of degrees", function () {
//   var angle;
// 
//   it ("cosine of 0 degrees", function () {
//     angle = 0;
//     expect(WCS.Math.cosd(angle)).toEqual(1);
//   });
// 
//   it ("cosine of 90 degrees", function () {
//     angle = 90;
//     expect(WCS.Math.cosd(angle)).toEqual(0);
//   });
// 
//   it ("cosine of 180 degrees", function () {
//     angle = 180;
//     expect(WCS.Math.cosd(angle)).toEqual(-1);
//   });
// 
//   it ("cosine of 270 degrees", function () {
//     angle = 270;
//     expect(WCS.Math.cosd(angle)).toEqual(0);
//   });
// 
//   it ("cosine of angle in the first quadrant", function () {
//     angle = 45;
//     expect(WCS.Math.cosd(angle)).toBeCloseTo(1 / Math.sqrt(2), 14);
//   });
// 
//   it ("cosine of angle in the second quadrant", function () {
//     angle = 135;
//     expect(WCS.Math.cosd(angle)).toBeCloseTo(-1 / Math.sqrt(2), 14);
//   });
// 
//   it ("cosine of angle in the third quadrant", function () {
//     angle = 225;
//     expect(WCS.Math.cosd(angle)).toBeCloseTo(-1 / Math.sqrt(2), 14);
//   });
// 
//   it ("cosine of angle in the fourth quadrant", function () {
//     angle = 315;
//     expect(WCS.Math.cosd(angle)).toBeCloseTo(1 / Math.sqrt(2), 14);
//   });
// });
// 
// describe ("Compute the sine in units of degrees", function () {
//   var angle;
// 
//   it ("sine of 0 degrees", function () {
//     angle = 0;
//     expect(WCS.Math.sind(angle)).toEqual(0);
//   });
// 
//   it ("sine of 90 degrees", function () {
//     angle = 90;
//     expect(WCS.Math.sind(angle)).toEqual(1);
//   });
// 
//   it ("sine of 180 degrees", function () {
//     angle = 180;
//     expect(WCS.Math.sind(angle)).toEqual(0);
//   });
// 
//   it ("sine of 270 degrees", function () {
//     angle = 270;
//     expect(WCS.Math.sind(angle)).toEqual(-1);
//   });
// 
//   it ("sine of angle in the first quadrant", function () {
//     angle = 45;
//     expect(WCS.Math.sind(angle)).toBeCloseTo(1 / Math.sqrt(2), 14);
//   });
// 
//   it ("sine of angle in the second quadrant", function () {
//     angle = 135;
//     expect(WCS.Math.sind(angle)).toBeCloseTo(1 / Math.sqrt(2), 14);
//   });
// 
//   it ("sine of angle in the third quadrant", function () {
//     angle = 225;
//     expect(WCS.Math.sind(angle)).toBeCloseTo(-1 / Math.sqrt(2), 14);
//   });
// 
//   it ("sine of angle in the fourth quadrant", function () {
//     angle = 315;
//     expect(WCS.Math.sind(angle)).toBeCloseTo(-1 / Math.sqrt(2), 14);
//   });
// });
// 
// describe ("reduced row echolon form (Gauss-Jordan elimination)", function () {
//   it ("should perform Gauss-Jordan elimination on a matrix", function () {
//     var matrix = [ [1, 2, 1], [-2, -3, 1], [3, 5, 0] ];
//     WCS.Math.gaussJordan(matrix);
//     // expect(true).toBeTruthy();
//   });
// });
// 
// 
// describe ("pixels to projection plane coordinates and back", function () { 
//   it ("pixels to projection plane", function () {
//     var wcs, pixels, proj;
//     pixels = [51, 41];
// 
//     wcs = new WCS.Mapper(tan);
//     proj = wcs.toIntermediate(pixels);
//     expect(proj[0]).toBeCloseTo(-21.271053914143966, precision);
//     expect(proj[1]).toBeCloseTo(2.7708695813419855, precision);
//   });
// 
//   it ("projection plane to pixels", function () {
//     var wcs, pixels, proj;
//     proj = [-21.271053914143966, 2.7708695813419855];
// 
//     wcs = new WCS.Mapper(tan);
//     pixels = wcs.fromIntermediate(proj);
//     expect(pixels[0]).toBeCloseTo(51, precision);
//     expect(pixels[1]).toBeCloseTo(41, precision);
//   });
// });
// 
// describe ("sky to pixel transformations", function () {
//  var wcs, pixels, sky, i, coords, precision;
//  precision = 4;
// 
//  beforeEach(function () {
//    pixels = [];
//    sky = [];
// 
//    pixels.push([1.0, 1.0]);
//    pixels.push([192.0, 1.0]);
//    pixels.push([1.0, 192.0]);
//    pixels.push([192.0, 192.0]);
//    pixels.push([96.5, 96.5]);
//  });
// 
//  //
//  // Zenithal Projections
//  //
//  it ("ARC Projection", function() {
// 
//    sky.push([269.05673077774, -73.46829958535]);
//    sky.push([269.46714963295, -60.73594102637]);
//    sky.push([307.01180433182, -69.29965938607]);
//    sky.push([293.06610193764, -58.19446383811]);
//    sky.push([284.90543739577, -66.30663097651]);
// 
//    wcs = new WCS.Mapper(arc);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
// 
//  it ("SIN Projection", function () {
// 
//    sky.push([268.39150699215, -73.90353552624]);
//    sky.push([269.10716399624, -60.03668870909]);
//    sky.push([307.73275850866, -69.48636458818]);
//    sky.push([293.24065113325, -57.07877059966]);
//    sky.push([284.90376923726, -66.31039234200]);
// 
//    wcs = new WCS.Mapper(sin);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
// 
//  it ("STG Projection", function () {
// 
//    sky.push([269.37825680266, -73.25613046025]);
//    sky.push([269.64574155082, -61.03602098451]);
//    sky.push([306.65846712587, -69.21034027654]);
//    sky.push([292.97934645515, -58.65820590407]);
//    sky.push([284.90625709548, -66.30490865995]);
// 
//    wcs = new WCS.Mapper(stg);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
// 
//  it ("SZP Projection", function () {
// 
//    sky.push([272.37781512101, -73.41689969644]);
//    sky.push([267.60403992873, -60.76623615082]);
//    sky.push([307.83488111027, -69.03723146289]);
//    sky.push([290.73621202629, -58.78452312823]);
//    sky.push([284.91980906467, -66.30475721459]);
// 
//    wcs = new WCS.Mapper(szp);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
// 
//  it ("TAN Projection", function () {
// 
//    sky.push([270.33283605009, -72.61583231845]);
//    sky.push([270.19465794261, -61.83923481247]);
//    sky.push([305.59026284675, -68.94388297928]);
//    sky.push([292.71201278074, -59.87298900275]);
//    sky.push([284.90874458094, -66.30003124798]);
// 
//    wcs = new WCS.Mapper(tan);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
//  
//  it ("TAN-SIP Projection", function () {
//    pixels = [];
//    pixels.push([1, 1]);
//    pixels.push([4096, 4096]);
//    
//    sky.push([22.11382770237584, -0.11318768874317654]);
//    sky.push([21.886303362025174, 0.11441692268249258]);
// 
//    wcs = new WCS.Mapper(tan_sip);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
// 
//  it ("ZEA Projection", function () {
// 
//    sky.push([268.89429694488, -73.57489559933]);
//    sky.push([269.37808163249, -60.57684091173]);
//    sky.push([307.18909348552, -69.34483973313]);
//    sky.push([293.10932896827, -57.94570137254]);
//    sky.push([284.90502664962, -66.30752029696]);
// 
//    wcs = new WCS.Mapper(zea);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
//  
//  //
//  //  Cylindrical Projections
//  //
//  
//  it ("CYP Projection", function () {
//    
//    sky.push([263.69300640788, -75.95480262512]);
//    sky.push([267.11650280878, -57.99620775699]);
//    sky.push([314.47700550214, -70.78754655132]);
//    sky.push([294.10767800687, -55.63518650347]);
//    sky.push([284.89605048654, -66.32061940296]);
//    
//    wcs = new WCS.Mapper(cyp);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
//  
//  it ("CEA Projection", function () {
//    
//    sky.push([268.44085265462, -73.37969380549]);
//    sky.push([269.09024385942, -60.64908874812]);
//    sky.push([307.52044819239, -69.38302901111]);
//    sky.push([294.13191054912, -58.36209566279]);
//    sky.push([284.90109941802, -66.30599022330]);
//    
//    wcs = new WCS.Mapper(cea);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
// 
//  it ("CAR Projection", function () {
//    
//    sky.push([268.47850587888, -73.37997130772]);
//    sky.push([269.11222126114, -60.64923604906]);
//    sky.push([307.32299968118, -69.43277061051]);
//    sky.push([293.97962362308, -58.39244690857]);
//    sky.push([284.90153565747, -66.30594750654]);
//    
//    wcs = new WCS.Mapper(car);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
// 
//  it ("MER Projection", function () {
// 
//    sky.push([268.51628090050, -73.38024288395]);
//    sky.push([269.13426924501, -60.64938020277]);
//    sky.push([307.13073648219, -69.48077163725]);
//    sky.push([293.83175889043, -58.42169429877]);
//    sky.push([284.90196957302, -66.30590501598]);
//    
//    wcs = new WCS.Mapper(mer);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
// 
//  it ("SFL Projection", function () {
//    
//    sky.push([268.46737987111, -73.50405652146]);
//    sky.push([269.10879603428, -60.77298321216]);
//    sky.push([306.90291088836, -69.22328916258]);
//    sky.push([293.61495994868, -57.87845261548]);
//    sky.push([284.90245830848, -66.30746896901]);
//    
//    wcs = new WCS.Mapper(sfl);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
// 
//  it ("PAR Projection", function () {
//    
//    sky.push([269.47944138196, -73.49563038873]);
//    sky.push([269.69722708408, -60.76256251520]);
//    sky.push([306.32989302475, -69.41721246570]);
//    sky.push([293.18212343779, -58.05648713597]);
//    sky.push([284.90591012398, -66.30689603965]);
//    
//    wcs = new WCS.Mapper(par);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
// 
//  it ("MOL Projection", function () {
//    
//    sky.push([270.72846180802, -74.16980073050]);
//    sky.push([270.39774981058, -60.02718873940]);
//    sky.push([306.84442527764, -70.24462868694]);
//    sky.push([292.26796386222, -57.66494958439]);
//    sky.push([284.91211049555, -66.30961122414]);
//    
//    wcs = new WCS.Mapper(mol);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
// 
//  it ("AIT Projection", function () {
//    
//    sky.push([268.56813922636, -73.49845984257]);
//    sky.push([269.17359044102, -60.70174516331]);
//    sky.push([307.08620023155, -69.28342195718]);
//    sky.push([293.58502491896, -57.98593060648]);
//    sky.push([284.90284110443, -66.30720454723]);
// 
//    wcs = new WCS.Mapper(ait);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.coordinateToPixel(sky[i][0], sky[i][1]);
//      expect(coords.x).toBeCloseTo(pixels[i][0], precision);
//      expect(coords.y).toBeCloseTo(pixels[i][1], precision);
//    }
//  });
//  
// });
// 
// describe ("pixel to sky transformations", function () {
//  var wcs, pixels, sky, i, coords;
//  
//  beforeEach(function () {
//    pixels = [];
//    sky = [];
//    
//    pixels.push([1.0, 1.0]);
//    pixels.push([192.0, 1.0]);
//    pixels.push([1.0, 192.0]);
//    pixels.push([192.0, 192.0]);
//    pixels.push([96.5, 96.5]);
//  });
//  
//  //
//  // Zenithal Projections
//  //
//  
//  it ("ARC Projection", function() {
// 
//    sky.push([269.05673077774, -73.46829958535]);
//    sky.push([269.46714963295, -60.73594102637]);
//    sky.push([307.01180433182, -69.29965938607]);
//    sky.push([293.06610193764, -58.19446383811]);
//    sky.push([284.90543739577, -66.30663097651]);
// 
//    wcs = new WCS.Mapper(arc);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
// 
//  it ("SIN Projection", function () {
// 
//    sky.push([268.39150699215, -73.90353552624]);
//    sky.push([269.10716399624, -60.03668870909]);
//    sky.push([307.73275850866, -69.48636458818]);
//    sky.push([293.24065113325, -57.07877059966]);
//    sky.push([284.90376923726, -66.31039234200]);
// 
//    wcs = new WCS.Mapper(sin);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
//  
//  it ("STG Projection", function () {
//    
//    sky.push([269.37825680266, -73.25613046025]);
//    sky.push([269.64574155082, -61.03602098451]);
//    sky.push([306.65846712587, -69.21034027654]);
//    sky.push([292.97934645515, -58.65820590407]);
//    sky.push([284.90625709548, -66.30490865995]);
// 
//    wcs = new WCS.Mapper(stg);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  }); 
//  
//     it ("TAN Projection", function () {
//    
//    sky.push([270.33283605009, -72.61583231845]);
//    sky.push([270.19465794261, -61.83923481247]);
//    sky.push([305.59026284675, -68.94388297928]);
//    sky.push([292.71201278074, -59.87298900275]);
//    sky.push([284.90874458094, -66.30003124798]);
// 
//    wcs = new WCS.Mapper(tan);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
//  
// 
//  it ("TAN-SIP Projection", function () {
//    
//    sky.push([22.11382770238, -0.11318768874]);
//    sky.push([22.10321365267, -0.11318593269]);
//    sky.push([22.11382984083, -0.10257342920]);
//    sky.push([22.10321579501, -0.10257167333]);
//    sky.push([22.10852174767, -0.10787968141]);
// 
//    wcs = new WCS.Mapper(tan_sip);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], 6);
//      expect(coords.dec).toBeCloseTo(sky[i][1], 6);
//    }
//  });
//  
// 
//  it ("ZEA Projection", function () {
// 
//    sky.push([268.89429694488, -73.57489559933]);
//    sky.push([269.37808163249, -60.57684091173]);
//    sky.push([307.18909348552, -69.34483973313]);
//    sky.push([293.10932896827, -57.94570137254]);
//    sky.push([284.90502664962, -66.30752029696]);
// 
//    wcs = new WCS.Mapper(zea);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
// 
//  //
//  // Cylindrical Projections
//  //
//  it ("CYP Projection", function () {
//    
//    sky.push([263.69300640788, -75.95480262512]);
//    sky.push([267.11650280878, -57.99620775699]);
//    sky.push([314.47700550214, -70.78754655132]);
//    sky.push([294.10767800687, -55.63518650347]);
//    sky.push([284.89605048654, -66.32061940296]);
//    
//    wcs = new WCS.Mapper(cyp);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
// 
//  it ("CEA Projection", function () {
//    
//    sky.push([268.44085265462, -73.37969380549]);
//    sky.push([269.09024385942, -60.64908874812]);
//    sky.push([307.52044819239, -69.38302901111]);
//    sky.push([294.13191054912, -58.36209566279]);
//    sky.push([284.90109941802, -66.30599022330]);
//    
//    wcs = new WCS.Mapper(cea);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
// 
//  it ("CAR Projection", function () {
//    
//    sky.push([268.47850587888, -73.37997130772]);
//    sky.push([269.11222126114, -60.64923604906]);
//    sky.push([307.32299968118, -69.43277061051]);
//    sky.push([293.97962362308, -58.39244690857]);
//    sky.push([284.90153565747, -66.30594750654]);
//    
//    wcs = new WCS.Mapper(car);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
// 
//  it ("MER Projection", function () {
// 
//    sky.push([268.51628090050, -73.38024288395]);
//    sky.push([269.13426924501, -60.64938020277]);
//    sky.push([307.13073648219, -69.48077163725]);
//    sky.push([293.83175889043, -58.42169429877]);
//    sky.push([284.90196957302, -66.30590501598]);
//    
//    wcs = new WCS.Mapper(mer);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
// 
//  it ("SFL Projection", function () {
//    
//    sky.push([268.46737987111, -73.50405652146]);
//    sky.push([269.10879603428, -60.77298321216]);
//    sky.push([306.90291088836, -69.22328916258]);
//    sky.push([293.61495994868, -57.87845261548]);
//    sky.push([284.90245830848, -66.30746896901]);
//    
//    wcs = new WCS.Mapper(sfl);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
// 
//  it ("PAR Projection", function () {
//    
//    sky.push([269.47944138196, -73.49563038873]);
//    sky.push([269.69722708408, -60.76256251520]);
//    sky.push([306.32989302475, -69.41721246570]);
//    sky.push([293.18212343779, -58.05648713597]);
//    sky.push([284.90591012398, -66.30689603965]);
//    
//    wcs = new WCS.Mapper(par);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
// 
//  it ("MOL Projection", function () {
//    
//    sky.push([270.72846180802, -74.16980073050]);
//    sky.push([270.39774981058, -60.02718873940]);
//    sky.push([306.84442527764, -70.24462868694]);
//    sky.push([292.26796386222, -57.66494958439]);
//    sky.push([284.91211049555, -66.30961122414]);
//    
//    wcs = new WCS.Mapper(mol);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
// 
//  it ("AIT Projection", function () {
//    
//    sky.push([268.56813922636, -73.49845984257]);
//    sky.push([269.17359044102, -60.70174516331]);
//    sky.push([307.08620023155, -69.28342195718]);
//    sky.push([293.58502491896, -57.98593060648]);
//    sky.push([284.90284110443, -66.30720454723]);
// 
//    wcs = new WCS.Mapper(ait);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
//  
//  //
//  // Conic Projections
//  //
//  it ("COP Projection", function () {
// 
//    sky.push([266.18968688018, -74.06989101020]);
//    sky.push([267.67691932876, -60.11053528952]);
//    sky.push([309.80345421720, -69.59935740589]);
//    sky.push([294.34194790408, -57.41606027287]);
//    sky.push([284.89656549659, -66.31056875328]);
// 
//    wcs = new WCS.Mapper(cop);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
//  
//  it ("COE Projection", function () {
//    
//    sky.push([271.44128301857, -73.70751697051]);
//    sky.push([268.76574791137, -60.13167786929]);
//    sky.push([308.21225420950, -69.76392246655]);
//    sky.push([292.58828377403, -58.33066976145]);
//    sky.push([284.91215318896, -66.30650273043]);
//    
//    wcs = new WCS.Mapper(coe);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
//  
//  it ("COD Projection", function () {
// 
//    sky.push([267.30957853599, -74.13710817538]);
//    sky.push([269.35196969676, -60.38022869447]);
//    sky.push([307.69256427630, -69.93150666907]);
//    sky.push([294.13212798941, -57.41928223106]);
//    sky.push([284.89946477515, -66.31058316212]);
// 
//    wcs = new WCS.Mapper(cod);
//    for (i = 0; i < pixels.length; i += 1) {
//      coords = wcs.pixelToCoordinate(pixels[i]);
//      expect(coords.ra).toBeCloseTo(sky[i][0], precision);
//      expect(coords.dec).toBeCloseTo(sky[i][1], precision);
//    }
//  });
//  
// });
