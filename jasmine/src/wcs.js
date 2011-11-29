// AZP (zenithal/azimuthal perspective)
// SZP (slant zenithal perspective)
// TAN (gnomonic)
// STG (stereographic)
// SIN (orthographic/synthesis)
// ARC (zenithal/azimuthal equidistant)
// ZPN (zenithal/azimuthal polynomial)
// ZEA (zenithal/azimuthal equal area)
// AIR (Airy)
// CYP (cylindrical perspective)
// CEA (cylindrical equal area)
// CAR (Plate carree)
// MER (Mercator)
// SFL (Sanson-Flamsteed)
// PAR (parabolic)
// MOL (Mollweide)
// AIT (Hammer-Aitoff)
// COP (conic perspective)
// COE (conic equal area)
// COD (conic equidistant)
// COO (conic orthomorphic)
// BON (Bonne)
// PCO (polyconic)
// TSC (tangential spherical cube)
// CSC (COBE spherical cube)
// QSC (quadrilateralized spherical cube)
// HPX (HEALPix)


// Define multiples to convert units
var R2D = 180 / Math.PI;
var D2R = Math.PI / 180;
var WCSTRIG_TOL = 1e-10;

function cosd(angle) {
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

	return Math.cos(angle * D2R);
}

function sind(angle) {
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

	return Math.sin(angle * D2R);
}

function sincosd(angle) {
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
	s = Math.sin(angle * D2R);
	c = Math.cos(angle * D2R);
	return s * c;
}

function tand(angle) {
	var resid;
	
	resid = angle % 360;
	if (resid === 0 || Math.abs(resid) === 180) {
		return 0;
	} else if (resid === 45 || resid === 225) {
		return 1;
	} else if (resid === -135 || resid === -315) {
		return -1
	}

	return Math.tan(angle * D2R);
}

function acosd(v) {
	if (v >= 1) {
		if (v - 1 < WCSTRIG_TOL) {
			return 0;
		}
	} else if (v === 0) {
		return 90;
	} else if (v <= -1) {
		if (v + 1 > -WCSTRIG_TOL) {
			return 180;
		}
	}
	
	return Math.acos(v) * R2D;
}

function asind(v) {
	if (v <= -1) {
		if (v + 1 > -WCSTRIG_TOL) {
			return -90;
		}
	} else if (v === 0) {
		return 0;
	} else if (v >= 1) {
		if (v - 1 < WCSTRIG_TOL) {
			return 90;
		}
	}

	return Math.asin(v) * R2D;
}

function atand(v) {
	if (v === -1) {
		return -45;
	} else if (v === 0) {
		return 0;
	} else if (v === 1) {
		return 45;
	}

	return Math.atan(v) * R2D;
}

function atan2d(y, x) {
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

	return Math.atan2(y, x) * R2D;
}


