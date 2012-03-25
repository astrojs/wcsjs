// Define the namespace
WCS.Math = {};

// Define multiples to convert units
WCS.Math.R2D = 180 / Math.PI;
WCS.Math.D2R = Math.PI / 180;
WCS.Math.WCSTRIG_TOL = 1e-10;

WCS.Math.cosd = function (angle) {
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

WCS.Math.sind = function (angle) {
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
	
WCS.Math.sincosd = function (angle) {
	var i, s, c;
	if (angle % 90 === 0) {
		i = Math.abs(Math.floor(angle / 90 + 0.5)) % 4;
		switch (i) {
			case 0:
				s = 0;
				c = 1;
				return s * c;
			case 1:
				s = (angle > 0) ? 1 : -1;
				c = 0;
				return s * c;
			case 2:
				s = 0;
				c = -1;
				return s * c;
			case 3:
				s = (angle > 0) ? -1 : 1;
				c = 0;
				return s * c;
		}
	}
	s = Math.sin(angle * WCS.Math.D2R);
	c = Math.cos(angle * WCS.Math.D2R);
	return s * c;
};
	
WCS.Math.tand = function (angle) {
	var resid;
	
	resid = angle % 360;
	if (resid === 0 || Math.abs(resid) === 180) {
		return 0;
	} else if (resid === 45 || resid === 225) {
		return 1;
	} else if (resid === -135 || resid === -315) {
		return -1
	}
	
	return Math.tan(angle * WCS.Math.D2R);
};
	
WCS.Math.acosd = function (v) {
	if (v >= 1) {
		if (v - 1 < WCS.Math.WCSTRIG_TOL) {
			return 0;
		}
	} else if (v === 0) {
		return 90;
	} else if (v <= -1) {
		if (v + 1 > -WCS.Math.WCSTRIG_TOL) {
			return 180;
		}
	}
	
	return Math.acos(v) * WCS.Math.R2D;
};
	
WCS.Math.asind = function(v) {
	if (v <= -1) {
		if (v + 1 > -WCS.Math.WCSTRIG_TOL) {
			return -90;
		}
	} else if (v === 0) {
		return 0;
	} else if (v >= 1) {
		if (v - 1 < WCS.Math.WCSTRIG_TOL) {
			return 90;
		}
	}
	
	return Math.asin(v) * WCS.Math.R2D;
};
	
WCS.Math.atand = function (v) {
	if (v === -1) {
		return -45;
	} else if (v === 0) {
		return 0;
	} else if (v === 1) {
		return 45;
	}
	
	return Math.atan(v) * WCS.Math.R2D;
};
	
WCS.Math.atan2d = function (y, x) {
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

// FIXME: Function to DMS not representing the shift to the celestial representation
WCS.Math.dd_to_dms = function (dd) {
	var d, m, s;
	
	d = Math.floor(dd);
	m = Math.floor(60 * Math.abs(dd)) % 60;
	s = (3600 * Math.abs(dd)) % 60;
	s = Math.floor(s * 1000) / 1000;
	return [d, m, s];
};
	
WCS.Math.dms_to_dd = function (d, m, s) {
	var dd;
	dd = d + m / 60 + s / 3600;
	return dd;
};

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


WCS.Math.determinant = function (mat) {
	var m, det, n, k, i;
	
	m = WCS.Math.toRightTriangular(mat);
	det = m[0][0];
	n = m.length - 1;
	k = n;
	i;
	
	do {
		i = k - n + 1;
		det = det * m[i][i];
	} while (--n);
	
	return det;	
};


WCS.Math.matrixInverse = function (m) {
	var w, h, I, inv, temp, mat, i, j;
	w = m[0].length;
	h = m.length;
	I = new Array(h);
	inv = new Array(h);
	temp = [];
	
	// Clone the array
	mat = [];
	for (j = 0; j < h; j += 1) {
		mat[j] = [];
		for (i = 0; i < w; i += 1) {
			mat[j][i] = m[j][i];
		}
	}

	// Initialize an identity matrix of the correct dimensions
	for (j = 0; j < h; j +=1 ) {
		I[j] = new Array(w);
		inv[j] = new Array(w);
		for (i = 0; i < w; i += 1) {
			I[j][i] = i === j ? 1 : 0;
		}
		
		// Append the identity matrix to the original matrix
		temp[j] = mat[j].concat(I[j]);
	}
	
	// Gauss-Jordan
	WCS.Math.gaussJordan(temp);
	
	for (j = 0; j < h; j += 1) {
		inv[j] = temp[j].slice(w, 2*w);
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
};