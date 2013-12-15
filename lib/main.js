
(function() {
  
  var IMGWIDTH = IMGHEIGHT = 192;
  var headers = {"COP": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "RESTFRQ": 1420405750.0, "LATPOLE": -45.0, "EQUINOX": 2000.0, "PV2_1": 45.0, "PV2_2": 25.0, "BMAJ": 0.2399999936422, "BMIN": 0.2399999936422, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -215.1923139086, "CRPIX2": 15.05768272737, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--COP", "CTYPE1": "RA---COP"}, "PAR": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---PAR", "CRPIX2": 3.322937769653, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--PAR", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": 0.0, "CRPIX1": -246.5551494284}, "AIT": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---AIT", "CRPIX2": 7.115850027049, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--AIT", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": 0.0, "CRPIX1": -246.2317116277}, "TSC": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---TSC", "CRPIX2": 20.37416464676, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--TSC", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": 0.0, "CRPIX1": -189.7220156818}, "AIR": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "RESTFRQ": 1420405750.0, "LATPOLE": -90.0, "EQUINOX": 2000.0, "PV2_1": 45.0, "BMAJ": 0.2399999936422, "BMIN": 0.2399999936422, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -234.7545010835, "CRPIX2": 8.339330824422, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--AIR", "CTYPE1": "RA---AIR"}, "STG": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---STG", "CRPIX2": 3.744942537739, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--STG", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": -90.0, "CRPIX1": -251.945990929}, "COE": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "RESTFRQ": 1420405750.0, "LATPOLE": 45.0, "EQUINOX": 2000.0, "PV2_1": -45.0, "PV2_2": 25.0, "BMAJ": 0.2399999936422, "BMIN": 0.2399999936422, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -223.0375366798, "CRPIX2": -14.35249668783, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--COE", "CTYPE1": "RA---COE"}, "COD": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "RESTFRQ": 1420405750.0, "LATPOLE": -45.0, "EQUINOX": 2000.0, "PV2_1": 45.0, "PV2_2": 25.0, "BMAJ": 0.2399999936422, "BMIN": 0.2399999936422, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -215.3431714695, "CRPIX2": 15.61302682707, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--COD", "CTYPE1": "RA---COD"}, "BON": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "RESTFRQ": 1420405750.0, "LATPOLE": 0.0, "EQUINOX": 2000.0, "PV2_1": 45.0, "BMAJ": 0.2399999936422, "BMIN": 0.2399999936422, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -243.1263982441, "CRPIX2": -33.0741266819, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--BON", "CTYPE1": "RA---BON"}, "AZP": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "RESTFRQ": 1420405750.0, "LATPOLE": -90.0, "EQUINOX": 2000.0, "PV2_1": 2.0, "PV2_2": 30.0, "BMAJ": 0.2399999936422, "BMIN": 0.2399999936422, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -254.1100848779, "CRPIX2": -11.34948542534, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--AZP", "CTYPE1": "RA---AZP"}, "SIN": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "RESTFRQ": 1420405750.0, "LATPOLE": -90.0, "EQUINOX": 2000.0, "PV2_1": 0.0, "PV2_2": 0.0, "BMAJ": 0.2399999936422, "BMIN": 0.2399999936422, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -237.1895431541, "CRPIX2": 7.688571124876, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--SIN", "CTYPE1": "RA---SIN"}, "COO": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "RESTFRQ": 1420405750.0, "LATPOLE": -45.0, "EQUINOX": 2000.0, "PV2_1": 45.0, "PV2_2": 25.0, "BMAJ": 0.2399999936422, "BMIN": 0.2399999936422, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -213.6486051767, "CRPIX2": 12.92640949564, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--COO", "CTYPE1": "RA---COO"}, "CYP": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "RESTFRQ": 1420405750.0, "LATPOLE": 0.0, "EQUINOX": 2000.0, "PV2_1": 1.0, "PV2_2": 0.707106781187, "BMAJ": 0.2399999936422, "BMIN": 0.2399999936422, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -147.1055514007, "CRPIX2": 20.56099939277, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--CYP", "CTYPE1": "RA---CYP"}, "CEA": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "RESTFRQ": 1420405750.0, "LATPOLE": 0.0, "EQUINOX": 2000.0, "PV2_1": 1.0, "BMAJ": 0.2399999936422, "BMIN": 0.2399999936422, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -248.2173814412, "CRPIX2": 7.688571124876, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--CEA", "CTYPE1": "RA---CEA"}, "CAR": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---CAR", "CRPIX2": 7.527038199745, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--CAR", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": 0.0, "CRPIX1": -248.2173814412}, "SZP": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "RESTFRQ": 1420405750.0, "LATPOLE": -90.0, "EQUINOX": 2000.0, "PV2_1": 2.0, "PV2_2": 180.0, "PV2_3": 60.0, "BMAJ": 0.2399999936422, "BMIN": 0.2399999936422, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -247.8656972779, "CRPIX2": -22.62051956373, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--SZP", "CTYPE1": "RA---SZP"}, "HPX": {"BPA": 0.0, "EXTEND": true, "SIMPLE": true, "CDELT1": -0.0666666666666667, "CDELT2": 0.0666666666666667, "NAXIS": 2, "LATPOLE": 0.0, "EQUINOX": 2000.0, "BMAJ": 0.24, "BMIN": 0.24, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "Jy/beam", "CRVAL2": -90.0, "CRPIX1": -248.217381441188, "CRPIX2": -8.21754831338666, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--HPX", "CTYPE1": "RA---HPX", "RADESYS": "FK5"}, "MOL": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---MOL", "CRPIX2": -2.310670994515, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--MOL", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": 0.0, "CRPIX1": -212.7655947497}, "CSC": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---CSC", "CRPIX2": -7.043520126533, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--CSC", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": 0.0, "CRPIX1": -268.6531829635}, "ZPN": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "BMAJ": 0.2399999936422, "RESTFRQ": 1420405750.0, "LATPOLE": -90.0, "PV2_8": 0.0, "PV2_9": 0.0, "EQUINOX": 2000.0, "PV2_0": 0.05, "PV2_1": 0.975, "PV2_2": -0.807, "PV2_3": 0.337, "PV2_4": -0.065, "PV2_5": 0.01, "PV2_6": 0.003, "PV2_7": -0.001, "PV2_12": 0.0, "PV2_13": 0.0, "PV2_10": 0.0, "PV2_11": 0.0, "PV2_16": 0.0, "PV2_17": 0.0, "PV2_14": 0.0, "PV2_15": 0.0, "PV2_18": 0.0, "PV2_19": 0.0, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -183.2937255632, "CRPIX2": 22.09211120575, "CRVAL1": 0.0, "LONPOLE": 180.0, "BMIN": 0.2399999936422, "CTYPE2": "DEC--ZPN", "CTYPE1": "RA---ZPN"}, "TAN": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---TAN", "CRPIX2": -0.5630437201085, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--TAN", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": -90.0, "CRPIX1": -268.0658087122}, "QSC": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---QSC", "CRPIX2": -8.258194421088, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--QSC", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": 0.0, "CRPIX1": -258.3408175994}, "ZEA": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---ZEA", "CRPIX2": 5.738055949994, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--ZEA", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": -90.0, "CRPIX1": -244.4880690361}, "NCP": {"BPA": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS": 2, "RESTFRQ": 1420405750.0, "LATPOLE": -90.0, "EQUINOX": 2000.0, "PV2_1": 0.0, "PV2_2": -1.216796447506e-08, "BMAJ": 0.2399999936422, "BMIN": 0.2399999936422, "BITPIX": -32, "NAXIS1": 192, "NAXIS2": 192, "BUNIT": "JY/BEAM", "CRVAL2": -90.0, "CRPIX1": -237.1895431541, "CRPIX2": 7.688572009351, "CRVAL1": 0.0, "LONPOLE": 180.0, "CTYPE2": "DEC--SIN", "CTYPE1": "RA---SIN"}, "SFL": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---SFL", "CRPIX2": 7.527038199745, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--SFL", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": 0.0, "CRPIX1": -246.3483086237}, "ARC": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---ARC", "CRPIX2": 5.082274450444, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--ARC", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": -90.0, "CRPIX1": -246.941901905}, "MER": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---MER", "CRPIX2": 7.364978412864, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--MER", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": 0.0, "CRPIX1": -248.2173814412}, "PCO": {"BPA": 0.0, "RESTFRQ": 1420405750.0, "CRVAL2": -90.0, "CTYPE1": "RA---PCO", "CRPIX2": 0.3620782775517, "CRVAL1": 0.0, "SIMPLE": true, "CDELT1": -0.06666666666667, "CDELT2": 0.06666666666667, "NAXIS2": 192, "LONPOLE": 180.0, "CTYPE2": "DEC--PCO", "NAXIS": 2, "NAXIS1": 192, "BMIN": 0.2399999936422, "BUNIT": "JY/BEAM", "BITPIX": -32, "BMAJ": 0.2399999936422, "EQUINOX": 2000.0, "LATPOLE": 0.0, "CRPIX1": -246.2486098896}}

  String.prototype.splice = function(index, remove, string) {
    return (this.slice(0, index) + string + this.slice(index + Math.abs(remove)));
  };
  
  function toHeader(wcsObj) {
    var header = [];
    
    line = "                                                                                ";
    for (var card in wcsObj) {
      var value = wcsObj[card];
      
      entry = line.splice(0, card.length, card);
      entry = entry.splice(8, 1, "=");
      
      entry = entry.splice(10, value.toString().length, value);
      header.push(entry);
    }
    
    return header.join('\n');
  }
  
  function getCoordinateExtent(w, width, height) {
    var s1, s2;
    
    s1 = w.pix2sky(0, 0);
    s2 = w.pix2sky(width - 1, height - 1);
    
    return {
      ra: [s1[0], s2[0]],
      dec: [s1[1], s2[1]]
    };
  }
  
  function createGrid(el) {
    var projection = el.dataset.projection;
    
    var header = toHeader(headers[projection]);
    var w = new wcs();
    w.init(header);
    var extent = getCoordinateExtent(w, IMGWIDTH, IMGHEIGHT);
    
    svg = d3.select(el)
    var margin = {top: 20, right: 20, bottom: 40, left: 40};
    var width = IMGWIDTH;
    var height = IMGHEIGHT;
    
    var x = d3.scale.linear()
        .range([0, width])
        .domain(extent.ra);

    var y = d3.scale.linear()
        .range([height, 0])
        .domain(extent.dec);
        
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5);
        
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);
    
    var svg = d3.select(el).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("right ascension");
          
    svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("declination");
    
    svg.append("image")
        .attr("xlink:href", "/images/1904-66_" + projection + ".png")
        .attr("x", "0")
        .attr("y", "0")
        .attr("width", IMGWIDTH + "px")
        .attr("height", IMGHEIGHT + "px");
    
    var group = svg.append("g");
    group.append("clipPath")
        .attr("id", "clip")
      .append("rect")
        .attr("width", IMGWIDTH)
        .attr("height", IMGHEIGHT);
    
    var gridGroup = group.append("g")
      .attr("clip-path", "url(#clip)")
      .attr("transform", "translate(0, 0)")
    
    var range = extent.ra[1] - extent.ra[0];
    var lower = extent.ra[0] - 0.5 * range;
    var upper = extent.ra[1] + 0.5 * range;
    x.domain([lower, upper]);
    
    range = extent.dec[1] - extent.dec[0];
    lower = extent.dec[0] - 0.5 * range;
    upper = extent.dec[1] + 0.5 * range;
    y.domain([lower, upper]);
    
    var xTicks = x.ticks(10);
    var yTicks = y.ticks(10);
    
    var lineFn = d3.svg.line()
          .x(function(d) { return d.x; })
          .y(function(d) { return IMGHEIGHT - d.y; })
          .interpolate("linear");
    
    for (var j = 0; j < yTicks.length; j++) {
      var gridLine = [];
      
      for (var i = 0; i < xTicks.length; i++) {
        var imgcrd = w.sky2pix(xTicks[i], yTicks[j]);
        var point = {
          x: imgcrd[0],
          y: imgcrd[1]
        };
        gridLine.push(point);
      }
      
      gridGroup.append("path")
        .attr("d", lineFn(gridLine))
        .attr("stroke", "#7FFF00")
        .attr("stroke-width", 0.5)
        .attr("fill", "none");
    }
    
    for (var i = 0; i < xTicks.length; i++) {
      var gridLine = [];
      for (var j = 0; j < yTicks.length; j++) {
        var imgcrd = w.sky2pix(xTicks[i], yTicks[j]);
        var point = {
          x: imgcrd[0],
          y: imgcrd[1]
        };
        gridLine.push(point);
      }
      gridGroup.append("path")
        .attr("d", lineFn(gridLine))
        .attr("stroke", "#7FFF00")
        .attr("stroke-width", 0.5)
        .attr("fill", "none");
    }
    
  }
  
  function onDOM() {
    window.removeEventListener('DOMContentLoaded', onDOM, false);
    
    var gridElems = document.querySelectorAll("div.grid");
    for (var i = 0; i < gridElems.length; i++) {
      createGrid(gridElems[i]);
    }
    
  }
  
  window.addEventListener('DOMContentLoaded', onDOM, false);
})();