(function () {
	"use strict"
	
	var WCS = function (hdr) {
		
		var zenithal, cylindrical, projection;
		
		// Projections
		zenithal = ['AIR', 'ARC', 'AZP', 'NCP', 'SIN', 'STG', 'SZP', 'TAN', 'ZEA', 'ZPN'];
		cylindrical = ['CYP', 'CEA', 'CAR', 'MER', 'SFL', 'PAR', 'MOL', 'AIT'];

		// Parse a JSON object for WCS data
		this.wcsaxes = parseInt(hdr.wcsaxes);
		this.naxis = [parseInt(hdr.naxis1), parseInt(hdr.naxis2)];
		this.crpix = [parseFloat(hdr.crpix1) - 1, parseFloat(hdr.crpix2) - 1];
		
		// Check for the PC matrix
		if (typeof(hdr.pc1_1) === 'undefined') {
			this.pc = [[1, 0], [0, 1]];
		} else {
			this.pc = [
				[parseFloat(hdr.pc1_1), parseFloat(hdr.pc1_2)],
				[parseFloat(hdr.pc2_1), parseFloat(hdr.pc2_2)]
			];	
		}
		this.cdelt = [parseFloat(hdr.cdelt1), parseFloat(hdr.cdelt2)];
		this.cunit = [hdr.cunit1, hdr.cunit2];
		this.ctype = [hdr.ctype1, hdr.ctype2];
		this.crval = [parseFloat(hdr.crval1), parseFloat(hdr.crval2)];
		this.lonpole = parseFloat(hdr.lonpole);
		this.latpole = parseFloat(hdr.latpole);
		this.date_obs = hdr.date_obs;
		
		// Store the projection
		projection = this.ctype[0].slice(5);
		
		if (zenithal.indexOf(projection) > -1) {

			// Zenithal Projections
			this.phi_0 = 0;
			this.theta_0 = 90;
			this.alpha_p = this.crval[0];
			this.delta_p = this.crval[1];
			
			if (projection === 'AIR') {
				var r, theta, phi, eta, eta_b;

				// Airy projection requires an additional parameter from the FITS header
				this.theta_b = parseFloat(hdr.pv2_1);
				
				eta = (this.theta_0 - theta) / 2;
				eta_b = (this.theta_0 - theta_b) / 2;
				r = Math.sqrt(x*x + y*y);
				phi = Math.atan2(x, -y);
				
				WCS.prototype.to_spherical = function (x, y) {
					throw new Error('Sorry, not yet implemented!');
				};
				
			} else if (projection === 'ARC') {

				WCS.prototype.to_spherical = function (x, y) {
					var r, theta, phi;

					r = Math.sqrt(x*x + y*y);
					theta = this.theta_0 - r;
					phi = Math.atan2(-y, x);

					return [phi, theta];
				};

			} else if (projection === 'AZP') {

				WCS.prototype.to_spherical = function (x, y) {
					throw new Error('Sorry, not yet implemented!');
				};

			} else if (projection === 'NCP') {

				WCS.prototype.to_spherical = function (x, y) {
					throw new Error('Sorry, not yet implemented!');
				};

			} else if (projection === 'SIN') {

				WCS.prototype.to_spherical = function (x, y) {

					var r, theta, phi;
					r = Math.sqrt(x*x + y*y);
					theta = acosd(Math.PI * r / 180);
					phi = atan2d(-y, x);

			        return [phi, theta]
				};

			} else if (projection === 'STG') {

				WCS.prototype.to_spherical = function (x, y) {
					
					var r, theta, phi;
					r = Math.sqrt(x*x + y*y);
					theta = this.theta_0 - 2 * atand(Math.PI * r / 360);
					phi = atan2d(-y, x);

			        return [phi, theta];
					
				};

			} else if (projection === 'SZP') {

				WCS.prototype.to_spherical = function (x, y) {
					throw new Error('Sorry, not yet implemented!');
				};

			} else if (projection === 'TAN') {

				WCS.prototype.to_spherical = function (x, y) {
					var r, theta, phi;

					r = Math.sqrt(x*x + y*y);
					theta = atand(180 / (Math.PI * r));
					phi = atan2d(-y, x);

					return [phi, theta];
				};

			} else if (projection === 'ZEA') {

				WCS.prototype.to_spherical = function (x, y) {
					var r, theta, phi;

					r = Math.sqrt(x*x + y*y);
					theta = this.theta_0 - 2 * asind(Math.PI * r / 360);
					phi = atan2d(-y, x);

					return [phi, theta];
				};

			} else if (projection === 'ZPN') {

				WCS.prototype.to_spherical = function (x, y) {
					throw new Error('Sorry, not yet implemented!');
				};

			}
		} else if (cylindrical.indexOf(projection) > -1) {
			
			var alpha_0, delta_0, phi_p, theta_p, delta_p1, delta_p2;
			var sol1, sol2, dist1, dist2;
			
			// Cylindrical Projections
			this.phi_0 = 0;
			this.theta_0 = 0;
			
			alpha_0 = this.crval[0];
			delta_0 = this.crval[1];
			phi_p = this.lonpole;
			theta_p = this.latpole;
			
			// Compute delta_p
			delta_p1 = atan2d(sind(this.theta_0), cosd(this.theta_0 * cosd(phi_p - this.phi_0)));
			delta_p2 = acosd(sind(delta_0) / Math.sqrt(1 - Math.pow(cosd(this.theta_0), 2) * Math.pow(sind(phi_p - this.phi_0), 2)));
			
			// Choose the appropriate solution for delta_p
			// Either	(1) Two solutions in range [-90, 90]
			//			(2) One solution in range [-90, 90]
			//			(3) No solutions in range [-90, 90]
			sol1 = sol2 = false;
			if (delta_p1 + delta_p2 >= -90 && delta_p1 + delta_p2 <= 90 ) {
				sol1 = true;
			}
			if (delta_p1 - delta_p2 >= -90 && delta_p1 - delta_p2 <= 90 ) {
				sol2 = true;
			}
			if (sol1 && sol2) {
				dist1 = Math.abs(delta_p1 + delta_p2 - theta_p);
				dist2 = Math.abs(delta_p1 - delta_p2 - theta_p);
				if (dist1 < dist2) {
					this.delta_p = delta_p1 + delta_p2;
				} else {
					this.delta_p = delta_p1 - delta_p2;
				}
			} else if (sol1) {
				this.delta_p = delta_p1 + delta_p2;
			} else if (sol2) {
				this.delta_p = delta_p1 - delta_p2;
			} else {
				this.delta_p = theta_p;
			}
			
			// Compute alpha_p
			if (Math.abs(delta_0) === 90) {
				this.alpha_p = alpha_0;
			} else {
				this.alpha_p = alpha_0 - asind(sind(phi_p - this.phi_0) * cosd(this.theta_0) / cosd(delta_0));
			}

			if (projection === 'CYP') {
				
				// Set additional projection parameters
				this.mu = hdr.pv2_1;
				this.lambda = hdr.pv2_2;
				
				WCS.prototype.to_spherical = function (x, y) {
					var nu, theta, phi;

					nu = (Math.PI * y) / (180 * this.mu + this.lambda);
					theta = atan2d(nu, 1) + asind(nu * this.mu / Math.sqrt(nu * nu + 1));
					phi = x / this.lambda;

					return [phi, theta];
				}
				
			} else if (projection === 'CEA') {
				
			} else if (projection === 'CAR') {
				
			} else if (projection === 'MER') {
				
			} else if (projection === 'SFL') {
				
			} else if (projection === 'PAR') {
				
			} else if (projection === 'MOL') {
				
			} else if (projection === 'AIT') {

				WCS.prototype.to_spherical = function (x, y) {
					var z, x_z, y_z, theta, phi;
					
					x_z = Math.pow((Math.PI * x) / (4 * 180), 2);
					y_z = Math.pow((Math.PI * y) / (2 * 180), 2);
					z = Math.sqrt(1 - x_z - y_z);
					theta = asind(Math.PI * y * z / 180);
					phi = 2 * atan2d(Math.PI * z * x / (2 * 180), 2 * z * z - 1);

					return [phi, theta];
				};
			}
			
			
		}
	};
	
	WCS.prototype = {
		
		to_intermediate: function (points) {
			var i, proj;

			for (i = 0; i < this.wcsaxes; i += 1) {
				points[i] -= this.crpix[i];
			}
			proj = [];
			proj.push(this.cdelt[0] * (this.pc[0][0] * points[0] + this.pc[0][1] * points[1]));
			proj.push(this.cdelt[1] * (this.pc[1][0] * points[0] + this.pc[1][1] * points[1]));

			return proj;
		},

		to_celestial: function (phi, theta) {
			var alpha_p, delta_p, phi_p, alpha, delta, x, y;

			alpha_p = this.alpha_p;
			delta_p = this.delta_p;
			phi_p = this.lonpole;

			x = -1 * cosd(theta) * sind(phi - phi_p);
			y = sind(theta) * cosd(delta_p) - cosd(theta) * sind(delta_p) * cosd(phi - phi_p);
			
			alpha = alpha_p + atan2d(y, x);
			alpha += (2 * 180);
			alpha = alpha % (2 * 180);
			delta = asind(sind(theta) * sind(delta_p) + cosd(theta) * cosd(delta_p) * cosd(phi - phi_p));

			return [alpha, delta];
		},
		
		pix_to_sky: function (points) {
			var coords;

			coords = this.to_intermediate(points);
			coords = this.to_spherical(coords[0], coords[1]);
			coords = this.to_celestial(coords[0], coords[1]);

			return coords;
		},
		
		dd_to_dms: function (dd) {
			var d, m, s;
			
			d = Math.floor(dd);
			m = Math.floor(60 * Math.abs(dd)) % 60;
			s = (3600 * Math.abs(dd)) % 60;
			s = Math.floor(s * 1000) / 1000;
			return [d, m, s];
		},
		
		dms_to_dd: function (d, m, s) {
			var dd;
			dd = d + m / 60 + s / 3600;
			return dd;
		}

	};

	self.WCS = WCS;
}());