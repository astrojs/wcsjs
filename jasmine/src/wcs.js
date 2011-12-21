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

// FIXME: Function to DMS not representing the shift to the celestial representation
function dd_to_dms(dd) {
	var d, m, s;
	
	d = Math.floor(dd);
	m = Math.floor(60 * Math.abs(dd)) % 60;
	s = (3600 * Math.abs(dd)) % 60;
	s = Math.floor(s * 1000) / 1000;
	return [d, m, s];
}

function dms_to_dd(d, m, s) {
	var dd;
	dd = d + m / 60 + s / 3600;
	return dd;
}


(function () {
	"use strict"
	
	var WCS = function (hdr) {
		
		// Yea, it's a self referential object
		var self = this;
		
		// Parse a JSON object for WCS data
		verify_json(hdr);
		
		// Set the projection
		set_projection(hdr);
		
		/**
		 * Verify that the JSON passed to the WCS object contains the
		 * appropriate keywords to compute celestial coordinates.
		 * 
		 * TODO: Handle CROTA and CD keywords, derive PC matrix from these
		 */
		function verify_json (json) {
			var i, unit, type, crota2, lambda, cd_det, cd_sign;
			
			// Assume 2 dimensional image if WCSAXES not given
			self.wcsaxes = typeof(json.wcsaxes) != 'undefined' ? parseInt(json.wcsaxes) : 2;
			
			// Check that values exist in JSON object
			if (typeof(json.naxis) === 'undefined') {
				throw new Error("Not enough information to compute WCS");
			}
			if (typeof(json.crpix) === 'undefined') {
				throw new Error("Not enough information to compute WCS");
			}
			if (typeof(json.cdelt) === 'undefined') {
				throw new Error("Not enough information to compute WCS");
			}
			if (typeof(json.cunit) === 'undefined') {
				console.log("Assuming units of degrees");
			}
			if (typeof(json.ctype) === 'undefined') {
				console.log("Assuming a Gnomonic (TAN) projection");
			}
			if (typeof(json.crval) === 'undefined') {
				throw new Error("Not enough information to compute WCS");
			}
			if (typeof(json.equinox) === 'undefined') {
				console.log("Assuming 2000");
			}
			
			self.naxis = [];
			self.crpix = [];
			self.cdelt = [];
			self.cunit = [];
			self.ctype = [];
			self.crval = [];
			for (i = 0; i < self.wcsaxes; i += 1) {
				self.naxis.push(parseInt(json.naxis[i]));
				self.crpix.push(parseFloat(json.crpix[i]) - 1);
				self.cdelt.push(parseFloat(json.cdelt[i]));
				unit = typeof(json.cunit[i]) != 'undefined' ? json.cunit[i] : "deg";
				self.cunit.push(unit);
				type = typeof(json.ctype) != 'undefined' ? json.ctype[i] : i === 0 ? "RA---TAN" : "DEC--TAN";
				self.ctype.push(type);
				self.crval.push(json.crval[i]);
			}
			
			// PC Matrix
			// TODO: Compute from CD matrix if given.
			if (typeof(json.pc) != 'undefined') {
				self.pc = [ [parseFloat(json.pc[0]), parseFloat(json.pc[1])], [parseFloat(json.pc[2]), parseFloat(json.pc[3])] ];
			} else {
				// Check for CROTA2
				if (typeof(json.crota2) === 'undefined') {
					if (typeof(json.cd) != 'undefined') {
						// Compute CROTA2 from the CD matrix
						cd_det = parseFloat(json.cd[0]) * parseFloat(json.cd[1]) - parseFloat(json.cd[2]) * parseFloat(json.cd[3]);
						cd_sign = cd_det < 0 ? -1 : 1;
						self.cdelt[0] = Math.sqrt(Math.abs(cd_det)) * cd_sign;
						self.cdelt[1] = Math.sqrt(Math.abs(cd_det));
						crota2 = atand2(-1 * parseFloat(json.cd[1]), parseFloat(json.cd[3]));
						lambda = self.cdelt[1] / self.cdelt[0];
						self.pc = [ [cosd(crota2), -1 * lambda * sind(crota2)], [sind(crota2) / lambda, cosd(crota2)] ];
					} else {
						// Assume the PC matrix to be identity
						self.pc = [ [1, 0], [0, 1] ];
					}
				}
			}
			
			// Inverse PC Matrix
			self.pc_inv = self.matrixInverse(self.pc);

			// TODO: Check the default values for lonpole and latpole ... will depend on the projection
			self.lonpole = typeof(json.lonpole) != 'undefined' ? json.lonpole : 0;
			self.latpole = typeof(json.latpole) != 'undefined' ? json.latpole : 0;
			self.equinox = typeof(json.equinox) != 'undefined' ? json.equinox : 2000;
			self.date_obs = typeof(json.date_obs) != 'undefined' ? json.date_obs : "";
		}
		
		/**
		 * Set the projection of the WCS object.
		 * 
		 * TODO: Clean up the variables, some object attributes are not needed.
		 */
		function set_projection (json) {
			var zenithal, cylindrical, conic, poly_conic, quad_cube, projection;

			// Projections
			zenithal = ['AIR', 'ARC', 'AZP', 'NCP', 'SIN', 'STG', 'SZP', 'TAN', 'ZEA', 'ZPN'];
			cylindrical = ['CYP', 'CEA', 'CAR', 'MER', 'SFL', 'PAR', 'MOL', 'AIT'];
			conic = ['COP', 'COE', 'COD', 'COO'];
			poly_conic = ['BON', 'PCO'];
			quad_cube = ['TSC', 'CSC', 'QSC'];
			
			// Store the projection
			projection = self.ctype[0].slice(5);
			
			if (zenithal.indexOf(projection) > -1) {

				// Zenithal Projections
				self.phi_0 = 0;
				self.theta_0 = 90;
				self.alpha_p = self.crval[0];
				self.delta_p = self.crval[1];

				if (projection === 'AIR') {
					var r, theta, phi, eta, eta_b;

					// Airy projection requires an additional parameter from the FITS header
					self.theta_b = parseFloat(json.pv[3]);

					eta = (self.theta_0 - theta) / 2;
					eta_b = (self.theta_0 - theta_b) / 2;
					r = Math.sqrt(x*x + y*y);
					phi = Math.atan2(x, -y);

					WCS.prototype.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};

				} else if (projection === 'ARC') {

					WCS.prototype.to_spherical = function (x, y) {
						var r, theta, phi;

						r = Math.sqrt(x*x + y*y);
						theta = self.theta_0 - r;
						phi = atan2d(x, -y);

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
						phi = atan2d(x, -y);

				        return [phi, theta]
					};

				} else if (projection === 'STG') {

					WCS.prototype.to_spherical = function (x, y) {

						var r, theta, phi;
						r = Math.sqrt(x*x + y*y);
						theta = self.theta_0 - 2 * atand(Math.PI * r / 360);
						phi = atan2d(x, -y);

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
						phi = atan2d(x, -y);

						return [phi, theta];
					};
					
					WCS.prototype.from_spherical = function (phi, theta) {
						var r, x, y;

						r = 180 / (Math.PI * tand(theta));
						x = r * sind(phi);
						y = -r * cosd(phi);

						return [x, y];
					};

				} else if (projection === 'ZEA') {

					WCS.prototype.to_spherical = function (x, y) {
						var r, theta, phi;

						r = Math.sqrt(x*x + y*y);
						theta = self.theta_0 - 2 * asind(Math.PI * r / 360);
						phi = atan2d(x, -y);

						return [phi, theta];
					};

				} else if (projection === 'ZPN') {

					WCS.prototype.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};

				}
			} else if (cylindrical.indexOf(projection) > -1) {

				// Cylindrical Projections
				compute_celestial_parameters(0, 0);

				if (projection === 'CYP') {

					// Set projection parameters assuming Gall's stereographic projection if parameters are undefined
					self.mu = typeof(json.pv) != 'undefined' ? json.pv.length == 2 ? parseFloat(json.pv[0]) : 1 : 1;
					self.lambda = typeof(json.pv) != 'undefined' ? json.pv.length == 2 ? parseFloat(json.pv[1]) : 1 / Math.sqrt(2) : 1 / Math.sqrt(2);

					WCS.prototype.to_spherical = function (x, y) {
						var nu, theta, phi;

						nu = (Math.PI * y) / (180 * (self.mu + self.lambda));
						theta = atan2d(nu, 1) + asind(nu * self.mu / Math.sqrt(nu * nu + 1));
						phi = x / self.lambda;

						return [phi, theta];
					}

				} else if (projection === 'CEA') {

					// Set projection parameters assuming Lambert's equal area projection if parameter is undefined
					self.lambda = typeof(json.pv) != 'undefined' ? json.pv.length == 1 ? parseFloat(json.pv[0]) : 1 : 1;

					WCS.prototype.to_spherical = function (x, y) {
						var theta, phi;

						theta = asind(Math.PI * self.lambda * y / 180);
						phi = x;

						return [phi, theta];
					}

				} else if (projection === 'CAR') {

					WCS.prototype.to_spherical = function (x, y) {
						return [x, y];
					}

				} else if (projection === 'MER') {

					WCS.prototype.to_spherical = function (x, y) {
						var theta;

						theta = 2 * atand(Math.exp(y * Math.PI / 180)) - 90;
						return [x, theta];
					}

				} else if (projection === 'SFL') {

					WCS.prototype.to_spherical = function (x, y) {
						var phi;

						phi = x / cosd(y);
						return [phi, y];
					}

				} else if (projection === 'PAR') {

					WCS.prototype.to_spherical = function (x, y) {
						var theta, phi;

						theta = 3 * asind(y / 180);
						phi = x / (1 - 4 * Math.pow(y / 180, 2));

						return [phi, theta];
					}

				} else if (projection === 'MOL') {

					WCS.prototype.to_spherical = function (x, y) {
						var theta, phi;

						theta = asind(asind((Math.PI * y) / (180 * Math.sqrt(2))) / 90 + (y / 180) * Math.sqrt(2 - Math.pow(Math.PI * y / 180, 2)))
						phi = (Math.PI * x) / (2 * Math.sqrt(2 - Math.pow(Math.PI * y / 180, 2)));

						return [phi, theta];
					}

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
			} else if (conic.indexOf(projection) > -1) {

				// Conic Projections
				
				// Determine theta_0 from PV parameters
				if (typeof(json.pv) != 'undefined') {
					compute_celestial_parameters(0, parseFloat(json.pv[0]));
				} else {
					throw new Error("Not enough information to compute WCS");
				}

				// Eta defaults to zero if not given
				self.eta = typeof(json.pv[1]) != 'undefined' ? parseFloat(json.pv[1]) : 0;
				
				// Compute theta_1 and theta_2
				self.theta_1 = self.theta_0 - self.eta;
				self.theta_2 = self.theta_0 + self.eta;

				if (projection === 'COP') {

					self.C = sind(self.theta_0);
					self.Y_0 = 180 * cosd(self.eta) / (Math.PI * tand(self.theta_0));

					WCS.prototype.to_spherical = function (x, y) {
						var r, theta_a_sign;

						theta_a_sign = self.theta_0 < 0 ? -1 : 1; 
						r = theta_a_sign * Math.sqrt(x*x + Math.pow(self.Y_0 - y, 2));
						phi = atan2d(x / r , (self.Y_0 - y) / r) / self.C;
						theta = self.theta_0 + atand(1 / atand(self.theta_0) - (Math.PI * r) / (180 * cosd(self.eta)));

						return [phi, theta];
					}

				} else if (projection === 'COE') {					
					WCS.prototype.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};
				} else if (projection === 'COD') {
					
					self.C = (180 / Math.PI) * sind(self.theta_0) * sind(self.eta) / self.eta;
					self.Y_0 = self.eta * (1 / tand(self.eta)) * (1 / tand(self.theta_0));
					
					WCS.prototype.to_spherical = function (x, y) {
						var r, theta_a_sign;

						theta_a_sign = self.theta_0 < 0 ? -1 : 1; 
						r = theta_a_sign * Math.sqrt(x*x + Math.pow(self.Y_0 - y, 2));

						phi = atan2d(x / r , (self.Y_0 - y) / r) / self.C;
						theta = self.theta_0 + self.eta * (1 / tand(self.eta)) * (1 / tand(self.theta_0));

						return [phi, theta];
					};
				} else if (projection === 'COO') {
					WCS.prototype.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};
				}
			} // Put check for Polyconic and pseudoconic projections here
		}
		
		/**
		 * Determine alpha_p and delta_p for correct rotation from spherical to celestial frame
		 */
		function compute_celestial_parameters(phi_0, theta_0) {
			var alpha_0, delta_0, phi_p, theta_p, delta_p1, delta_p2, sol1, sol2, dist1, dist2, alpha_p, delta_p;
			
			self.phi_0 = phi_0;
			self.theta_0 = theta_0;

			alpha_0 = self.crval[0];
			delta_0 = self.crval[1];
			phi_p = self.lonpole;
			theta_p = self.latpole;

			// Compute delta_p
			delta_p1 = atan2d(sind(self.theta_0), cosd(self.theta_0 * cosd(phi_p - self.phi_0)));
			delta_p2 = acosd(sind(delta_0) / Math.sqrt(1 - Math.pow(cosd(self.theta_0), 2) * Math.pow(sind(phi_p - self.phi_0), 2)));

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
					self.delta_p = delta_p1 + delta_p2;
				} else {
					self.delta_p = delta_p1 - delta_p2;
				}
			} else if (sol1) {
				self.delta_p = delta_p1 + delta_p2;
			} else if (sol2) {
				self.delta_p = delta_p1 - delta_p2;
			} else {
				self.delta_p = theta_p;
			}

			// Compute alpha_p
			if (Math.abs(delta_0) === 90) {
				self.alpha_p = alpha_0;
			} else {
				self.alpha_p = alpha_0 - asind(sind(phi_p - self.phi_0) * cosd(self.theta_0) / cosd(delta_0));
			}
		}
		
	};
	
	WCS.prototype = {
		
		to_intermediate: function (points) {
			var i, j, proj;
			proj = [];

			for (i = 0; i < this.wcsaxes; i += 1) {
				proj[i] = 0;
				points[i] -= this.crpix[i];
				for (j = 0; j < this.wcsaxes; j += 1) {
					proj[i] += this.cdelt[i] * this.pc[i][j] * points[j];
				}
			}
			return proj;
		},
		
		
		from_intermediate: function (proj) {
			var i, j, points;
			points = [];
			
			for (i = 0; i < this.wcsaxes; i += 1) {
				points[i] = 0;
				for (j = 0; j < this.wcsaxes; j += 1) {
					points[i] += this.pc_inv[i][j] * proj[j] / this.cdelt[i];
				}
				points[i] += this.crpix[i];
			}
			return points
		},
		
		
		to_celestial: function (phi, theta) {

			var sin_theta, cos_theta, sin_dphi, cos_dphi, sin_dp, cos_dp;
			var x_temp, y_temp, ra, dec;
			
			sin_theta = sind(theta);
			cos_theta = cosd(theta);
			
			sin_dp = sind(this.delta_p);
			cos_dp = cosd(this.delta_p);
			
			sin_dphi = sind(phi - this.lonpole);
			cos_dphi = cosd(phi - this.lonpole);
			
			x_temp = sin_theta * cos_dp - cos_theta * sin_dp * cos_dphi;
			y_temp = -cos_theta * sin_dphi;
			ra = this.alpha_p + atan2d(y_temp, x_temp);
			ra = (ra + 360) % 360;
			dec = asind(sin_theta * sin_dp + cos_theta * cos_dp * cos_dphi);
			
	        return [ra, dec];
		},
		
		
		from_celestial: function (ra, dec) {
			
			var sin_delta, cos_delta, sin_dp, cos_dp, sin_d_alpha, cos_d_alpha, x_temp, y_temp, phi, theta;

			sin_delta = sind(dec);
			cos_delta = cosd(dec);
			sin_dp = sind(this.delta_p);
			cos_dp = cosd(this.delta_p);
			sin_d_alpha = sind(ra - this.alpha_p);
			cos_d_alpha = cosd(ra - this.alpha_p);
			
			x_temp = sin_delta * cos_dp - cos_delta * sin_dp * cos_d_alpha;
			y_temp = -cos_delta * sin_d_alpha;

			phi = this.lonpole + atan2d(y_temp, x_temp);
			theta = asind(sin_delta * sin_dp + cos_delta * cos_dp * cos_d_alpha);

			return [phi, theta];
		},
		
		
		pixelToCoordinate: function () {
			var coords;
			
			coords = this.to_intermediate(arguments[0], arguments[1]);
			coords = this.to_spherical(coords[0], coords[1]);
			coords = this.to_celestial(coords[0], coords[1]);
			
			return {ra: coords[0], dec: coords[1]};
		},
		
		
		coordinateToPixel: function () {
			var coords;
			
			coords = this.from_celestial(arguments[0], arguments[1]);
			coords = this.from_spherical(coords[0], coords[1]);
			coords = this.from_intermediate(coords);
			
			return {x: coords[0], y: coords[1]};
		},
		
		
		matrixInverse: function (mat) {
			var w, h, I, inv, temp, i, j;
			w = mat[0].length;
			h = mat.length;
			I = new Array(h);
			inv = new Array(h);
			temp = [];
			
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
			this.gaussJordan(mat);
			
			for (j = 0; j < h; j += 1) {
				inv[j] = temp[j].slice(w, 2*w);
			}
			return inv;
		},
		
		
		gaussJordan: function (m, eps) {
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
		}
	};

	self.WCS = WCS;
}());