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
	
	// Save reference to the global object
	var self = this;
	
	// The top-level namespace
	var WCS;
	if (typeof(exports) !== 'undefined') {
		WCS = exports;
	} else {
		WCS = self.WCS = self.WCS || {};
	}
	
	WCS.version = '0.0.2';
	
	WCS.Mapper = function (hdr) {
		
<<<<<<< HEAD
		// Yea, it's a self referential object
		var self = this;
       
        var wcsobj = {};
        // WCS object to hold FITS keywords relevant to WCS
        WCS.prototype.wcsobj = wcsobj;
		
		// Parse a JSON object for WCS data
		verify_json(wcsobj, hdr);
		
		// Set the projection
		set_projection(wcsobj, hdr);
		
=======
		// Create reference to the Mapper object
		var obj = this;		
		
		// Parse a JSON object for WCS data
		verify_json(hdr);

		// Set the projection
		set_projection(hdr);
>>>>>>> bea9b0fe2bd2c1686c20f1ec69bff57cd4fd2f3a

		/**
		 * Verify that the JSON passed to the WCS object contains the
		 * appropriate keywords to compute celestial coordinates.
		 * 
		 * TODO: Handle CROTA and CD keywords, derive PC matrix from these
		 */
		function verify_json (wcsobj, json) {
			var i, unit, type, crota2, lambda, cd_det, cd_sign;
<<<<<<< HEAD
			
            // FITS single keywords to copy
            var singlekw = ['NAXIS', 'RADESYS'];
            // Required FITS single keywords
            var singlekw_req = ['NAXIS']
            
            // FITS Axis keywords to copy (1 keyword per axis, eg: CTYPE1, CTYPE2, ...
            var axiskw = ['NAXIS', 'CTYPE', 'CDELT', 'CRPIX', 'CRVAL', 'CUNIT'];
            // Required FITS axis keywords
            var axiskw_req = ['NAXIS', 'CTYPE', 'CDELT', 'CRPIX', 'CRVAL', 'CUNIT'];


        	// Check for REQUIRED single keywords, error if not found.
            for (var i=0; i<singlekw_req.length; i++) {
                var k = singlekw_req[i];
                if (!json.hasOwnProperty(k)) {
                    throw new Error("Not enough information to compute WCS: missing required keyword: " + k);
                }
            }

            // Copy single keywords
            for (var i=0; i<singlekw.length; i++) {
                var k = singlekw[i];
                if (json.hasOwnProperty(k)) {
                    wcsobj[k] = json[k];
                }
            }


            // Check for REQUIRED axis keywords, error if not found
            for (var axis=1; axis<=wcsobj.NAXIS; axis++) {
                for (var i=0; i<axiskw_req.length; i++) {
                    var k = axiskw_req[i] + axis;
                    if (!json.hasOwnProperty(k)) {
                        throw new Error("Not enough information to compute WCS: missing required keyword: " + k);
                    }
                }
            }

            // Copy axis keywords to wcsobj
            for (var axis=1; axis<=wcsobj.NAXIS; axis++) {
                for (var i=0; i<axiskw.length; i++) {
                    var k = axiskw[i] + axis;
                    if (json.hasOwnProperty(k)) {
                        wcsobj[k] = json[k];
                    }
                    // Adds to array in wcsobj with lowercase name
                    var arrayname = axiskw[i].toLowerCase();
                    if (!wcsobj.hasOwnProperty(arrayname)) {
                        wcsobj[arrayname] = [];
                    }
                    wcsobj[arrayname].push(json[k]);
                }
            }
            
            /*
             * The following errors are for axis keywords, I just made them required.
=======

			// Assume 2 dimensional image if WCSAXES not given
			obj.wcsaxes = typeof(json.wcsaxes) != 'undefined' ? parseInt(json.wcsaxes) : 2;

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
>>>>>>> bea9b0fe2bd2c1686c20f1ec69bff57cd4fd2f3a
			if (typeof(json.cunit) === 'undefined') {
				console.log("Assuming units of degrees");
			}
			if (typeof(json.ctype) === 'undefined') {
				console.log("Assuming a Gnomonic (TAN) projection");
			}
            */

			if (typeof(json.EQUINOX) === 'undefined') {
				console.log("Assuming 2000");
			}
<<<<<<< HEAD
	
            // TODO: Check the default values for lonpole and latpole ... will depend on the projection
			wcsobj.LONPOLE = typeof(json.LONPOLE) != 'undefined' ? json.LONPOLE : 0;
			wcsobj.LATPOLE = typeof(json.LATPOLE) != 'undefined' ? json.LATPOLE : 0;
			wcsobj.EQUINOX = typeof(json.EQUINOX) != 'undefined' ? json.EQUINOX : 2000;
			wcsobj.DATE_OBS = typeof(json.DATE_OBS) != 'undefined' ? json.DATE_OBS : "";
		
            /* TODO: assume "deg" if cunit not given? Now CUNIT is required.
            unit = typeof(json.cunit[i]) != 'undefined' ? json.cunit[i] : "deg";
            */
            
            /* TODO: assume ra, dec, tan if ctype not given? Now CTYPE is required.
			type = typeof(json.ctype) != 'undefined' ? json.ctype[i] : i === 0 ? "RA---TAN" : "DEC--TAN";
			self.ctype.push(type);
			self.crval.push(json.crval[i]);
			*/

            // TODO: Fix so PC and CD values can be parsed from flat header object
			// PC Matrix
			// TODO: Compute from CD matrix if given.
			if (typeof(json.pc) != 'undefined') {
				wcsobj.pc = [ [parseFloat(json.pc[0]), parseFloat(json.pc[1])], [parseFloat(json.pc[2]), parseFloat(json.pc[3])] ];
=======

			obj.naxis = [];
			obj.crpix = [];
			obj.cdelt = [];
			obj.cunit = [];
			obj.ctype = [];
			obj.crval = [];
			for (i = 0; i < obj.wcsaxes; i += 1) {
				obj.naxis.push(parseInt(json.naxis[i]));
				obj.crpix.push(parseFloat(json.crpix[i]) - 1);
				obj.cdelt.push(parseFloat(json.cdelt[i]));
				unit = typeof(json.cunit[i]) != 'undefined' ? json.cunit[i] : "deg";
				obj.cunit.push(unit);
				type = typeof(json.ctype) != 'undefined' ? json.ctype[i] : i === 0 ? "RA---TAN" : "DEC--TAN";
				obj.ctype.push(type);
				obj.crval.push(json.crval[i]);
			}

			// PC Matrix
			// TODO: Compute from CD matrix if given.
			if (typeof(json.pc) != 'undefined') {
				obj.pc = [ [parseFloat(json.pc[0]), parseFloat(json.pc[1])], [parseFloat(json.pc[2]), parseFloat(json.pc[3])] ];
>>>>>>> bea9b0fe2bd2c1686c20f1ec69bff57cd4fd2f3a
			} else {
				// Check for CROTA2
				if (typeof(json.crota2) === 'undefined') {
					if (typeof(json.cd) != 'undefined') {
						// Compute CROTA2 from the CD matrix
						cd_det = parseFloat(json.cd[0]) * parseFloat(json.cd[1]) - parseFloat(json.cd[2]) * parseFloat(json.cd[3]);
						cd_sign = cd_det < 0 ? -1 : 1;
<<<<<<< HEAD
						wcsobj.cdelt[0] = Math.sqrt(Math.abs(cd_det)) * cd_sign;
						wcsobj.cdelt[1] = Math.sqrt(Math.abs(cd_det));
						crota2 = atand2(-1 * parseFloat(json.cd[1]), parseFloat(json.cd[3]));
						lambda = wcsobj.cdelt[1] / wcsobj.cdelt[0];
						wcsobj.pc = [ [cosd(crota2), -1 * lambda * sind(crota2)], [sind(crota2) / lambda, cosd(crota2)] ];
					} else {
						// Assume the PC matrix to be identity
						wcsobj.pc = [ [1, 0], [0, 1] ];
=======
						obj.cdelt[0] = Math.sqrt(Math.abs(cd_det)) * cd_sign;
						obj.cdelt[1] = Math.sqrt(Math.abs(cd_det));
						crota2 = atand2(-1 * parseFloat(json.cd[1]), parseFloat(json.cd[3]));
						lambda = obj.cdelt[1] / obj.cdelt[0];
						obj.pc = [ [cosd(crota2), -1 * lambda * sind(crota2)], [sind(crota2) / lambda, cosd(crota2)] ];
					} else {
						// Assume the PC matrix to be identity
						obj.pc = [ [1, 0], [0, 1] ];
>>>>>>> bea9b0fe2bd2c1686c20f1ec69bff57cd4fd2f3a
					}
				}
			}

			// Inverse PC Matrix
<<<<<<< HEAD
			wcsobj.pc_inv = self.matrixInverse(wcsobj.pc);

=======
			obj.pc_inv = WCS.Math.matrixInverse(obj.pc);

			// TODO: Check the default values for lonpole and latpole ... will depend on the projection
			obj.lonpole = typeof(json.lonpole) != 'undefined' ? json.lonpole : 0;
			obj.latpole = typeof(json.latpole) != 'undefined' ? json.latpole : 0;
			obj.equinox = typeof(json.equinox) != 'undefined' ? json.equinox : 2000;
			obj.date_obs = typeof(json.date_obs) != 'undefined' ? json.date_obs : "";
>>>>>>> bea9b0fe2bd2c1686c20f1ec69bff57cd4fd2f3a
		}

		/**
		 * Set the projection of the WCS object.
		 * 
		 * TODO: Clean up the variables, some object attributes are not needed.
		 */
		function set_projection (wcsobj, json) {
			var zenithal, cylindrical, conic, poly_conic, quad_cube, projection;

			// Projections
			zenithal = ['AIR', 'ARC', 'AZP', 'NCP', 'SIN', 'STG', 'SZP', 'TAN', 'ZEA', 'ZPN'];
			cylindrical = ['CYP', 'CEA', 'CAR', 'MER', 'SFL', 'PAR', 'MOL', 'AIT'];
			conic = ['COP', 'COE', 'COD', 'COO'];
			poly_conic = ['BON', 'PCO'];
			quad_cube = ['TSC', 'CSC', 'QSC'];

			// Store the projection
<<<<<<< HEAD
			projection = wcsobj.ctype[0].slice(5);
			
			if (zenithal.indexOf(projection) > -1) {

				// Zenithal Projections
				self.phi_0 = 0;
				self.theta_0 = 90;
				self.alpha_p = wcsobj.crval[0];
				self.delta_p = wcsobj.crval[1];
=======
			projection = obj.ctype[0].slice(5);

			if (zenithal.indexOf(projection) > -1) {

				// Zenithal Projections
				obj.phi_0 = 0;
				obj.theta_0 = 90;
				obj.alpha_p = obj.crval[0];
				obj.delta_p = obj.crval[1];
>>>>>>> bea9b0fe2bd2c1686c20f1ec69bff57cd4fd2f3a

				if (projection === 'AIR') {
					var r, theta, phi, eta, eta_b;

					// Airy projection requires an additional parameter from the FITS header
					obj.theta_b = parseFloat(json.pv[3]);

					eta = (obj.theta_0 - theta) / 2;
					eta_b = (obj.theta_0 - theta_b) / 2;
					r = Math.sqrt(x*x + y*y);
					phi = Math.atan2(x, -y);

					obj.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};

				} else if (projection === 'ARC') {

					obj.to_spherical = function (x, y) {
						var r, theta, phi;

						r = Math.sqrt(x*x + y*y);
						theta = obj.theta_0 - r;
						phi = WCS.Math.atan2d(x, -y);

						return [phi, theta];
					};
					
					obj.from_spherical = function (phi, theta) {
						var r, x, y;
						
						r = 90 - theta;
						x = r * WCS.Math.sind(phi);
						y = -r * WCS.Math.cosd(phi);
						
						return [x, y];
					};

				} else if (projection === 'AZP') {

					obj.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};

				} else if (projection === 'NCP') {

					obj.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};

				} else if (projection === 'SIN') {

					obj.to_spherical = function (x, y) {

						var r, theta, phi;
						r = Math.sqrt(x*x + y*y);
						theta = WCS.Math.acosd(Math.PI * r / 180);
						phi = WCS.Math.atan2d(x, -y);

				        return [phi, theta]
					};

				} else if (projection === 'STG') {

					obj.to_spherical = function (x, y) {

						var r, theta, phi;
						r = Math.sqrt(x*x + y*y);
						theta = obj.theta_0 - 2 * WCS.Math.atand(Math.PI * r / 360);
						phi = WCS.Math.atan2d(x, -y);

				        return [phi, theta];

					};

				} else if (projection === 'SZP') {

					obj.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};

				} else if (projection === 'TAN') {

					obj.to_spherical = function (x, y) {
						var r, theta, phi;

						r = Math.sqrt(x*x + y*y);
						theta = WCS.Math.atand(180 / (Math.PI * r));
						phi = WCS.Math.atan2d(x, -y);

						return [phi, theta];
					};

					obj.from_spherical = function (phi, theta) {
						var r, x, y;

						r = 180 / (Math.PI * WCS.Math.tand(theta));
						x = r * WCS.Math.sind(phi);
						y = -r * WCS.Math.cosd(phi);

						return [x, y];
					};

				} else if (projection === 'ZEA') {

					obj.to_spherical = function (x, y) {
						var r, theta, phi;

						r = Math.sqrt(x*x + y*y);
						theta = obj.theta_0 - 2 * WCS.Math.asind(Math.PI * r / 360);
						phi = WCS.Math.atan2d(x, -y);

						return [phi, theta];
					};

				} else if (projection === 'ZPN') {

					obj.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};

				}
			} else if (cylindrical.indexOf(projection) > -1) {

				// Cylindrical Projections
				compute_celestial_parameters(0, 0);

				if (projection === 'CYP') {

					// Set projection parameters assuming Gall's stereographic projection if parameters are undefined
					obj.mu = typeof(json.pv) != 'undefined' ? json.pv.length == 2 ? parseFloat(json.pv[0]) : 1 : 1;
					obj.lambda = typeof(json.pv) != 'undefined' ? json.pv.length == 2 ? parseFloat(json.pv[1]) : 1 / Math.sqrt(2) : 1 / Math.sqrt(2);

					obj.to_spherical = function (x, y) {
						var nu, theta, phi;

						nu = (Math.PI * y) / (180 * (obj.mu + obj.lambda));
						theta = WCS.Math.atan2d(nu, 1) + WCS.Math.asind(nu * obj.mu / Math.sqrt(nu * nu + 1));
						phi = x / obj.lambda;

						return [phi, theta];
					}

				} else if (projection === 'CEA') {

					// Set projection parameters assuming Lambert's equal area projection if parameter is undefined
					obj.lambda = typeof(json.pv) != 'undefined' ? json.pv.length == 1 ? parseFloat(json.pv[0]) : 1 : 1;

					obj.to_spherical = function (x, y) {
						var theta, phi;

						theta = WCS.Math.asind(Math.PI * obj.lambda * y / 180);
						phi = x;

						return [phi, theta];
					}

				} else if (projection === 'CAR') {

					obj.to_spherical = function (x, y) {
						return [x, y];
					}

				} else if (projection === 'MER') {

					obj.to_spherical = function (x, y) {
						var theta;

						theta = 2 * WCS.Math.atand(Math.exp(y * Math.PI / 180)) - 90;
						return [x, theta];
					}

				} else if (projection === 'SFL') {

					obj.to_spherical = function (x, y) {
						var phi;

						phi = x / WCS.Math.cosd(y);
						return [phi, y];
					}

				} else if (projection === 'PAR') {

					obj.to_spherical = function (x, y) {
						var theta, phi;

						theta = 3 * WCS.Math.asind(y / 180);
						phi = x / (1 - 4 * Math.pow(y / 180, 2));

						return [phi, theta];
					}

				} else if (projection === 'MOL') {

					obj.to_spherical = function (x, y) {
						var theta, phi;

						theta = WCS.Math.asind(WCS.Math.asind((Math.PI * y) / (180 * Math.sqrt(2))) / 90 + (y / 180) * Math.sqrt(2 - Math.pow(Math.PI * y / 180, 2)))
						phi = (Math.PI * x) / (2 * Math.sqrt(2 - Math.pow(Math.PI * y / 180, 2)));

						return [phi, theta];
					}

				} else if (projection === 'AIT') {

					obj.to_spherical = function (x, y) {
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
				obj.eta = typeof(json.pv[1]) != 'undefined' ? parseFloat(json.pv[1]) : 0;

				// Compute theta_1 and theta_2
				obj.theta_1 = obj.theta_0 - obj.eta;
				obj.theta_2 = obj.theta_0 + obj.eta;

				if (projection === 'COP') {

					obj.C = WCS.Math.sind(obj.theta_0);
					obj.Y_0 = 180 * WCS.Math.cosd(obj.eta) / (Math.PI * WCS.Math.tand(obj.theta_0));

					obj.to_spherical = function (x, y) {
						var r, theta_a_sign;

						theta_a_sign = obj.theta_0 < 0 ? -1 : 1; 
						r = theta_a_sign * Math.sqrt(x*x + Math.pow(obj.Y_0 - y, 2));
						phi = WCS.Math.atan2d(x / r , (obj.Y_0 - y) / r) / obj.C;
						theta = obj.theta_0 + WCS.Math.atand(1 / WCS.Math.atand(obj.theta_0) - (Math.PI * r) / (180 * WCS.Math.cosd(obj.eta)));

						return [phi, theta];
					}

				} else if (projection === 'COE') {					
					obj.to_spherical = function (x, y) {
						throw new Error('Sorry, not yet implemented!');
					};
				} else if (projection === 'COD') {

					obj.C = (180 / Math.PI) * WCS.Math.sind(obj.theta_0) * WCS.Math.sind(obj.eta) / obj.eta;
					obj.Y_0 = obj.eta * (1 / WCS.Math.tand(obj.eta)) * (1 / WCS.Math.tand(obj.theta_0));

					obj.to_spherical = function (x, y) {
						var r, theta_a_sign;

						theta_a_sign = obj.theta_0 < 0 ? -1 : 1; 
						r = theta_a_sign * Math.sqrt(x*x + Math.pow(obj.Y_0 - y, 2));

						phi = WCS.Math.atan2d(x / r , (obj.Y_0 - y) / r) / obj.C;
						theta = obj.theta_0 + obj.eta * (1 / WCS.Math.tand(obj.eta)) * (1 / WCS.Math.tand(obj.theta_0));

						return [phi, theta];
					};
				} else if (projection === 'COO') {
					obj.to_spherical = function (x, y) {
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

<<<<<<< HEAD
			alpha_0 = wcsobj.crval[0];
			delta_0 = wcsobj.crval[1];
			phi_p = wcsobj.LONPOLE;
			theta_p = wcsobj.LATPOLE;
=======
			obj.phi_0 = phi_0;
			obj.theta_0 = theta_0;

			alpha_0 = obj.crval[0];
			delta_0 = obj.crval[1];
			phi_p = obj.lonpole;
			theta_p = obj.latpole;
>>>>>>> bea9b0fe2bd2c1686c20f1ec69bff57cd4fd2f3a

			// Compute delta_p
			delta_p1 = WCS.Math.atan2d(WCS.Math.sind(obj.theta_0), WCS.Math.cosd(obj.theta_0 * WCS.Math.cosd(phi_p - obj.phi_0)));
			delta_p2 = WCS.Math.acosd(WCS.Math.sind(delta_0) / Math.sqrt(1 - Math.pow(WCS.Math.cosd(obj.theta_0), 2) * Math.pow(WCS.Math.sind(phi_p - obj.phi_0), 2)));

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
					obj.delta_p = delta_p1 + delta_p2;
				} else {
					obj.delta_p = delta_p1 - delta_p2;
				}
			} else if (sol1) {
				obj.delta_p = delta_p1 + delta_p2;
			} else if (sol2) {
				obj.delta_p = delta_p1 - delta_p2;
			} else {
				obj.delta_p = theta_p;
			}

			// Compute alpha_p
			if (Math.abs(delta_0) === 90) {
				obj.alpha_p = alpha_0;
			} else {
				obj.alpha_p = alpha_0 - WCS.Math.asind(WCS.Math.sind(phi_p - obj.phi_0) * WCS.Math.cosd(obj.theta_0) / WCS.Math.cosd(delta_0));
			}
		}
	};

	WCS.Mapper.prototype = {

		to_intermediate: function (points) {
			var i, j, proj;
			proj = [];
            var wcsobj = this.wcsobj;
			
            for (i = 0; i < wcsobj.NAXIS; i += 1) {
				proj[i] = 0;
                // -1 to make 0-based index
				points[i] -= wcsobj.crpix[i] - 1;
				for (j = 0; j < wcsobj.NAXIS; j += 1) {
					proj[i] += wcsobj.cdelt[i] * wcsobj.pc[i][j] * points[j];
				}
			}
			return proj;
		},


		from_intermediate: function (proj) {
			var i, j, points;
			points = [];
<<<<<<< HEAD
            var wcsobj = this.wcsobj;
			
            for (i = 0; i < wcsobj.NAXIS; i += 1) {
=======

			for (i = 0; i < this.wcsaxes; i += 1) {
>>>>>>> bea9b0fe2bd2c1686c20f1ec69bff57cd4fd2f3a
				points[i] = 0;
				for (j = 0; j < wcsobj.NAXIS; j += 1) {
					points[i] += wcsobj.pc_inv[i][j] * proj[j] / wcsobj.cdelt[i];
				}
                // -1 to make 0-based index
				points[i] += wcsobj.crpix[i] - 1;
			}
			return points
		},


		to_celestial: function (phi, theta) {

			var sin_theta, cos_theta, sin_dphi, cos_dphi, sin_dp, cos_dp;
			var x_temp, y_temp, ra, dec;
<<<<<<< HEAD
            var wcsobj = this.wcsobj;
			
			sin_theta = sind(theta);
			cos_theta = cosd(theta);
			
			sin_dp = sind(this.delta_p);
			cos_dp = cosd(this.delta_p);
			
			sin_dphi = sind(phi - wcsobj.LONPOLE);
			cos_dphi = cosd(phi - wcsobj.LONPOLE);
			
=======

			sin_theta = WCS.Math.sind(theta);
			cos_theta = WCS.Math.cosd(theta);

			sin_dp = WCS.Math.sind(this.delta_p);
			cos_dp = WCS.Math.cosd(this.delta_p);

			sin_dphi = WCS.Math.sind(phi - this.lonpole);
			cos_dphi = WCS.Math.cosd(phi - this.lonpole);

>>>>>>> bea9b0fe2bd2c1686c20f1ec69bff57cd4fd2f3a
			x_temp = sin_theta * cos_dp - cos_theta * sin_dp * cos_dphi;
			y_temp = -cos_theta * sin_dphi;
			ra = this.alpha_p + WCS.Math.atan2d(y_temp, x_temp);
			ra = (ra + 360) % 360;
			dec = WCS.Math.asind(sin_theta * sin_dp + cos_theta * cos_dp * cos_dphi);

	        return [ra, dec];
		},


		from_celestial: function (ra, dec) {

			var sin_delta, cos_delta, sin_dp, cos_dp, sin_d_alpha, cos_d_alpha, x_temp, y_temp, phi, theta;
            var wcsobj = this.wcsobj;

			sin_delta = WCS.Math.sind(dec);
			cos_delta = WCS.Math.cosd(dec);
			sin_dp = WCS.Math.sind(this.delta_p);
			cos_dp = WCS.Math.cosd(this.delta_p);
			sin_d_alpha = WCS.Math.sind(ra - this.alpha_p);
			cos_d_alpha = WCS.Math.cosd(ra - this.alpha_p);

			x_temp = sin_delta * cos_dp - cos_delta * sin_dp * cos_d_alpha;
			y_temp = -cos_delta * sin_d_alpha;

<<<<<<< HEAD
			phi = wcsobj.LONPOLE + atan2d(y_temp, x_temp);
			theta = asind(sin_delta * sin_dp + cos_delta * cos_dp * cos_d_alpha);
=======
			phi = this.lonpole + WCS.Math.atan2d(y_temp, x_temp);
			theta = WCS.Math.asind(sin_delta * sin_dp + cos_delta * cos_dp * cos_d_alpha);
>>>>>>> bea9b0fe2bd2c1686c20f1ec69bff57cd4fd2f3a

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

<<<<<<< HEAD
	self.WCS = WCS;
}());
=======
	};
}).call(this);
>>>>>>> bea9b0fe2bd2c1686c20f1ec69bff57cd4fd2f3a
