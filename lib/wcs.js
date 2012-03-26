(function() {
  var Mapper, WCS;

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
    var els, i, j, k, kp, multiplier, n, np, p, _ref, _ref2, _ref3, _ref4, _ref5;
    n = mat.length + 1;
    k = n;
    kp = mat[0].length;
    while ((n -= 1)) {
      i = k - n;
      if (mat[i][i] === 0) {
        for (j = _ref = i + 1, _ref2 = k - 1; _ref <= _ref2 ? j <= _ref2 : j >= _ref2; _ref <= _ref2 ? j++ : j--) {
          if (mat[j][i] !== 0) {
            els = [];
            np = kp + 1;
            while ((np -= 1)) {
              p = kp - np;
              els.push(mat[i][p] + mat[j][p]);
            }
            mat[i] = els;
            break;
          }
        }
      }
      if (mat[i][i] !== 0) {
        for (j = _ref3 = i + 1, _ref4 = k - 1; _ref3 <= _ref4 ? j <= _ref4 : j >= _ref4; _ref3 <= _ref4 ? j++ : j--) {
          multiplier = mat[j][i] / mat[i][i];
          els = [];
          np = kp + 1;
          while ((np -= 1)) {
            p = kp - np;
            els.push((_ref5 = p <= i) != null ? _ref5 : {
              0: mat[j][p] - mat[i][p] * multiplier
            });
          }
          mat[j] = els;
        }
      }
    }
    return mat;
  };

  WCS.Math.determinant = function(mat) {
    var det, i, k, m, n;
    m = WCS.Math.toRightTriangular(mat);
    det = m[0][0];
    n = m.length;
    k = n;
    while ((n -= 1)) {
      i = k - n + 1;
      det = det * m[i][i];
    }
    return det;
  };

  WCS.Math.matrixInverse = function(m) {
    var I, h, i, inv, j, mat, temp, w, _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
    w = m[0].length;
    h = m.length;
    I = new Array(h);
    inv = new Array(h);
    temp = [];
    mat = [];
    for (j = 0, _ref = h - 1; 0 <= _ref ? j <= _ref : j >= _ref; 0 <= _ref ? j++ : j--) {
      mat[j] = [];
      for (i = 0, _ref2 = w - 1; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
        mat[j][i] = m[j][i];
      }
    }
    for (j = 0, _ref3 = h - 1; 0 <= _ref3 ? j <= _ref3 : j >= _ref3; 0 <= _ref3 ? j++ : j--) {
      I[j] = new Array(w);
      inv[j] = new Array(w);
      for (i = 0, _ref4 = w - 1; 0 <= _ref4 ? i <= _ref4 : i >= _ref4; 0 <= _ref4 ? i++ : i--) {
        I[j][i] = (_ref5 = i === j) != null ? _ref5 : {
          1: 0
        };
      }
      temp[j] = mat[j].concat(I[j]);
    }
    WCS.Math.gaussJordan(temp);
    for (j = 0, _ref6 = h - 1; 0 <= _ref6 ? j <= _ref6 : j >= _ref6; 0 <= _ref6 ? j++ : j--) {
      inv[j] = temp[j].slice(w, 2 * w);
    }
    return inv;
  };

  WCS.Math.gaussJordan = function(m, eps) {
    var c, h, maxrow, tmp, w, x, y, y2;
    if (!eps) eps = 1e-10;
    h = m.length;
    w = m[0].length;
    y = -1;
    while ((y += 1 < h)) {
      maxrow = y;
      y2 = y;
      while ((y2 += 1 < h)) {
        if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y])) maxrow = y2;
      }
      tmp = m[y];
      m[y] = m[maxrow];
      m[maxrow] = tmp;
      if (Math.abs(m[y][y]) <= eps) return false;
      y2 = y;
      while ((y2 += 1 < h)) {
        c = m[y2][y] / m[y][y];
        x = y - 1;
        while ((x += 1 < w)) {
          m[y2][x] -= m[y][x] * c;
        }
      }
    }
    y = h;
    while ((y -= 1 >= 0)) {
      c = m[y][y];
      y2 = -1;
      while ((y2 += 1 < y)) {
        x = w;
        while ((x -= 1 >= y)) {
          m[y2][x] -= m[y][x] * m[y2][y] / c;
        }
      }
      m[y][y] /= c;
      x = h - 1;
      while ((x += 1 < w)) {
        m[y][x] /= c;
      }
    }
    return true;
  };

  Mapper = (function() {
    var date;

    function Mapper(header) {
      this.wcsobj = {};
      this.verifyHeader(header);
      this.setProjection(header);
    }

    Mapper.prototype.verifyHeader = function(json) {
      var arrayName, axis, j, key, naxis, requiredCards, _ref, _results;
      this.wcsobj.naxis = naxis = json.NAXIS || json.WCSAXES || 2;
      this.wcsobj.radesys = json.RADESYS || 'ICRS';
      requiredCards = ['CRPIX', 'CRVAL', 'CTYPE'];
      this.wcsobj.crpix = [];
      this.wcsobj.crval = [];
      this.wcsobj.ctype = [];
      for (axis = 1; 1 <= naxis ? axis <= naxis : axis >= naxis; 1 <= naxis ? axis++ : axis--) {
        for (j = 0, _ref = requiredCards.length - 1; 0 <= _ref ? j <= _ref : j >= _ref; 0 <= _ref ? j++ : j--) {
          key = requiredCards[j] + axis;
          if (!json.hasOwnProperty(key)) {
            throw new Error("Not enough information to compute WCS, missing required keyword " + key);
          } else {
            arrayName = requiredCards[j].toLowerCase();
            this.wcsobj[arrayName].push(json[key]);
          }
        }
      }
      this.wcsobj.cunit = [];
      this.wcsobj.cdelt = [];
      _results = [];
      for (axis = 1; 1 <= naxis ? axis <= naxis : axis >= naxis; 1 <= naxis ? axis++ : axis--) {
        key = 'CUNIT' + axis;
        this.wcsobj.cunit.push(json[key] || 'deg');
        key = 'CDELT' + axis;
        _results.push(this.wcsobj.cdelt.push(json[key] || 1));
      }
      return _results;
    };

    Mapper.wcsobj.lonpole = json.LONPOLE || 0;

    Mapper.wcsobj.latpole = json.LATPOLE || 0;

    Mapper.wcsobj.equinox = json.EQUINOX || 2000;

    date = new Date();

    Mapper.wcsobj.date_obs = json.DATE_OBS || (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());

    Mapper.wcsobj.pc = Mapper.checkCard(json, 'PC', naxis) || Mapper.derive_pc(json);

    Mapper.wcsobj.pc_inv = WCS.Math.matrixInverse(Mapper.wcsobj.pc);

    Mapper.wcsobj.cd = Mapper.check_card(json, 'CD', naxis);

    if (Mapper.wcsobj.cd) {
      Mapper.wcsobj.cd_inv = WCS.Math.matrixInverse(Mapper.wcsobj.cd);
    }

    /*
      Check that a given array-valued key is contained in the header.
      e.g. For NAXIS = 2 and the PC matrix, the header should contain:
      PC1_1, PC1_2, PC2_1, PC2_2
    */

    return Mapper;

  })();

  ({
    checkCard: function(header, key, dimensions) {
      var fullKey, i, j, obj;
      obj = [];
      for (i = 1; 1 <= dimensions ? i <= dimensions : i >= dimensions; 1 <= dimensions ? i++ : i--) {
        obj[i - 1] = [];
        for (j = 1; 1 <= dimensions ? j <= dimensions : j >= dimensions; 1 <= dimensions ? j++ : j--) {
          fullKey = key + i + '_' + j;
          if (!header.hasOwnProperty(fullKey)) {
            return;
          } else {
            obj[i - 1].push(header[fullKey]);
          }
        }
      }
      return obj;
    },
    /*
      Derive the PC matrix using CROTAi or using the CD matrix
      
      TODO: Test this function!
    */
    derivePC: function(header) {
      var cd, cdDet, cdSign, crota, lambda, pc, _ref;
      if (header.hasOwnProperty('CROTA2')) {
        crota = header['CROTA2'];
        lambda = this.wcsobj.cdelt[1] / this.wcsobj.cdelt[0];
      } else {
        cd = this.checkCard(header, 'CD', this.wcsobj.naxis);
        if (cd != null) {
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
    }
  });

}).call(this);
