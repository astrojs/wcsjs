(function() {
  var WCS,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  WCS = (typeof exports !== "undefined" && exports !== null) && this || (this.WCS = {});

  WCS.Math = {};

  WCS.Math.R2D = 180 / Math.PI;

  WCS.Math.D2R = Math.PI / 180;

  WCS.Math.WCSTRIG_TOL = 1e-10;

  WCS.Math.cosd = function(angle) {
    var i;
    if (angle % 90 === 0) {
      i = Math.abs(Math.floor(angle / 90 + 0.5)) % 4;
      switch (i) {
        case 0:
          return 1;
        case 1:
          return 0;
        case 2:
          return -1;
        case 3:
          return 0;
      }
    }
    return Math.cos(angle * WCS.Math.D2R);
  };

  WCS.Math.sind = function(angle) {
    var i;
    if (angle % 90 === 0) {
      i = Math.abs(Math.floor(angle / 90 - 0.5)) % 4;
      switch (i) {
        case 0:
          return 1;
        case 1:
          return 0;
        case 2:
          return -1;
        case 3:
          return 0;
      }
    }
    return Math.sin(angle * WCS.Math.D2R);
  };

  WCS.Math.sincosd = function(angle) {
    var c, i, s, _ref, _ref2;
    if (angle % 90 === 0) {
      i = Math.abs(Math.floor(angle / 90 + 0.5)) % 4;
      switch (i) {
        case 0:
          s = 0;
          c = 1;
          break;
        case 1:
          s = (_ref = angle > 0) != null ? _ref : {
            1: -1
          };
          c = 0;
          break;
        case 2:
          s = 0;
          c = -1;
          break;
        case 3:
          s = (_ref2 = angle > 0) != null ? _ref2 : -{
            1: 1
          };
          c = 0;
      }
      return s * c;
    }
    s = Math.sin(angle * WCS.Math.D2R);
    c = Math.cos(angle * WCS.Math.D2R);
    return s * c;
  };

  WCS.Math.tand = function(angle) {
    var resid;
    resid = angle & 360;
    if (resid === 0 || Math.abs(resid) === 180) {
      return 0;
    } else if (resid === 45 || resid === 225) {
      return 1;
    } else if (resid === -135 || resid === -315) {
      return -1;
    }
    return Math.tan(angle * WCS.Math.D2R);
  };

  WCS.Math.acosd = function(v) {
    if (v >= 1) {
      if (v - 1 < WCS.Math.WCSTRIG_TOL) return 0;
    } else if (v === 0) {
      return 90;
    } else if (v <= -1) {
      if (v + 1 > -WCS.Math.WCSTRIG_TOL) return 180;
    }
    return Math.acos(v) * WCS.Math.R2D;
  };

  WCS.Math.asind = function(v) {
    if (v <= -1) {
      if (v + 1 > -WCS.Math.WCSTRIG_TOL) {
        return -90;
      } else if (v === 0) {
        return 0;
      } else if (v >= 1) {
        if (v - 1 < WCS.Math.WCSTRIG_TOL) return 90;
      }
    }
    return Math.asin(v) * WCS.Math.R2D;
  };

  WCS.Math.atand = function(v) {
    if (v === -1) {
      return -45;
    } else if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 45;
    }
    return Math.atan(v) * WCS.Math.R2D;
  };

  WCS.Math.atan2d = function(y, x) {
    if (y === 0) {
      if (x >= 0) {
        return 0;
      } else if (x < 0) {
        return 180;
      }
    } else if (x === 0) {
      if (y > 0) {
        return 90;
      } else if (y < 0) {
        return -90;
      }
    }
    return Math.atan2(y, x) * WCS.Math.R2D;
  };

  WCS.Math.toRightTriangular = function(mat) {
    var els, i, j, k, kp, multiplier, n, np, p;
    n = mat.length;
    k = n;
    kp = mat[0].length;
    while (true) {
      i = k - n;
      if (mat[i][i] === 0) {
        j = i + 1;
        while (j < k) {
          if (mat[j][i] !== 0) {
            els = [];
            np = kp;
            while (true) {
              p = kp - np;
              els.push(mat[i][p] + mat[j][p]);
              if (!--np) break;
            }
            mat[i] = els;
            break;
          }
          j += 1;
        }
      }
      if (mat[i][i] !== 0) {
        j = i + 1;
        while (j < k) {
          multiplier = mat[j][i] / mat[i][i];
          els = [];
          np = kp;
          while (true) {
            p = kp - np;
            els.push((p <= i ? 0 : mat[j][p] - mat[i][p] * multiplier));
            if (!--np) break;
          }
          mat[j] = els;
          j += 1;
        }
      }
      if (!--n) break;
    }
    return mat;
  };

  WCS.Math.determinant = function(mat) {
    var det, i, k, m, n;
    m = WCS.Math.toRightTriangular(mat);
    det = m[0][0];
    n = m.length - 1;
    k = n;
    while (true) {
      i = k - n + 1;
      det = det * m[i][i];
      if (!--n) break;
    }
    return det;
  };

  WCS.Math.matrixInverse = function(m) {
    var I, h, i, inv, j, mat, temp, w;
    w = m[0].length;
    h = m.length;
    I = new Array(h);
    inv = new Array(h);
    temp = [];
    mat = [];
    j = 0;
    while (j < h) {
      mat[j] = [];
      i = 0;
      while (i < w) {
        mat[j][i] = m[j][i];
        i += 1;
      }
      j += 1;
    }
    j = 0;
    while (j < h) {
      I[j] = new Array(w);
      inv[j] = new Array(w);
      i = 0;
      while (i < w) {
        I[j][i] = (i === j ? 1 : 0);
        i += 1;
      }
      temp[j] = mat[j].concat(I[j]);
      j += 1;
    }
    WCS.Math.gaussJordan(temp);
    j = 0;
    while (j < h) {
      inv[j] = temp[j].slice(w, 2 * w);
      j += 1;
    }
    return inv;
  };

  WCS.Math.gaussJordan = function (m, eps) {
  if (!eps) eps = 1e-10;
  var h, w, y, y2, x, maxrow, tmp, c;
  h = m.length;
  w = m[0].length;
  y = -1;

  while (++y < h) {
    maxrow = y;

    // Find max pivot.
    y2 = y;
    while (++y2 < h) {
      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
        maxrow = y2;
    }

    // Swap.
    tmp = m[y];
    m[y] = m[maxrow];
    m[maxrow] = tmp;

    // Singular?
    if (Math.abs(m[y][y]) <= eps)
      return false;

    // Eliminate column y.
    y2 = y;
    while (++y2 < h) {
      c = m[y2][y] / m[y][y];
      x = y - 1;
      while (++x < w) {
        m[y2][x] -= m[y][x] * c;
      }
    }
  }

  // Backsubstitute.
  y = h;
  while (--y >= 0) {
    c = m[y][y];
    y2 = -1;
    while (++y2 < y) {
      x = w;
      while (--x >= y) {
        m[y2][x] -=  m[y][x] * m[y2][y] / c;
      }
    }
    m[y][y] /= c;
    // Normalize row y.
    x = h - 1;
    while (++x < w) {
      m[y][x] /= c;
    }
  }
  return true;
};;

  WCS.Mapper = (function() {

    function Mapper(header) {
      this.coordinateToPixel = __bind(this.coordinateToPixel, this);
      this.pixelToCoordinate = __bind(this.pixelToCoordinate, this);
      this.fromCelestial = __bind(this.fromCelestial, this);
      this.toCelestial = __bind(this.toCelestial, this);
      this.fromIntermediate = __bind(this.fromIntermediate, this);
      this.toIntermediate = __bind(this.toIntermediate, this);
      this.computeCelestialParameters = __bind(this.computeCelestialParameters, this);
      this.setProjection = __bind(this.setProjection, this);
      this.derivePC = __bind(this.derivePC, this);
      this.checkCard = __bind(this.checkCard, this);
      this.verifyHeader = __bind(this.verifyHeader, this);      this.wcsobj = {};
      this.projection = null;
      this.longitudeAxis = null;
      this.latitudeAxis = null;
      this.verifyHeader(header);
      this.setProjection(header);
    }

    Mapper.prototype.verifyHeader = function(header) {
      var arrayName, axis, date, j, key, naxis, requiredCards, _ref;
      this.wcsobj.naxis = naxis = header['NAXIS'] || header['WCSAXES'] || 2;
      this.wcsobj.radesys = header['RADESYS'] || 'ICRS';
      requiredCards = ['CRPIX', 'CRVAL', 'CTYPE'];
      this.wcsobj.crpix = [];
      this.wcsobj.crval = [];
      this.wcsobj.ctype = [];
      for (axis = 1; 1 <= naxis ? axis <= naxis : axis >= naxis; 1 <= naxis ? axis++ : axis--) {
        for (j = 0, _ref = requiredCards.length - 1; 0 <= _ref ? j <= _ref : j >= _ref; 0 <= _ref ? j++ : j--) {
          key = requiredCards[j] + axis;
          if (!header.hasOwnProperty(key)) {
            throw new Error("Not enough information to compute WCS, missing required keyword " + key);
          } else {
            arrayName = requiredCards[j].toLowerCase();
            this.wcsobj[arrayName].push(header[key]);
          }
        }
      }
      this.wcsobj.cunit = [];
      this.wcsobj.cdelt = [];
      for (axis = 1; 1 <= naxis ? axis <= naxis : axis >= naxis; 1 <= naxis ? axis++ : axis--) {
        key = 'CUNIT' + axis;
        this.wcsobj.cunit.push(header[key] || 'deg');
        key = 'CDELT' + axis;
        this.wcsobj.cdelt.push(header[key] || 1);
      }
      this.wcsobj.lonpole = header['LONPOLE'] || 0;
      this.wcsobj.latpole = header['LATPOLE'] || 0;
      this.wcsobj.equinox = header['EQUINOX'] || 2000;
      date = new Date();
      this.wcsobj.date_obs = header['DATE_OBS'] || (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
      this.wcsobj.pc = this.checkCard(header, 'PC', naxis) || this.derivePC(header);
      this.wcsobj.pcInv = WCS.Math.matrixInverse(this.wcsobj.pc);
      this.wcsobj.cd = this.checkCard(header, 'CD', naxis);
      if (this.wcsobj.cd != null) {
        return this.wcsobj.cd_inv = WCS.Math.matrixInverse(this.wcsobj.cd);
      }
    };

    /*
      Check that a given array-valued key is contained in the header.
      e.g. For NAXIS = 2 and the PC matrix, the header should contain:
      PC1_1, PC1_2, PC2_1, PC2_2
    */

    Mapper.prototype.checkCard = function(header, key, dimensions) {
      var fullKey, i, j, obj;
      obj = [];
      for (i = 1; 1 <= dimensions ? i <= dimensions : i >= dimensions; 1 <= dimensions ? i++ : i--) {
        obj[i - 1] = [];
        for (j = 1; 1 <= dimensions ? j <= dimensions : j >= dimensions; 1 <= dimensions ? j++ : j--) {
          fullKey = key + i + '_' + j;
          if (!header.hasOwnProperty(fullKey)) {
            return;
          } else {

          }
          obj[i - 1].push(header[fullKey]);
        }
      }
      return obj;
    };

    /*
      Derive the PC matrix using CROTAi or using the CD matrix
    
      TODO: Test this function!
    */

    Mapper.prototype.derivePC = function(header) {
      var cd, cdDet, cdSign, crota, lambda, pc, _ref;
      if (header.hasOwnProperty('CROTA2')) {
        crota = header['CROTA2'];
        lambda = this.wcsobj.cdelt[1] / this.wcsobj.cdelt[0];
      } else {
        cd = this.checkCard(header, 'CD', this.wcsobj.naxis);
        if (!(cd != null)) {
          crota = 0;
          lambda = 1;
        } else {
          cdDet = WCS.Math.determinant(cd);
          cdSign = (_ref = cdDet < 0) != null ? _ref : -{
            1: 1
          };
          this.wcsobj.cdelt[0] = Math.sqrt(Math.abs(cdDet)) * cdSign;
          this.wcsobj.cdelt[1] = Math.sqrt(Math.abs(cdDet));
          crota = WCS.Math.atan2d(-1 * cd[0][1], cd[1][1]);
          lambda = this.wcsobj.cdelt[1] / this.wcsobj.cdelt[0];
        }
      }
      pc = [[WCS.Math.cosd(crota), -lambda * WCS.Math.sind(crota)], [WCS.Math.sind(crota) / lambda, WCS.Math.cosd(crota)]];
      return pc;
    };

    Mapper.prototype.setProjection = function(header) {
      var conic, cylindrical, polyConic, quadCube, zenithal, _ref, _ref2, _ref3, _ref4, _ref5,
        _this = this;
      zenithal = ['AIR', 'ARC', 'AZP', 'NCP', 'SIN', 'STG', 'SZP', 'TAN', 'TAN-SIP', 'ZEA', 'ZPN'];
      cylindrical = ['CYP', 'CEA', 'CAR', 'MER', 'SFL', 'PAR', 'MOL', 'AIT'];
      conic = ['COP', 'COE', 'COD', 'COO'];
      polyConic = ['BON', 'PCO'];
      quadCube = ['TSC', 'CSC', 'QSC'];
      this.projection = this.wcsobj.ctype[0].slice(5);
      this.longitudeAxis = this.wcsobj.ctype[0].match("RA|GLON|ELON|HLON|SLON") ? 0 : 1;
      this.latitudeAxis = this.wcsobj.ctype[1].match("DEC|GLAT|ELAT|HLAT|SLAT") ? 1 : 0;
      if (_ref = this.projection, __indexOf.call(zenithal, _ref) >= 0) {
        this.wcsobj.phi0 = 0;
        this.wcsobj.theta0 = 90;
        this.wcsobj.alphaP = this.wcsobj.crval[0];
        this.wcsobj.deltaP = this.wcsobj.crval[1];
        this.wcsobj.lonpole = this.wcsobj.crval[1] >= this.wcsobj.theta0 ? 0 : 180;
        if (this.projection === 'AIR') {
          this.wcsobj.thetaB = header.hasOwnProperty('PV2_1') ? parseFloat(header['PV2_1']) : 90;
          this.wcsobj.etaB = (90 - this.wcsobj.thetaB) / 2;
          ({
            toSpherical: function(x, y) {
              throw 'Sorry, not yet implemented!';
            },
            fromSpherical: function(phi, theta) {
              throw 'Sorry, not yet implemented!';
            }
          });
        } else if (this.projection === 'ARC') {
          ({
            toSpherical: function(x, y) {
              var phi, r, theta;
              r = Math.sqrt(x * x + y * y);
              theta = _this.wcsobj.theta0 - r;
              phi = WCS.Math.atan2d(x, -y);
              return [phi, theta];
            },
            fromSpherical: function(phi, theta) {
              var r, x, y;
              r = 90 - theta;
              x = r * WCS.Math.sind(phi);
              y = -r * WCS.Math.cosd(phi);
              return [x, y];
            }
          });
        } else if (this.projection === 'AZP') {
          ({
            toSpherical: function(x, y) {
              throw 'Sorry, not yet implemented!';
            },
            fromSpherical: function(phi, theta) {
              throw 'Sorry, not yet implemented!';
            }
          });
        } else if (this.projection === 'NCP') {
          ({
            toSpherical: function(x, y) {
              throw 'Sorry, not yet implemented!';
            },
            fromSpherical: function(phi, theta) {
              throw 'Sorry, not yet implemented!';
            }
          });
        } else if (this.projection === 'SIN') {
          ({
            toSpherical: function(x, y) {
              var phi, r, theta;
              r = Math.sqrt(x * x + y * y);
              theta = WCS.Math.acosd(Math.PI * r / 180);
              phi = WCS.Math.atan2d(x, -y);
              return [phi, theta];
            },
            fromSpherical: function(phi, theta) {
              var r, x, y;
              r = 180 / Math.PI * WCS.Math.cosd(theta);
              x = r * WCS.Math.sind(phi);
              y = -r * WCS.Math.cosd(phi);
              return [x, y];
            }
          });
        } else if (this.projection === 'STG') {
          ({
            toSpherical: function(x, y) {
              var phi, r, theta;
              r = Math.sqrt(x * x + y * y);
              theta = _this.wcsobj.theta0 - 2 * WCS.Math.atand(Math.PI * r / 360);
              phi = WCS.Math.atan2d(x, -y);
              return [phi, theta];
            },
            fromSpherical: function(phi, theta) {
              var r, x, y;
              r = 360 / Math.PI * WCS.Math.tand((90 - theta) / 2);
              x = r * WCS.Math.sind(phi);
              y = -r * WCS.Math.cosd(phi);
              return [x, y];
            }
          });
        } else if (this.projection === 'SZP') {
          ({
            toSpherical: function(x, y) {
              throw 'Sorry, not yet implemented!';
            },
            fromSpherical: function(phi, theta) {
              throw 'Sorry, not yet implemented!';
            }
          });
        } else if (this.projection === 'TAN') {
          ({
            toSpherical: function(x, y) {
              var phi, r, theta;
              r = Math.sqrt(x * x + y * y);
              theta = WCS.Math.atand(180 / (Math.PI * r));
              phi = WCS.Math.atan2d(x, -y);
              return [phi, theta];
            },
            fromSpherical: function(phi, theta) {
              var r, x, y;
              r = 180 / (Math.PI * WCS.Math.tand(theta));
              x = r * WCS.Math.sind(phi);
              y = -r * WCS.Math.cosd(phi);
              return [x, y];
            }
          });
        } else if (this.projection === 'TAN-SIP') {
          ({
            toSpherical: function(x, y) {
              throw 'Sorry, not yet implemented!';
            },
            fromSpherical: function(phi, theta) {
              throw 'Sorry, not yet implemented!';
            }
          });
        } else if (this.projection === 'ZEA') {
          ({
            toSpherical: function(x, y) {
              var phi, r, theta;
              r = Math.sqrt(x * x + y * y);
              theta = _this.wcsobj.theta0 - 2 * WCS.Math.asind(Math.PI * r / 360);
              phi = WCS.Math.atan2d(x, -y);
              return [phi, theta];
            },
            fromSpherical: function(phi, theta) {
              var r, x, y;
              r = 360 / Math.PI * WCS.Math.sind((90 - theta) / 2);
              x = r * WCS.Math.sind(phi);
              y = -r * WCS.Math.cosd(phi);
              return [x, y];
            }
          });
        } else if (this.projection === 'ZPN') {
          ({
            toSpherical: function(x, y) {
              throw 'Sorry, not yet implemented!';
            },
            fromSpherical: function(phi, theta) {
              throw 'Sorry, not yet implemented!';
            }
          });
        }
      }
      if (_ref2 = this.projection, __indexOf.call(cylindrical, _ref2) >= 0) {
        this.wcsobj.phi0 = 0;
        this.wcsobj.theta0 = 90;
        throw 'Sorry, not yet implemented!';
      }
      if (_ref3 = this.projection, __indexOf.call(conic, _ref3) >= 0) {
        this.wcsobj.phi0 = 0;
        this.wcsobj.theta0 = header.hasOwnProperty('PV2_1') ? header['PV2_1'] : 0;
        throw 'Sorry, not yet implemented!';
      }
      if (_ref4 = this.projection, __indexOf.call(polyConic, _ref4) >= 0) {
        this.wcsobj.phi0 = 0;
        this.wcsobj.theta0 = 0;
        throw 'Sorry, not yet implemented!';
      }
      if (_ref5 = this.projection, __indexOf.call(quadCube, _ref5) >= 0) {
        this.wcsobj.phi0 = 0;
        this.wcsobj.theta0 = 0;
        throw 'Sorry, not yet implemented!';
      }
    };

    Mapper.prototype.computeCelestialParameters = function(phi0, theta0) {
      var alpha0, delta0, deltaP1, deltaP2, dist1, dist2, phiP, sol1, sol2, thetaP, _ref;
      _ref = this.wcsobj.crval, alpha0 = _ref[0], delta0 = _ref[1];
      phiP = this.wcsobj.lonpole;
      thetaP = this.wcsobj.latpole;
      deltaP1 = WCS.Math.atan2d(WCS.Math.sind(this.wcsobj.theta0), WCS.Math.cosd(this.wcsobj.theta0 * WCS.Math.cosd(phiP - this.wcsobj.phi0)));
      deltaP2 = WCS.Math.acosd(WCS.Math.sind(delta0) / Math.sqrt(1 - Math.pow(WCS.Math.cosd(this.wcsobj.theta0), 2) * Math.pow(WCS.Math.sind(phiP - this.wcsobj.phi0), 2)));
      sol1 = sol2 = false;
      if (deltaP1 + deltaP2 >= -90 && deltaP1 + deltaP2 <= 90) sol1 = true;
      if (deltaP1 - deltaP2 >= -90 && deltaP1 - deltaP2 <= 90) sol2 = true;
      if (sol1 && sol2) {
        dist1 = Math.abs(deltaP1 + deltaP2 - thetaP);
        dist2 = Math.abs(deltaP1 - deltaP2 - thetaP);
        if (dist1 < dist2) {
          this.wcsobj.deltaP = deltaP1 + deltaP2;
        } else {
          this.wcsobj.deltaP = deltaP1 - deltaP2;
        }
      } else if (sol1) {
        this.wcsobj.deltaP = deltaP1 + deltaP2;
      } else if (sol2) {
        this.wcsobj.deltaP = deltaP1 - deltaP2;
      } else {
        this.wcsobj.deltaP = thetaP;
      }
      if (Math.abs(delta0 === 90)) {
        return this.wcsobj.alphaP = alpha0;
      } else {
        return this.wcsobj.alphaP = alpha0 - WCS.Math.asind(WCS.Math.sind(phiP - this.wcsobj.phi0) * WCS.Math.cosd(this.wcsobj.theta0) / WCS.Math.cosd(delta0));
      }
    };

    Mapper.prototype.toIntermediate = function(points) {
      var i, j, proj, _ref, _ref2;
      proj = [];
      for (i = 0, _ref = this.wcsobj.naxis - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        proj[i] = 0;
        points[i] -= this.wcsobj.crpix[i];
        for (j = 0, _ref2 = this.wcsobj.naxis - 1; 0 <= _ref2 ? j <= _ref2 : j >= _ref2; 0 <= _ref2 ? j++ : j--) {
          proj[i] += this.wcsobj.cdelt[i] * this.wcsobj.pc[i][j] * points[j];
        }
      }
      return proj;
    };

    Mapper.prototype.fromIntermediate = function(proj) {
      var i, j, points, _ref, _ref2;
      points = [];
      for (i = 0, _ref = this.wcsobj.naxis - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        points[i] = 0;
        for (j = 0, _ref2 = this.wcsobj.naxis - 1; 0 <= _ref2 ? j <= _ref2 : j >= _ref2; 0 <= _ref2 ? j++ : j--) {
          points[i] += this.wcsobj.pcInv[i][j] * proj[j] / this.wcsobj.cdelt[i];
        }
        points[i] += this.wcsobj.crpix[i];
      }
      return points;
    };

    Mapper.prototype.toCelestial = function(phi, theta) {
      var cosDecP, cosDphi, cosTheta, dec, ra, sinDecP, sinDphi, sinTheta, xTemp, yTemp, zTemp;
      sinTheta = WCS.Math.sind(theta);
      cosTheta = WCS.Math.cosd(theta);
      sinDphi = WCS.Math.sind(phi - this.wcsobj.lonpole);
      cosDphi = WCS.Math.cosd(phi - this.wcsobj.lonpole);
      sinDecP = WCS.Math.sind(this.wcsobj.delta_p);
      cosDecP = WCS.Math.cosd(this.wcsobj.delta_p);
      xTemp = sinTheta * cosDecP - cosTheta * sinDecP * cosDphi;
      yTemp = -cos_theta * sin_dphi;
      zTemp = sinTheta * sinDecP + cosTheta * cosDecP * cosDphi;
      ra = WCS.Math.atan2d(yTemp, xTemp) + this.wcsobj.alphaP;
      ra = (ra + 360) % 360;
      dec = WCS.Math.asind(zTemp);
      return [ra, dec];
    };

    Mapper.prototype.fromCelestial = function(ra, dec) {
      var cosDalpha, cosDelta, cosDp, phi, sinDalpha, sinDelta, sinDp, theta, xTemp, yTemp;
      sinDelta = WCS.Math.sind(dec);
      cosDelta = WCS.Math.cosd(dec);
      sinDp = WCS.Math.sind(this.wcsobj.deltaP);
      cosDp = WCS.Math.cosd(this.wcsobj.deltaP);
      sinDalpha = WCS.Math.sind(ra - this.wcsobj.alphaP);
      cosDalpha = WCS.Math.cosd(ra - this.wcsobj.alphaP);
      xTemp = sinDelta * cosDp - cosDelta * sinDp * cosDalpha;
      yTemp = -cosDelta * sinDalpha;
      phi = this.wcsobj.lonpole + WCS.Math.atan2d(yTemp, xTemp);
      theta = WCS.Math.asind(sinDelta * sinDp + cosDelta * cosDp * cosDalpha);
      return [phi, theta];
    };

    Mapper.prototype.pixelToCoordinate = function() {
      var coords;
      coords = this.toIntermediate(arguments[0], arguments[1]);
      coords = this.toSpherical(coords[0], coords[1]);
      coords = this.toCelestial(coords[0], coords[1]);
      return {
        ra: coords[0],
        dec: coords[1]
      };
    };

    Mapper.prototype.coordinateToPixel = function() {
      var coords;
      coords = this.fromCelestial(arguments[0], arguments[1]);
      coords = this.fromSpherical(coords[0], coords[1]);
      coords = this.fromIntermediate(coords);
      return {
        x: coords[0],
        y: coords[1]
      };
    };

    return Mapper;

  })();

}).call(this);
