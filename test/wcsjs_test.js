'use strict';

var fs = require('fs');
var path = require('path');
var wcs = require('../wcs.js');

exports['wcsjs_init'] = {
  
  setUp: function(done) {
    this.header = {
      "SIMPLE": "T",
      "BITPIX": -32,
      "NAXIS": 2,
      "NAXIS1": 192,
      "NAXIS2": 192,
      "BUNIT": "JY/BEAM",
      "CTYPE1": "RA---TAN",
      "CRPIX1": -268.0658087122,
      "CDELT1": -0.06666666666667,
      "CRVAL1": 0.0,
      "CTYPE2": "DEC--TAN",
      "CRPIX2": -0.5630437201085,
      "CDELT2": 0.06666666666667,
      "CRVAL2": -90.0,
      "LONPOLE": 180.0,
      "LATPOLE": -90.0,
      "EQUINOX": 2000.0,
      "BMAJ": 0.2399999936422,
      "BMIN": 0.2399999936422,
      "BPA": 0.0,
      "RESTFRQ": 1420405750.0,
    };
    done();
  },
  
  'can initialize from JSON description': function(test) {
    
    var w = new wcs();
    w.init(this.header);
    
    var world = w.pix2sky(0, 0);
    world = world.map(function(d) { return d.toFixed(6); });
    
    test.equal(world[0], 270.120344);
    test.equal(world[1], -72.676808);
    
    test.done();
  }
  
};

