'use strict';

var fs = require('fs');
var path = require('path');
var wcs = require('../wcs.js');

exports['wcsjs_test'] = {
  setUp: function(done) {
    done();
  },


  'AIR': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_AIR'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 267.965502);
    test.equal(world[1].toFixed(6), -73.736378);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.539194);
    test.equal(world[1].toFixed(6), -71.973910);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.770534);
    test.equal(world[1].toFixed(6), -69.677946);

    test.done();
  },

  'AIT': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_AIT'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.327518);
    test.equal(world[1].toFixed(6), -73.563438);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.600858);
    test.equal(world[1].toFixed(6), -71.844700);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.570468);
    test.equal(world[1].toFixed(6), -69.601320);

    test.done();
  },

  'ARC': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_ARC'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.820971);
    test.equal(world[1].toFixed(6), -73.533720);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.927124);
    test.equal(world[1].toFixed(6), -71.804385);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.654957);
    test.equal(world[1].toFixed(6), -69.575203);

    test.done();
  },

  'AZP': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_AZP'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 272.215089);
    test.equal(world[1].toFixed(6), -73.083170);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 278.736450);
    test.equal(world[1].toFixed(6), -71.418345);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.567992);
    test.equal(world[1].toFixed(6), -69.516228);

    test.done();
  },

  'BON': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_BON'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 273.211114);
    test.equal(world[1].toFixed(6), -73.695481);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 280.058990);
    test.equal(world[1].toFixed(6), -71.806125);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 289.642880);
    test.equal(world[1].toFixed(6), -69.418047);

    test.done();
  },

  'CAR': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_CAR'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.238659);
    test.equal(world[1].toFixed(6), -73.444781);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.497144);
    test.equal(world[1].toFixed(6), -71.742625);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.525496);
    test.equal(world[1].toFixed(6), -69.577629);

    test.done();
  },

  'CEA': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_CEA'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.200859);
    test.equal(world[1].toFixed(6), -73.444460);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.464298);
    test.equal(world[1].toFixed(6), -71.743735);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.526504);
    test.equal(world[1].toFixed(6), -69.577525);

    test.done();
  },

  'COD': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_COD'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 267.043666);
    test.equal(world[1].toFixed(6), -74.207814);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 275.939691);
    test.equal(world[1].toFixed(6), -72.336226);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.411910);
    test.equal(world[1].toFixed(6), -69.934557);

    test.done();
  },

  'COE': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_COE'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 271.241993);
    test.equal(world[1].toFixed(6), -73.779365);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 278.398897);
    test.equal(world[1].toFixed(6), -71.930463);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 288.331976);
    test.equal(world[1].toFixed(6), -69.726583);

    test.done();
  },

  'COO': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_COO'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 266.164212);
    test.equal(world[1].toFixed(6), -74.241274);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 275.722354);
    test.equal(world[1].toFixed(6), -72.386914);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 288.104664);
    test.equal(world[1].toFixed(6), -69.919521);

    test.done();
  },

  'COP': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_COP'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 265.905403);
    test.equal(world[1].toFixed(6), -74.138576);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 275.495937);
    test.equal(world[1].toFixed(6), -72.324989);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.940427);
    test.equal(world[1].toFixed(6), -69.925222);

    test.done();
  },

  'CSC': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_CSC'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 271.443713);
    test.equal(world[1].toFixed(6), -73.231276);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 278.373032);
    test.equal(world[1].toFixed(6), -71.523389);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.743796);
    test.equal(world[1].toFixed(6), -69.465686);

    test.done();
  },

  'CYP': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_CYP'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 263.329497);
    test.equal(world[1].toFixed(6), -76.039914);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 274.890941);
    test.equal(world[1].toFixed(6), -73.812142);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 288.804748);
    test.equal(world[1].toFixed(6), -70.938785);

    test.done();
  },

  'HPX': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_HPX'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 271.632311);
    test.equal(world[1].toFixed(6), -73.445824);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 278.346118);
    test.equal(world[1].toFixed(6), -71.670842);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.498652);
    test.equal(world[1].toFixed(6), -69.580399);

    test.done();
  },

  'MER': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_MER'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.276581);
    test.equal(world[1].toFixed(6), -73.445096);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.530056);
    test.equal(world[1].toFixed(6), -71.741507);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.524493);
    test.equal(world[1].toFixed(6), -69.577733);

    test.done();
  },

  'MOL': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_MOL'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 270.510770);
    test.equal(world[1].toFixed(6), -74.244499);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 277.981184);
    test.equal(world[1].toFixed(6), -72.297410);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.833261);
    test.equal(world[1].toFixed(6), -69.956269);

    test.done();
  },

  'NCP': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_NCP'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.143390);
    test.equal(world[1].toFixed(6), -73.970782);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.619647);
    test.equal(world[1].toFixed(6), -72.184823);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.746656);
    test.equal(world[1].toFixed(6), -69.833602);

    test.done();
  },

  'PAR': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_PAR'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 269.252432);
    test.equal(world[1].toFixed(6), -73.561567);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 277.092530);
    test.equal(world[1].toFixed(6), -71.821029);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.529273);
    test.equal(world[1].toFixed(6), -69.592531);

    test.done();
  },

  'PCO': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_PCO'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 269.917957);
    test.equal(world[1].toFixed(6), -73.583409);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 277.681693);
    test.equal(world[1].toFixed(6), -71.814622);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.874190);
    test.equal(world[1].toFixed(6), -69.556118);

    test.done();
  },

  'QSC': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_QSC'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 271.636827);
    test.equal(world[1].toFixed(6), -73.151767);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 278.354803);
    test.equal(world[1].toFixed(6), -71.458494);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.599966);
    test.equal(world[1].toFixed(6), -69.617177);

    test.done();
  },

  'SFL': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_SFL'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.225742);
    test.equal(world[1].toFixed(6), -73.568696);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.536241);
    test.equal(world[1].toFixed(6), -71.855163);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.538837);
    test.equal(world[1].toFixed(6), -69.593347);

    test.done();
  },

  'SIN': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_SIN'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.143390);
    test.equal(world[1].toFixed(6), -73.970782);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.619647);
    test.equal(world[1].toFixed(6), -72.184823);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.746656);
    test.equal(world[1].toFixed(6), -69.833602);

    test.done();
  },

  'STG': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_STG'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 269.148414);
    test.equal(world[1].toFixed(6), -73.320545);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 277.076315);
    test.equal(world[1].toFixed(6), -71.621615);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.610210);
    test.equal(world[1].toFixed(6), -69.453323);

    test.done();
  },

  'SZP': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_SZP'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 272.182173);
    test.equal(world[1].toFixed(6), -73.485601);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 279.265155);
    test.equal(world[1].toFixed(6), -71.665959);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 288.860445);
    test.equal(world[1].toFixed(6), -69.409942);

    test.done();
  },

  'TAN': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_TAN'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 270.120344);
    test.equal(world[1].toFixed(6), -72.676808);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 277.521567);
    test.equal(world[1].toFixed(6), -71.079135);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.475655);
    test.equal(world[1].toFixed(6), -69.098387);

    test.done();
  },

  'TSC': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_TSC'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 263.870522);
    test.equal(world[1].toFixed(6), -74.215160);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 274.714562);
    test.equal(world[1].toFixed(6), -72.374940);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 288.299769);
    test.equal(world[1].toFixed(6), -69.884276);

    test.done();
  },

  'ZEA': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_ZEA'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 268.655533);
    test.equal(world[1].toFixed(6), -73.640795);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 276.851898);
    test.equal(world[1].toFixed(6), -71.896829);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 287.677457);
    test.equal(world[1].toFixed(6), -69.637350);

    test.done();
  },

  'ZPN': function(test) {
    var header, w, world;

    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_ZPN'), 'utf8');
    w = new wcs();
    w.init(header);

    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 263.127380);
    test.equal(world[1].toFixed(6), -78.582290);

    world = w.pix2sky(24, 38);
    test.equal(world[0].toFixed(6), 274.388324);
    test.equal(world[1].toFixed(6), -76.254536);

    world = w.pix2sky(45, 98);
    test.equal(world[0].toFixed(6), 288.392017);
    test.equal(world[1].toFixed(6), -72.665303);

    test.done();
  },



};
