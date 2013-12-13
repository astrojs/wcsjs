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
    test.equal(world[0], 268.21688701395647);
    test.equal(world[1], -73.66968983882300);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 276.73187868548666);
    test.equal(world[1], -71.89745170283852);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.89619973906133);
    test.equal(world[1], -69.59132515809009);
    
    test.done();
  },


  'AIT': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_AIT'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 268.56813922635888);
    test.equal(world[1], -73.49845984257067);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 276.78835711116852);
    test.equal(world[1], -71.77031590889941);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.69649070191275);
    test.equal(world[1], -69.51660568851483);
    
    test.done();
  },


  'ARC': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_ARC'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 269.05673077773804);
    test.equal(world[1], -73.46829958534701);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 277.10945455391800);
    test.equal(world[1], -71.73007205290968);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.77594826264385);
    test.equal(world[1], -69.49141133149553);
    
    test.done();
  },


  'AZP': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_AZP'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 272.40060255082687);
    test.equal(world[1], -73.01765518149499);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 278.87925295958792);
    test.equal(world[1], -71.34789253188616);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.66327906114350);
    test.equal(world[1], -69.44076556561157);
    
    test.done();
  },


  'BON': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_BON'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 273.39341300383830);
    test.equal(world[1], -73.62466633347393);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 280.19105961874209);
    test.equal(world[1], -71.72932922081986);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 289.71914895922004);
    test.equal(world[1], -69.33491479487026);
    
    test.done();
  },


  'CAR': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_CAR'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 268.47850587888030);
    test.equal(world[1], -73.37997130772084);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 276.68511677167288);
    test.equal(world[1], -71.66912914240467);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.65430077296770);
    test.equal(world[1], -69.49509785651212);
    
    test.done();
  },


  'CEA': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_CEA'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 268.44085265462115);
    test.equal(world[1], -73.37969380548566);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 276.65254418535773);
    test.equal(world[1], -71.67026610104271);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.65633165394672);
    test.equal(world[1], -69.49488577819591);
    
    test.done();
  },


  'COD': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_COD'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 267.30957853599364);
    test.equal(world[1], -74.13710817537566);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 276.14258826990596);
    test.equal(world[1], -72.25516349180113);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.54581149797787);
    test.equal(world[1], -69.84295046034813);
    
    test.done();
  },


  'COE': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_COE'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 271.44128301856676);
    test.equal(world[1], -73.70751697051337);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 278.55130186095829);
    test.equal(world[1], -71.85282148313993);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 288.43332154482619);
    test.equal(world[1], -69.64233769711701);
    
    test.done();
  },


  'COO': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_COO'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 266.44709417242149);
    test.equal(world[1], -74.17152274688496);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 275.93630000357143);
    test.equal(world[1], -72.30542638113086);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 288.24124114503564);
    test.equal(world[1], -69.82640564504693);
    
    test.done();
  },


  'COP': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_COP'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 266.18968688018197);
    test.equal(world[1], -74.06989101019846);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 275.71279236566613);
    test.equal(world[1], -72.24459255353753);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 288.08062955119726);
    test.equal(world[1], -69.83319876566866);
    
    test.done();
  },


  'CSC': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_CSC'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 271.64205892089285);
    test.equal(world[1], -73.16617799175344);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 278.52560894324847);
    test.equal(world[1], -71.45209202571939);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.84563425399301);
    test.equal(world[1], -69.38822760746797);
    
    test.done();
  },


  'CYP': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_CYP'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 263.69300640787560);
    test.equal(world[1], -75.95480262511792);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 275.14092523159229);
    test.equal(world[1], -73.71166421553414);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 288.94305757348292);
    test.equal(world[1], -70.82563302611403);
    
    test.done();
  },


  'HPX': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_HPX'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 271.82370024341333);
    test.equal(world[1], -73.37755255051934);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 278.49475253086086);
    test.equal(world[1], -71.59701232255669);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.60086023511985);
    test.equal(world[1], -69.50066848634343);
    
    test.done();
  },


  'MER': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_MER'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 268.51628090049542);
    test.equal(world[1], -73.38024288395212);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 276.71775210407725);
    test.equal(world[1], -71.66798431203884);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.65228159165980);
    test.equal(world[1], -69.49530868549388);
    
    test.done();
  },


  'MOL': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_MOL'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 270.72846180802139);
    test.equal(world[1], -74.16980073050065);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 278.14374374757961);
    test.equal(world[1], -72.21554279502313);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.93735293150291);
    test.equal(world[1], -69.86685492955003);
    
    test.done();
  },


  'NCP': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_NCP'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 268.39150687810229);
    test.equal(world[1], -73.90353552531403);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 276.81017364989719);
    test.equal(world[1], -72.10707434303899);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.87135937209422);
    test.equal(world[1], -69.74423740618809);
    
    test.done();
  },


  'PAR': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_PAR'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 269.47944138195686);
    test.equal(world[1], -73.49563038873099);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 277.26915073243839);
    test.equal(world[1], -71.74658209877160);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.64809204078989);
    test.equal(world[1], -69.50856755258873);
    
    test.done();
  },


  'PCO': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_PCO'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 270.14393037504806);
    test.equal(world[1], -73.51670585230482);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 277.85266724198391);
    test.equal(world[1], -71.73959531241584);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.98288788377755);
    test.equal(world[1], -69.47245686357836);
    
    test.done();
  },


  'QSC': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_QSC'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 271.82788315326621);
    test.equal(world[1], -73.08503647817108);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 278.50397572515698);
    test.equal(world[1], -71.38790291503825);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.70321569326893);
    test.equal(world[1], -69.54235062602707);
    
    test.done();
  },


  'SFL': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_SFL'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 268.46737987111430);
    test.equal(world[1], -73.50405652146377);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 276.72488092427625);
    test.equal(world[1], -71.78082820125013);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.66540925177048);
    test.equal(world[1], -69.50814226065356);
    
    test.done();
  },


  'SIN': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_SIN'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 268.39150699215139);
    test.equal(world[1], -73.90353552623822);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 276.81017373148268);
    test.equal(world[1], -72.10707433989337);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.87135941566476);
    test.equal(world[1], -69.74423740100356);
    
    test.done();
  },


  'STG': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_STG'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 269.37825680266144);
    test.equal(world[1], -73.25613046025055);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 277.25469827540047);
    test.equal(world[1], -71.54905963506775);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.72937897955910);
    test.equal(world[1], -69.37224062493648);
    
    test.done();
  },


  'SZP': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_SZP'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 272.37781512101361);
    test.equal(world[1], -73.41689969643966);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 279.40878023595917);
    test.equal(world[1], -71.59117395123121);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 288.94678951859999);
    test.equal(world[1], -69.32929133998724);
    
    test.done();
  },


  'TAN': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_TAN'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 270.33283605009296);
    test.equal(world[1], -72.61583231844779);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 277.68828639763962);
    test.equal(world[1], -71.01213461371206);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.58930841018309);
    test.equal(world[1], -69.02541742454821);
    
    test.done();
  },


  'TSC': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_TSC'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 264.19960489634940);
    test.equal(world[1], -74.14517586429187);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 274.95765232987162);
    test.equal(world[1], -72.29165255738322);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 288.44628635706181);
    test.equal(world[1], -69.78971543068342);
    
    test.done();
  },


  'ZEA': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_ZEA'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 268.89429694487603);
    test.equal(world[1], -73.57489559932927);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 277.03622605821403);
    test.equal(world[1], -71.82165091917852);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 287.79936135442688);
    test.equal(world[1], -69.55219469078314);
    
    test.done();
  },


  'ZPN': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_ZPN'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(0, 0);
    test.equal(world[0], 263.47100070800735);
    test.equal(world[1], -78.49768232899739);
    
    world = w.pix2sky(24, 38);
    test.equal(world[0], 274.64071255721075);
    test.equal(world[1], -76.14274333453979);
    
    world = w.pix2sky(45, 98);
    test.equal(world[0], 288.54207571861173);
    test.equal(world[1], -72.51760735389108);
    
    test.done();
  },

};
