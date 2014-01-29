'use strict';

var fs = require('fs');
var path = require('path');
var wcs = require('../wcs.js');

exports['wcsjs_test'] = {
  setUp: function(done) {
    done();
  },
  
  'm101': function(test) {
    var header, w, world, pixel;
    
    header = fs.readFileSync(path.join(__dirname, 'data', 'm101'), 'utf8');
    
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0].toFixed(6), 211.003338);
    test.equal(world[1].toFixed(6), 54.216255);
    
    test.done();
  }

};
