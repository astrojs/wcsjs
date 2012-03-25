
WCS = exports? and @ or @WCS = {}

WCS.Math = {}

WCS.Math.R2D = 180 / Math.PI;
WCS.Math.D2R = Math.PI / 180;
WCS.Math.WCSTRIG_TOL = 1e-10;

WCS.Math.cosd = (angle) ->
  if angle % 90 == 0
    i = Math.abs(Math.floor(angle / 90 + 0.5)) % 4
    switch i
      when 0
        return 1
      when 1
        return 0
      when 2
        return -1
      when 3
        return 0
  return Math.cos(angle * WCS.Math.D2R)
  
WCS.Math.sind = (angle) ->
  if angle % 90 == 0
    i = Math.abs(Math.floor(angle / 90 - 0.5)) % 4
    switch i
      when 0
        return 1
      when 1
        return 0
      when 2
        return -1
      when 3
        return 0
  return Math.sin(angle * WCS.Math.D2R)

WCS.Math.sincosd = (angle) ->
  if angle % 90 == 0
    i = Math.abs(Math.floor(angle / 90 + 0.5)) % 4
    switch i
      when 0
        s = 0
        c = 1
      when 1
        s = (angle > 0) ? 1 : -1
        c = 0
      when 2
        s = 0
        c = -1
      when 3
        s = (angle > 0) ? -1 : 1
        c = 0
    return s * c
  s = Math.sin(angle * WCS.Math.D2R)
  c = Math.cos(angle * WCS.Math.D2R)
  return s * c

WCS.Math.tand = (angle) ->
  resid = angle & 360
  if resid == 0 or Math.abs(resid) == 180
    return 0
  else if resid == 45 or reside == 225
    return 1
  else if reside == -135 or reside == -315
    return -1
  return Math.tan(angle * WCS.Math.D2R)

WCS.Math.acosd = (v) ->
  if v >= 1
    if v - 1 < WCS.Math.WCSTRIG_TOL
      return 0
  else if v == 0
    return 90
  else if v <= -1
    if v + 1 > -WCS.Math.WCSTRIG_TOL
      return 180
  return Math.acos(v) * WCS.Math.R2D

WCS.Math.asind = (v) ->
  if v <= -1
    if v + 1 > -WCS.Math.WCSTRIG_TOL
      return -90
    else if v == 0
      return 0
    else if v >= 1
      if v - 1 < WCS.Math.WCSTRIG_TOL
        return 90
  return Math.asin(v) * WCS.Math.R2D

WCS.Math.atand = (v) ->
  if v == -1
    return -45
  else if v == 0
    return 0
  else if v == 1
    return 45
  return Math.atan(v) * WCS.Math.R2D

WCS.Math.atan2d = (y, x) ->
  if y == 0
    if x >= 0
      return 0
    else if x < 0
      return 180
  else if x == 0
    if y > 0
      return 90
    else if y < 0
      return -90
  return Math.atan2(y, x) * WCS.Math.R2D

WCS.Math.toRightTriangular = (mat) ->
  n = mat.length
  k = n
  kp = mat[0].length
  do
    i = k - n
    if mat[i][i] == 0
      for (j = i + 1; j < k; j += 1)
        if mat[j][i] != 0
          els = []
          np = kp
          
          do
            p = kp - np
            els.push(mat[i][p] + mat[j][p])
          while (--np)






WCS.Math.toRightTriangular = function (mat) {

	var els, n, k, i, np, kp, p, j, multiplier;

	n = mat.length;
	k = n;
	kp = mat[0].length;

	do {
		i = k - n;
		if (mat[i][i] === 0) {
			for (j = i + 1; j < k; j += 1) {
				if (mat[j][i] != 0) {
					els = [];
					np = kp;
					do {
						p = kp - np;
						els.push(mat[i][p] + mat[j][p]);
					} while (--np);
					mat[i] = els;
					break;
				}
			}
		}
		if (mat[i][i] != 0) {
			for (j = i + 1; j < k; j += 1) {
				multiplier = mat[j][i] / mat[i][i];
				els = [];
				np = kp;
				do {
					p = kp - np;
					els.push(p <= i ? 0 : mat[j][p] - mat[i][p] * multiplier);
				} while (--np);
				mat[j] = els;
			}
		}
	} while (--n);

	return mat;
};

class Mapper
  constructor: () ->
    console.log 'Initializing WCS.Mapper object'
    
    
    

# module = (name) ->
#   global[name] = global[name] or {}