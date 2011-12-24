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


(function () {
	"use strict"
	
	var root, WCS;
	
	// Save reference to the global object
	root = this;
	
	// The top-level namespace
	if (typeof(exports) !== 'undefined') {
		WCS = exports;
	} else {
		WCS = root.WCS = root.WCS || {};
	}
	
	WCS.version = '0.0.2';
	
	WCS.Mapper = function (hdr) {
		
		var self, wcsobj;
		
		// Create reference to the Mapper object
		self = this;
		
		// WCS object to hold FITS keywords relevant to WCS
		self.wcsobj = {};
        
		// Parse a JSON object for WCS data
		verify_header(hdr);
		
		// Set the projection
		set_projection(hdr);


		/**
		 * Verify that the JSON passed to the WCS object contains the
		 * appropriate keywords to compute celestial coordinates.
		 * 
		 * TODO: Handle CROTA and CD keywords, derive PC matrix from these
		 */
		function verify_header (json) {
			var naxis, axiskw_req, key, axis, j, arrayname, date, pc;
			
			// Assume 2 dimensional image if NAXIS or WCSAXES not given
			self.wcsobj.naxis = naxis = json.NAXIS || json.WCSAXES || 2;
			self.wcsobj.radesys = json.RADESYS || 'ICRS';
			
			axiskw_req = ['CRPIX', 'CRVAL', 'CTYPE'];
			self.wcsobj.crpix = [];
			self.wcsobj.crval = [];
			self.wcsobj.ctype = [];
			
			// Check that required values exist in JSON object
			for (axis = 1; axis <= naxis; axis += 1) {
				for (j = 0; j < axiskw_req.length; j += 1) {
					key = axiskw_req[j] + axis;
					if (!json.hasOwnProperty(key)) {
						throw new Error("Not enough information to compute WCS, missing required keyword " + key);
					} else {
						arrayname = axiskw_req[j].toLowerCase();
						self.wcsobj[arrayname].push(json[key]);
					}
				}
			}

			// Check for CUNIT and CDELT, defaulting to degrees and unity, respectively
			// TODO: When CUNIT is not degrees, relevant values need to be converted
			self.wcsobj.cunit = [];
			self.wcsobj.cdelt = [];
			for (axis = 1; axis <= naxis; axis += 1) {
				key = 'CUNIT' + axis;
				self.wcsobj.cunit.push(json[key] || 'deg');
				key = 'CDELT' + axis;
				self.wcsobj.cdelt.push(json[key] || 1);
			}

			// LONPOLE and LATPOLE default to values appropriate for a zenithal projection
			self.wcsobj.lonpole = json.LONPOLE || 0;
			self.wcsobj.latpole = json.LATPOLE || 0;
			
			// EQUINOX defaults to 2000 if not given
			self.wcsobj.equinox = json.EQUINOX || 2000; 
			
			// DATE_OBS defaults to today
			date = new Date();
			self.wcsobj.date_obs = json.DATE_OBS || (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
			
			// Attempt to derive the PC matrix when not given, otherwise default to identity
			self.wcsobj.pc = check_card(json, 'PC', naxis) || derive_pc(json);
			
			// Store the CD matrix if given
			self.wcsobj.cd = check_card(json, 'CD', naxis);
			
			// Inverse PC Matrix
			self.wcsobj.pc_inv = WCS.Math.matrixInverse(self.wcsobj.pc);
		}
		
		
		/*
		 * Check that a given array-valued key is contained in the header.
		 * 
		 * e.g. For NAXIS = 2 and the PC matrix, the header should contain:
		 * 
		 * PC1_1, PC1_2, PC2_1, PC2_2
		 * 
		 */
		function check_card(header, key, dimensions) {
			var i, j, full_key, obj;

			// console.log(header, key, dimensions, offset);
			obj = [];
			for (i = 1; i <= dimensions; i += 1) {
				obj[i-1] = [];
				for (j = 1; j <= dimensions; j += 1) {
					full_key = key + i + '_' + j;
					if (!header.hasOwnProperty(full_key)) {
						return;
					} else {
						obj[i-1].push(header[full_key]);
					}
				}
			}
			return obj;
		}
		
		/*
		 * Derive the PC matrix using CROTAi or from the CD matrix.
		 *
		 * TODO: Test this function!!!
		 */
		function derive_pc(header) {
			var crota, lambda, pc, cd, cd_det, cd_sign;
			
			if (header.hasOwnProperty('CROTA2')) {
				crota = header['CROTA2'];
				lambda = self.wcsobj.cdelt[1] / self.wcsobj.cdelt[0];
			} else {
				cd = check_card(header, 'CD', self.wcsobj.naxis);
				if (typeof(cd) === 'undefined') {
					crota = 0;
					lambda = 1;
				} else {
					// TODO: Generalize for larger matrices
					cd_det = WCS.Math.determinant(cd);
					cd_sign = cd_det < 0 ? -1 : 1;
					self.wcsobj.cdelt[0] = Math.sqrt(Math.abs(cd_det)) * cd_sign;
					self.wcsobj.cdelt[1] = Math.sqrt(Math.abs(cd_det));
					crota = WCS.Math.atan2d(-1 * cd[0][1], cd[1][1]);
					lambda = self.wcsobj.cdelt[1] / self.wcsobj.cdelt[0];		
				}
			}

			pc = [[WCS.Math.cosd(crota), -lambda * WCS.Math.sind(crota)], [WCS.Math.sind(crota) / lambda, WCS.Math.cosd(crota)]];
			return pc;
		}
		
		/*
		 * Set the projection of the WCS object.
		 * 
		 * TODO: Clean up the variables, some object attributes are not needed.
		 */
		function set_projection (json) {
			var zenithal, cylindrical, conic, poly_conic, quad_cube, projection;
			var i;
			
			// Projections
			zenithal = ['AIR', 'ARC', 'AZP', 'NCP', 'SIN', 'STG', 'SZP', 'TAN', 'TAN-SIP', 'ZEA', 'ZPN'];
			cylindrical = ['CYP', 'CEA', 'CAR', 'MER', 'SFL', 'PAR', 'MOL', 'AIT'];
			conic = ['COP', 'COE', 'COD', 'COO'];
			poly_conic = ['BON', 'PCO'];
			quad_cube = ['TSC', 'CSC', 'QSC'];
	
			// Store the projection
			projection = self.wcsobj.ctype[0].slice(5);
			
			if (zenithal.indexOf(projection) > -1) {
	
				// Zenithal Projections
				self.wcsobj.phi_0 = 0;
				self.wcsobj.theta_0 = 90;
				self.wcsobj.alpha_p = self.wcsobj.crval[0];
				self.wcsobj.delta_p = self.wcsobj.crval[1];
	
				if (projection === 'AIR') {
					var r, theta, phi, eta, eta_b;
	
					// Airy projection requires an additional parameter from the FITS header
					obj.theta_b = parseFloat(json.pv[3]);
	
					eta = (self.wcsobj.theta_0 - theta) / 2;
					eta_b = (self.wcsobj.theta_0 - theta_b) / 2;
					r = Math.sqrt(x*x + y*y);
					phi = Math.atan2(x, -y);
	
					self.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};
					
					self.from_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};
	
				} else if (projection === 'ARC') {
	
					self.to_spherical = function (x, y) {
						var r, theta, phi;
	
						r = Math.sqrt(x*x + y*y);
						theta = self.wcsobj.theta_0 - r;
						phi = WCS.Math.atan2d(x, -y);
	
						return [phi, theta];
					};
					
					self.from_spherical = function (phi, theta) {
						var r, x, y;
						
						r = 90 - theta;
						x = r * WCS.Math.sind(phi);
						y = -r * WCS.Math.cosd(phi);
						
						return [x, y];
					};
	
				} else if (projection === 'AZP') {
	
					self.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};
	
				} else if (projection === 'NCP') {
	
					self.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};
	
				} else if (projection === 'SIN') {
	
					self.to_spherical = function (x, y) {
	
						var r, theta, phi;
						r = Math.sqrt(x*x + y*y);
						theta = WCS.Math.acosd(Math.PI * r / 180);
						phi = WCS.Math.atan2d(x, -y);
	
				        return [phi, theta]
					};
	
				} else if (projection === 'STG') {
	
					self.to_spherical = function (x, y) {
	
						var r, theta, phi;
						r = Math.sqrt(x*x + y*y);
						theta = self.wcsobj.theta_0 - 2 * WCS.Math.atand(Math.PI * r / 360);
						phi = WCS.Math.atan2d(x, -y);
	
				        return [phi, theta];
	
					};
	
				} else if (projection === 'SZP') {
	
					self.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};
	
				} else if (projection === 'TAN') {
	
					self.to_spherical = function (x, y) {
						var r, theta, phi;
	
						r = Math.sqrt(x*x + y*y);
						theta = WCS.Math.atand(180 / (Math.PI * r));
						phi = WCS.Math.atan2d(x, -y);
	
						return [phi, theta];
					};
	
					self.from_spherical = function (phi, theta) {
						var r, x, y;
	
						r = 180 / (Math.PI * WCS.Math.tand(theta));
						x = r * WCS.Math.sind(phi);
						y = -r * WCS.Math.cosd(phi);
	
						return [x, y];
					};
					
				} else if (projection === 'TAN-SIP') {

					self.get_sip_coefficients = function (header) {
						
						var sip, i, j, key;
						sip = {};
						
						// Get the order of the polynomials
						if (!header.hasOwnProperty('A_ORDER') || !header.hasOwnProperty('B_ORDER')) {
							throw new Error("What's the polynomial order, man!");
						}
						sip.a_order = header.A_ORDER;
						sip.b_order = header.B_ORDER;
						
						// Get the coefficients from the header
						// Coefficients are stored in a 2D array with indexing
						// A_i_j => a_coeffs[i][j]
						sip.a_coeffs = [];
						sip.b_coeffs = [];
						for (i = 0; i <= sip.a_order; i += 1) {
							sip.a_coeffs[i] = [];
							for (j = 0; j <= sip.a_order; j += 1) {
								key = 'A_' + i + '_' + j;
								sip.a_coeffs[i][j] = header[key] || 0;
							}
						}
						for (i = 0; i <= sip.b_order; i += 1) {
							sip.b_coeffs[i] = [];
							for (j = 0; j <= sip.b_order; j += 1) {
								key = 'B_' + i + '_' + j;
								sip.b_coeffs[i][j] = header[key] || 0;
							}
						}
						
						if (!sip.a_coeffs || !sip.b_coeffs) {
							throw new Error("Where are the coeffs, dude!");
						}
						
						return sip;
					};					
					
					self.wcsobj.sip = self.get_sip_coefficients(json);
					self.f = function (u, v, coeffs) {
						var p, q, value, order;
						
						value = 0;
						order = coeffs[0].length - 1;

						// Compute sum
						for (p = 0; p <= order; p += 1) {
							for (q = 0; q <= order; q += 1) {
								value += coeffs[p][q] * Math.pow(u, p) * Math.pow(v, q);
							}
						}

						return value;
					};
					
					// TODO: Increase precision ...
					self.to_intermediate = function (points) {
						var i, j, proj, u, v;
						proj = [];
						
						// u = points[0] - self.wcsobj.crpix[0] - 1;
						// v = points[1] - self.wcsobj.crpix[1] - 1;
						// 
						// points[0] = points[0] + self.f(u, v, self.wcsobj.sip.a_coeffs);
						// points[1] = points[1] + self.f(u, v, self.wcsobj.sip.b_coeffs);
						// 
						// proj[0] = self.wcsobj.cd[0][0] * points[0] + self.wcsobj.cd[0][1] * points[1];
						// proj[1] = self.wcsobj.cd[1][0] * points[0] + self.wcsobj.cd[1][1] * points[1];
						// 
						// proj[0] = -1 * proj[0];
						// proj[1] = -1 * proj[1];
						// return proj
						
						points[0] -= self.wcsobj.crpix[0] - 1;
						points[1] -= self.wcsobj.crpix[1] - 1;
						
						u = points[0];
						v = points[1];
						points[0] += self.f(u, v, self.wcsobj.sip.a_coeffs);
						points[1] += self.f(u, v, self.wcsobj.sip.b_coeffs);
						
						for (i = 0; i < self.wcsobj.naxis; i += 1) {
							proj[i] = 0;
							for (j = 0; j < self.wcsobj.naxis; j += 1) {
								proj[i] += self.wcsobj.cd[i][j] * points[j];
							}
						}
						
						// FIXME: Find out why each is off by a factor of -1
						proj[0] = -1 * proj[0];
						proj[1] = -1 * proj[1];
						return proj;
					};
						
					// self.from_intermediate = function (proj) {
					// 	console.log('in SIP');
					// 	var i, j, points;
					// 	points = [];
					// 	
					// 	for (i = 0; i < self.wcsobj.naxis; i += 1) {
					// 		points[i] = 0;
					// 		for (j = 0; j < self.wcsobj.naxis; j += 1) {
					// 			points[i] += self.wcsobj.pc_inv[i][j] * proj[j] / self.wcsobj.cdelt[i];
					// 		}
					// 		points[i] += self.wcsobj.crpix[i];
					// 	}
					// 	return points
					// };
					
					self.to_spherical = function (x, y) {
						var r, theta, phi;
	
						r = Math.sqrt(x*x + y*y);
						theta = WCS.Math.atand(180 / (Math.PI * r));
						phi = WCS.Math.atan2d(x, -y);
	
						return [phi, theta];
					};
	
					self.from_spherical = function (phi, theta) {
						var r, x, y;
	
						r = 180 / (Math.PI * WCS.Math.tand(theta));
						x = r * WCS.Math.sind(phi);
						y = -r * WCS.Math.cosd(phi);
	
						return [x, y];
					};
	
				} else if (projection === 'ZEA') {
	
					self.to_spherical = function (x, y) {
						var r, theta, phi;
	
						r = Math.sqrt(x*x + y*y);
						theta = self.wcsobj.theta_0 - 2 * WCS.Math.asind(Math.PI * r / 360);
						phi = WCS.Math.atan2d(x, -y);
	
						return [phi, theta];
					};
	
				} else if (projection === 'ZPN') {
	
					self.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};
	
				}
			} else if (cylindrical.indexOf(projection) > -1) {
	
				// Cylindrical Projections
				compute_celestial_parameters(0, 0);
	
				if (projection === 'CYP') {
	
					// Set projection parameters assuming Gall's stereographic projection if parameters are undefined
					self.wcsobj.mu = typeof(json.pv) != 'undefined' ? json.pv.length == 2 ? parseFloat(json.pv[0]) : 1 : 1;
					self.wcsobj.lambda = typeof(json.pv) != 'undefined' ? json.pv.length == 2 ? parseFloat(json.pv[1]) : 1 / Math.sqrt(2) : 1 / Math.sqrt(2);

					self.to_spherical = function (x, y) {
						var nu, theta, phi;
	
						nu = (Math.PI * y) / (180 * (self.wcsobj.mu + self.wcsobj.lambda));
						theta = WCS.Math.atan2d(nu, 1) + WCS.Math.asind(nu * self.wcsobj.mu / Math.sqrt(nu * nu + 1));
						phi = x / self.wcsobj.lambda;

						return [phi, theta];
					}
	
				} else if (projection === 'CEA') {
	
					// Set projection parameters assuming Lambert's equal area projection if parameter is undefined
					self.wcsobj.lambda = typeof(json.pv) != 'undefined' ? json.pv.length == 1 ? parseFloat(json.pv[0]) : 1 : 1;
	
					self.to_spherical = function (x, y) {
						var theta, phi;
	
						theta = WCS.Math.asind(Math.PI * self.wcsobj.lambda * y / 180);
						phi = x;
	
						return [phi, theta];
					}
	
				} else if (projection === 'CAR') {
	
					self.to_spherical = function (x, y) {
						return [x, y];
					}
	
				} else if (projection === 'MER') {
	
					self.to_spherical = function (x, y) {
						var theta;
	
						theta = 2 * WCS.Math.atand(Math.exp(y * Math.PI / 180)) - 90;
						return [x, theta];
					}
	
				} else if (projection === 'SFL') {
	
					self.to_spherical = function (x, y) {
						var phi;
	
						phi = x / WCS.Math.cosd(y);
						return [phi, y];
					}
	
				} else if (projection === 'PAR') {
	
					self.to_spherical = function (x, y) {
						var theta, phi;
	
						theta = 3 * WCS.Math.asind(y / 180);
						phi = x / (1 - 4 * Math.pow(y / 180, 2));
	
						return [phi, theta];
					}
	
				} else if (projection === 'MOL') {
	
					self.to_spherical = function (x, y) {
						var theta, phi;
	
						theta = WCS.Math.asind(WCS.Math.asind((Math.PI * y) / (180 * Math.sqrt(2))) / 90 + (y / 180) * Math.sqrt(2 - Math.pow(Math.PI * y / 180, 2)))
						phi = (Math.PI * x) / (2 * Math.sqrt(2 - Math.pow(Math.PI * y / 180, 2)));
	
						return [phi, theta];
					}
	
				} else if (projection === 'AIT') {
	
					self.to_spherical = function (x, y) {
						var z, x_z, y_z, theta, phi;
	
						x_z = Math.pow((Math.PI * x) / (4 * 180), 2);
						y_z = Math.pow((Math.PI * y) / (2 * 180), 2);
						z = Math.sqrt(1 - x_z - y_z);
						theta = WCS.Math.asind(Math.PI * y * z / 180);
						phi = 2 * WCS.Math.atan2d(Math.PI * z * x / (2 * 180), 2 * z * z - 1);
	
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
	
					self.C = WCS.Math.sind(self.theta_0);
					self.Y_0 = 180 * WCS.Math.cosd(self.eta) / (Math.PI * WCS.Math.tand(self.theta_0));
	
					self.to_spherical = function (x, y) {
						var r, theta_a_sign;
	
						theta_a_sign = self.theta_0 < 0 ? -1 : 1; 
						r = theta_a_sign * Math.sqrt(x*x + Math.pow(self.Y_0 - y, 2));
						phi = WCS.Math.atan2d(x / r , (self.Y_0 - y) / r) / self.C;
						theta = self.theta_0 + WCS.Math.atand(1 / WCS.Math.atand(self.theta_0) - (Math.PI * r) / (180 * WCS.Math.cosd(self.eta)));
	
						return [phi, theta];
					}
	
				} else if (projection === 'COE') {
					
					self.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};
					
				} else if (projection === 'COD') {
	
					self.C = (180 / Math.PI) * WCS.Math.sind(self.theta_0) * WCS.Math.sind(self.eta) / self.eta;
					self.Y_0 = self.eta * (1 / WCS.Math.tand(self.eta)) * (1 / WCS.Math.tand(self.theta_0));
	
					self.to_spherical = function (x, y) {
						var r, theta_a_sign;
	
						theta_a_sign = self.theta_0 < 0 ? -1 : 1; 
						r = theta_a_sign * Math.sqrt(x*x + Math.pow(self.Y_0 - y, 2));
	
						phi = WCS.Math.atan2d(x / r , (self.Y_0 - y) / r) / self.C;
						theta = self.theta_0 + self.eta * (1 / WCS.Math.tand(self.eta)) * (1 / WCS.Math.tand(self.theta_0));
	
						return [phi, theta];
					};
				} else if (projection === 'COO') {
					
					self.to_spherical = function (x, y) {
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
	
			alpha_0 = self.wcsobj.crval[0];
			delta_0 = self.wcsobj.crval[1];
			phi_p = self.wcsobj.lonpole;
			theta_p = self.wcsobj.latpole;
	
			self.phi_0 = phi_0;
			self.theta_0 = theta_0;
	
			// Compute delta_p
			delta_p1 = WCS.Math.atan2d(WCS.Math.sind(self.wcsobj.theta_0), WCS.Math.cosd(self.wcsobj.theta_0 * WCS.Math.cosd(phi_p - self.wcsobj.phi_0)));
			delta_p2 = WCS.Math.acosd(WCS.Math.sind(delta_0) / Math.sqrt(1 - Math.pow(WCS.Math.cosd(self.wcsobj.theta_0), 2) * Math.pow(WCS.Math.sind(phi_p - self.wcsobj.phi_0), 2)));
	
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
					self.wcsobj.delta_p = delta_p1 + delta_p2;
				} else {
					self.wcsobj.delta_p = delta_p1 - delta_p2;
				}
			} else if (sol1) {
				self.wcsobj.delta_p = delta_p1 + delta_p2;
			} else if (sol2) {
				self.wcsobj.delta_p = delta_p1 - delta_p2;
			} else {
				self.wcsobj.delta_p = theta_p;
			}
	
			// Compute alpha_p
			if (Math.abs(delta_0) === 90) {
				self.wcsobj.alpha_p = alpha_0;
			} else {
				self.wcsobj.alpha_p = alpha_0 - WCS.Math.asind(WCS.Math.sind(phi_p - self.wcsobj.phi_0) * WCS.Math.cosd(self.wcsobj.theta_0) / WCS.Math.cosd(delta_0));
			}
		}
	};


	WCS.Mapper.prototype = {

		to_intermediate: function (points) {
			var wcsobj, i, j, proj;
			wcsobj = this.wcsobj;
			proj = [];
			for (i = 0; i < wcsobj.naxis; i += 1) {
				proj[i] = 0;
				// -1 to make 0-based index
				points[i] -= wcsobj.crpix[i] - 1;
				for (j = 0; j < wcsobj.naxis; j += 1) {
					proj[i] += wcsobj.cdelt[i] * wcsobj.pc[i][j] * points[j];
				}
			}

			return proj;
		},


		from_intermediate: function (proj) {
			var wcsobj, i, j, points;
			wcsobj = this.wcsobj;
			points = [];
			
            for (i = 0; i < wcsobj.naxis; i += 1) {
				points[i] = 0;
				for (j = 0; j < wcsobj.naxis; j += 1) {
					points[i] += wcsobj.pc_inv[i][j] * proj[j] / wcsobj.cdelt[i];
				}
                // -1 to make 0-based index
				points[i] += wcsobj.crpix[i] - 1;
			}
			return points
		},


		to_celestial: function (phi, theta) {
			
			var wcsobj, sin_theta, cos_theta, sin_dphi, cos_dphi, sin_dp, cos_dp;
			var x_temp, y_temp, ra, dec;
            wcsobj = this.wcsobj;

			sin_theta = WCS.Math.sind(theta);
			cos_theta = WCS.Math.cosd(theta);
			
			sin_dp = WCS.Math.sind(wcsobj.delta_p);
			cos_dp = WCS.Math.cosd(wcsobj.delta_p);
			
			sin_dphi = WCS.Math.sind(phi - wcsobj.lonpole);
			cos_dphi = WCS.Math.cosd(phi - wcsobj.lonpole);

			x_temp = sin_theta * cos_dp - cos_theta * sin_dp * cos_dphi;
			y_temp = -cos_theta * sin_dphi;
			
			ra = wcsobj.alpha_p + WCS.Math.atan2d(y_temp, x_temp);
			ra = (ra + 360) % 360;
			dec = WCS.Math.asind(sin_theta * sin_dp + cos_theta * cos_dp * cos_dphi);

	        return [ra, dec];
		},


		from_celestial: function (ra, dec) {

			var wcsobj, sin_delta, cos_delta, sin_dp, cos_dp, sin_d_alpha, cos_d_alpha, x_temp, y_temp, phi, theta;
			wcsobj = this.wcsobj;
			
			sin_delta = WCS.Math.sind(dec);
			cos_delta = WCS.Math.cosd(dec);
			sin_dp = WCS.Math.sind(wcsobj.delta_p);
			cos_dp = WCS.Math.cosd(wcsobj.delta_p);
			sin_d_alpha = WCS.Math.sind(ra - wcsobj.alpha_p);
			cos_d_alpha = WCS.Math.cosd(ra - wcsobj.alpha_p);

			x_temp = sin_delta * cos_dp - cos_delta * sin_dp * cos_d_alpha;
			y_temp = -cos_delta * sin_d_alpha;

			phi = wcsobj.lonpole + WCS.Math.atan2d(y_temp, x_temp);
			theta = WCS.Math.asind(sin_delta * sin_dp + cos_delta * cos_dp * cos_d_alpha);

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
		}
	};

}).call(this);