exports['wcsjs_test'] = {
  setUp: function(done) {
    done();
  },
  
  'HIGAL_BLUE0671p118_070_RM': function(test) {
    var header, w, world, pixel;
    
    header = fs.readFileSync(path.join(__dirname, 'data', 'HIGAL_BLUE0671p118_070_RM'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 67.257713);
    test.equal(world[1].toFixed(6), 1.052640);
    
    pixel = w.sky2pix(67.257713, 1.052640);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 67.236392);
    test.equal(world[1].toFixed(6), 1.086416);
    
    pixel = w.sky2pix(67.236392, 1.086416);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 67.217739);
    test.equal(world[1].toFixed(6), 1.139741);
    
    pixel = w.sky2pix(67.217739, 1.139741);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);

    test.done();
  },
  
  'PlanckMap_308.235996_-22.010959_1.0_1': function(test) {
    var header, w, world, pixel;
    
    header = fs.readFileSync(path.join(__dirname, 'data', 'PlanckMap_308.235996_-22.010959_1.0_1.0_030_1024_nominal'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 308.786276);
    test.equal(world[1].toFixed(6), -22.518388);
    
    pixel = w.sky2pix(308.786276, -22.518388);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 308.352746);
    test.equal(world[1].toFixed(6), -21.885915);
    
    pixel = w.sky2pix(308.352746, -21.885915);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 307.977378);
    test.equal(world[1].toFixed(6), -20.885732);
    
    pixel = w.sky2pix(307.977378, -20.885732);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
    
    test.done();
  },
  
  'AIR': function(test) {
    var header, w, world, pixel;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_AIR'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 267.965502);
    test.equal(world[1].toFixed(6), -73.736378);

    pixel = w.sky2pix(267.965502, -73.736378);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.539194);
    test.equal(world[1].toFixed(6), -71.973910);

    pixel = w.sky2pix(276.539194, -71.973910);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.770534);
    test.equal(world[1].toFixed(6), -69.677946);

    pixel = w.sky2pix(287.770534, -69.677946);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);

    test.done();
  },

  'AIT': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_AIT'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.327518);
    test.equal(world[1].toFixed(6), -73.563438);
  
    pixel = w.sky2pix(268.327518, -73.563438);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.600858);
    test.equal(world[1].toFixed(6), -71.844700);
  
    pixel = w.sky2pix(276.600858, -71.844700);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.570468);
    test.equal(world[1].toFixed(6), -69.601320);
  
    pixel = w.sky2pix(287.570468, -69.601320);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'ARC': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_ARC'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.820971);
    test.equal(world[1].toFixed(6), -73.533720);
  
    pixel = w.sky2pix(268.820971, -73.533720);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.927124);
    test.equal(world[1].toFixed(6), -71.804385);
  
    pixel = w.sky2pix(276.927124, -71.804385);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.654957);
    test.equal(world[1].toFixed(6), -69.575203);
  
    pixel = w.sky2pix(287.654957, -69.575203);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'AZP': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_AZP'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 272.215089);
    test.equal(world[1].toFixed(6), -73.083170);
  
    pixel = w.sky2pix(272.215089, -73.083170);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 278.736450);
    test.equal(world[1].toFixed(6), -71.418345);
  
    pixel = w.sky2pix(278.736450, -71.418345);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.567992);
    test.equal(world[1].toFixed(6), -69.516228);
  
    pixel = w.sky2pix(287.567992, -69.516228);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'BON': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_BON'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 273.211114);
    test.equal(world[1].toFixed(6), -73.695481);
  
    pixel = w.sky2pix(273.211114, -73.695481);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 280.058990);
    test.equal(world[1].toFixed(6), -71.806125);
  
    pixel = w.sky2pix(280.058990, -71.806125);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 289.642880);
    test.equal(world[1].toFixed(6), -69.418047);
  
    pixel = w.sky2pix(289.642880, -69.418047);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'CAR': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_CAR'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.238659);
    test.equal(world[1].toFixed(6), -73.444781);
  
    pixel = w.sky2pix(268.238659, -73.444781);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.497144);
    test.equal(world[1].toFixed(6), -71.742625);
  
    pixel = w.sky2pix(276.497144, -71.742625);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.525496);
    test.equal(world[1].toFixed(6), -69.577629);
  
    pixel = w.sky2pix(287.525496, -69.577629);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'CEA': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_CEA'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.200859);
    test.equal(world[1].toFixed(6), -73.444460);
  
    pixel = w.sky2pix(268.200859, -73.444460);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.464298);
    test.equal(world[1].toFixed(6), -71.743735);
  
    pixel = w.sky2pix(276.464298, -71.743735);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.526504);
    test.equal(world[1].toFixed(6), -69.577525);
  
    pixel = w.sky2pix(287.526504, -69.577525);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'COD': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_COD'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 267.043666);
    test.equal(world[1].toFixed(6), -74.207814);
  
    pixel = w.sky2pix(267.043666, -74.207814);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 275.939691);
    test.equal(world[1].toFixed(6), -72.336226);
  
    pixel = w.sky2pix(275.939691, -72.336226);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.411910);
    test.equal(world[1].toFixed(6), -69.934557);
  
    pixel = w.sky2pix(287.411910, -69.934557);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'COE': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_COE'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 271.241993);
    test.equal(world[1].toFixed(6), -73.779365);
  
    pixel = w.sky2pix(271.241993, -73.779365);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 278.398897);
    test.equal(world[1].toFixed(6), -71.930463);
  
    pixel = w.sky2pix(278.398897, -71.930463);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 288.331976);
    test.equal(world[1].toFixed(6), -69.726583);
  
    pixel = w.sky2pix(288.331976, -69.726583);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'COO': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_COO'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 266.164212);
    test.equal(world[1].toFixed(6), -74.241274);
  
    pixel = w.sky2pix(266.164212, -74.241274);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 275.722354);
    test.equal(world[1].toFixed(6), -72.386914);
  
    pixel = w.sky2pix(275.722354, -72.386914);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 288.104664);
    test.equal(world[1].toFixed(6), -69.919521);
  
    pixel = w.sky2pix(288.104664, -69.919521);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'COP': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_COP'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 265.905403);
    test.equal(world[1].toFixed(6), -74.138576);
  
    pixel = w.sky2pix(265.905403, -74.138576);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 275.495937);
    test.equal(world[1].toFixed(6), -72.324989);
  
    pixel = w.sky2pix(275.495937, -72.324989);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.940427);
    test.equal(world[1].toFixed(6), -69.925222);
  
    pixel = w.sky2pix(287.940427, -69.925222);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  // 'CSC': function(test) {
  //   var header, w, world, pixel;
  // 
  //   header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_CSC'), 'utf8');
  //   w = new wcs();
  //   w.init(header);
  // 
  //   world = w.pix2sky(0, 0);
  //   test.equal(world[0].toFixed(6), 271.443713);
  //   test.equal(world[1].toFixed(6), -73.231276);
  // 
  //   pixel = w.sky2pix(271.443713, -73.231276);
  //   test.equal(Math.round(pixel[0]), 0);
  //   test.equal(Math.round(pixel[1]), 0);
  // 
  //   world = w.pix2sky(24, 38);
  //   test.equal(world[0].toFixed(6), 278.373032);
  //   test.equal(world[1].toFixed(6), -71.523389);
  // 
  //   pixel = w.sky2pix(278.373032, -71.523389);
  //   test.equal(Math.round(pixel[0]), 24);
  //   test.equal(Math.round(pixel[1]), 38);
  // 
  //   world = w.pix2sky(45, 98);
  //   test.equal(world[0].toFixed(6), 287.743796);
  //   test.equal(world[1].toFixed(6), -69.465686);
  // 
  //   pixel = w.sky2pix(287.743796, -69.465686);
  //   test.equal(Math.round(pixel[0]), 45);
  //   test.equal(Math.round(pixel[1]), 98);
  // 
  //   test.done();
  // },
  // 
  'CYP': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_CYP'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 263.329497);
    test.equal(world[1].toFixed(6), -76.039914);
  
    pixel = w.sky2pix(263.329497, -76.039914);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 274.890941);
    test.equal(world[1].toFixed(6), -73.812142);
  
    pixel = w.sky2pix(274.890941, -73.812142);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 288.804748);
    test.equal(world[1].toFixed(6), -70.938785);
  
    pixel = w.sky2pix(288.804748, -70.938785);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'HPX': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_HPX'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 271.632311);
    test.equal(world[1].toFixed(6), -73.445824);
  
    pixel = w.sky2pix(271.632311, -73.445824);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 278.346118);
    test.equal(world[1].toFixed(6), -71.670842);
  
    pixel = w.sky2pix(278.346118, -71.670842);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.498652);
    test.equal(world[1].toFixed(6), -69.580399);
  
    pixel = w.sky2pix(287.498652, -69.580399);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'MER': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_MER'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.276581);
    test.equal(world[1].toFixed(6), -73.445096);
  
    pixel = w.sky2pix(268.276581, -73.445096);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.530056);
    test.equal(world[1].toFixed(6), -71.741507);
  
    pixel = w.sky2pix(276.530056, -71.741507);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.524493);
    test.equal(world[1].toFixed(6), -69.577733);
  
    pixel = w.sky2pix(287.524493, -69.577733);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'MOL': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_MOL'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 270.510770);
    test.equal(world[1].toFixed(6), -74.244499);
  
    pixel = w.sky2pix(270.510770, -74.244499);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 277.981184);
    test.equal(world[1].toFixed(6), -72.297410);
  
    pixel = w.sky2pix(277.981184, -72.297410);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.833261);
    test.equal(world[1].toFixed(6), -69.956269);
  
    pixel = w.sky2pix(287.833261, -69.956269);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'NCP': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_NCP'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.143390);
    test.equal(world[1].toFixed(6), -73.970782);
  
    pixel = w.sky2pix(268.143390, -73.970782);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.619647);
    test.equal(world[1].toFixed(6), -72.184823);
  
    pixel = w.sky2pix(276.619647, -72.184823);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.746656);
    test.equal(world[1].toFixed(6), -69.833602);
  
    pixel = w.sky2pix(287.746656, -69.833602);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'PAR': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_PAR'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 269.252432);
    test.equal(world[1].toFixed(6), -73.561567);
  
    pixel = w.sky2pix(269.252432, -73.561567);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 277.092530);
    test.equal(world[1].toFixed(6), -71.821029);
  
    pixel = w.sky2pix(277.092530, -71.821029);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.529273);
    test.equal(world[1].toFixed(6), -69.592531);
  
    pixel = w.sky2pix(287.529273, -69.592531);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'PCO': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_PCO'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 269.917957);
    test.equal(world[1].toFixed(6), -73.583409);
  
    pixel = w.sky2pix(269.917957, -73.583409);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 277.681693);
    test.equal(world[1].toFixed(6), -71.814622);
  
    pixel = w.sky2pix(277.681693, -71.814622);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.874190);
    test.equal(world[1].toFixed(6), -69.556118);
  
    pixel = w.sky2pix(287.874190, -69.556118);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'QSC': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_QSC'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 271.636827);
    test.equal(world[1].toFixed(6), -73.151767);
  
    pixel = w.sky2pix(271.636827, -73.151767);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 278.354803);
    test.equal(world[1].toFixed(6), -71.458494);
  
    pixel = w.sky2pix(278.354803, -71.458494);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.599966);
    test.equal(world[1].toFixed(6), -69.617177);
  
    pixel = w.sky2pix(287.599966, -69.617177);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'SFL': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_SFL'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.225742);
    test.equal(world[1].toFixed(6), -73.568696);
  
    pixel = w.sky2pix(268.225742, -73.568696);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.536241);
    test.equal(world[1].toFixed(6), -71.855163);
  
    pixel = w.sky2pix(276.536241, -71.855163);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.538837);
    test.equal(world[1].toFixed(6), -69.593347);
  
    pixel = w.sky2pix(287.538837, -69.593347);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'SIN': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_SIN'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.143390);
    test.equal(world[1].toFixed(6), -73.970782);
  
    pixel = w.sky2pix(268.143390, -73.970782);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.619647);
    test.equal(world[1].toFixed(6), -72.184823);
  
    pixel = w.sky2pix(276.619647, -72.184823);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.746656);
    test.equal(world[1].toFixed(6), -69.833602);
  
    pixel = w.sky2pix(287.746656, -69.833602);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'STG': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_STG'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 269.148414);
    test.equal(world[1].toFixed(6), -73.320545);
  
    pixel = w.sky2pix(269.148414, -73.320545);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 277.076315);
    test.equal(world[1].toFixed(6), -71.621615);
  
    pixel = w.sky2pix(277.076315, -71.621615);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.610210);
    test.equal(world[1].toFixed(6), -69.453323);
  
    pixel = w.sky2pix(287.610210, -69.453323);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'SZP': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_SZP'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 272.182173);
    test.equal(world[1].toFixed(6), -73.485601);
  
    pixel = w.sky2pix(272.182173, -73.485601);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 279.265155);
    test.equal(world[1].toFixed(6), -71.665959);
  
    pixel = w.sky2pix(279.265155, -71.665959);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 288.860445);
    test.equal(world[1].toFixed(6), -69.409942);
  
    pixel = w.sky2pix(288.860445, -69.409942);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'TAN': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_TAN'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 270.120344);
    test.equal(world[1].toFixed(6), -72.676808);
  
    pixel = w.sky2pix(270.120344, -72.676808);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 277.521567);
    test.equal(world[1].toFixed(6), -71.079135);
  
    pixel = w.sky2pix(277.521567, -71.079135);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.475655);
    test.equal(world[1].toFixed(6), -69.098387);
  
    pixel = w.sky2pix(287.475655, -69.098387);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'TSC': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_TSC'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 263.870522);
    test.equal(world[1].toFixed(6), -74.215160);
  
    pixel = w.sky2pix(263.870522, -74.215160);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 274.714562);
    test.equal(world[1].toFixed(6), -72.374940);
  
    pixel = w.sky2pix(274.714562, -72.374940);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 288.299769);
    test.equal(world[1].toFixed(6), -69.884276);
  
    pixel = w.sky2pix(288.299769, -69.884276);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'ZEA': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_ZEA'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.655533);
    test.equal(world[1].toFixed(6), -73.640795);
  
    pixel = w.sky2pix(268.655533, -73.640795);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.851898);
    test.equal(world[1].toFixed(6), -71.896829);
  
    pixel = w.sky2pix(276.851898, -71.896829);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.677457);
    test.equal(world[1].toFixed(6), -69.637350);
  
    pixel = w.sky2pix(287.677457, -69.637350);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  },
  
  'ZPN': function(test) {
    var header, w, world, pixel;
  
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_ZPN'), 'utf8');
    w = new wcs();
    w.init(header);
  
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 263.127380);
    test.equal(world[1].toFixed(6), -78.582290);
  
    pixel = w.sky2pix(263.127380, -78.582290);
    test.equal(Math.round(pixel[0]), 0);
    test.equal(Math.round(pixel[1]), 0);
  
    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 274.388324);
    test.equal(world[1].toFixed(6), -76.254536);
  
    pixel = w.sky2pix(274.388324, -76.254536);
    test.equal(Math.round(pixel[0]), 24);
    test.equal(Math.round(pixel[1]), 38);
  
    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 288.392017);
    test.equal(world[1].toFixed(6), -72.665303);
  
    pixel = w.sky2pix(288.392017, -72.665303);
    test.equal(Math.round(pixel[0]), 45);
    test.equal(Math.round(pixel[1]), 98);
  
    test.done();
  }

};
