
function deg_to_rad(degree) {
	return degree * Math.PI / 180;
}

function rad_to_deg(radian) {
	return 180 * radian / Math.PI;
}


(function () {
	"use strict"
	
	var WCS = function (hdr) {
		
		// Parse a JSON object for WCS data
		this.wcsaxes = parseInt(hdr.wcsaxes);
		this.crpix = [
			parseFloat(hdr.crpix1),
			parseFloat(hdr.crpix2)
		];
		this.pc = [
			[parseFloat(hdr.pc1_1), parseFloat(hdr.pc1_2)],
			[parseFloat(hdr.pc2_1), parseFloat(hdr.pc2_2)]
		];
		this.cdelt = [
			parseFloat(hdr.cdelt1),
			parseFloat(hdr.cdelt2)
		];
		this.cunit = [hdr.cunit1, hdr.cunit2];
		this.ctype = [hdr.ctype1, hdr.ctype2];
		this.crval = [
			parseFloat(hdr.crval1),
			parseFloat(hdr.crval2)
		];
		this.lonpole = parseFloat(hdr.lonpole);
		this.latpole = parseFloat(hdr.latpole);
		this.date_obs = hdr.date_obs;
		
		// Check the projection and define the appropriate function
		if (this.ctype[0].slice(5) === 'TAN' && this.ctype[1].slice(5) === 'TAN') {

			WCS.prototype.to_spherical = function (x, y) {

				var phi, theta, r;

				phi = Math.atan2(-y, x);
				r = Math.sqrt(x*x + y*y);
				
				theta = Math.atan(180 / Math.PI * r);
				
				return [phi, theta];
				
			};
		}
		
		var one;
		one = false;
		
		if (one) {
			WCS.prototype.blah = function() {
				console.log("True");
			};
		} else {
			WCS.prototype.blah = function() {
				console.log("False");
			};
		}
	};
	
	WCS.prototype = {
		
		to_intermediate: function (points) {
			var i, j, num_points, point, proj;
			
			num_points = points.length;
			proj = [];

			for (i = 0; i < num_points; i += 1) {
				point = 0;
				for (j = 0; j < this.wcsaxes; j += 1) {
					point += this.pc[i][j] * (points[j] - this.crpix[j]);
				}
				point = this.cdelt[i] * point;
				proj.push(point);
			}

			return proj;
		},

		to_celestial: function (phi, theta) {
			var alpha_p, delta_p, phi_p, alpha, delta;
			
			alpha_p = this.crval[0];
			delta_p = this.crval[1];
			phi_p = this.lonpole;
			
			alpha = alpha_p
			alpha += Math.atan2(Math.sin(deg_to_rad(theta)) * Math.sin(deg_to_rad(delta_p)) - Math.cos(deg_to_rad(theta)) * Math.sin(deg_to_rad(delta_p)) * Math.cos(deg_to_rad(phi - phi_p)), -Math.cos(deg_to_rad(theta)) * Math.sin(deg_to_rad(phi - phi_p)));
			delta = Math.asin(Math.sin(deg_to_rad(theta)) * Math.sin(deg_to_rad(delta_p)) + Math.cos(deg_to_rad(theta)) * Math.cos(deg_to_rad(delta_p)) * Math.cos(deg_to_rad(phi - phi_p)));
			
			return [rad_to_deg(alpha), rad_to_deg(delta)];
		},
		
		pix_to_sky: function (points) {
			var coords;
			
			coords = this.to_intermediate(points);
			coords = this.to_spherical(coords[0], coords[1]);
			coords = this.to_celestial(coords[0], coords[1]);

			return coords;
		}

	};

	self.WCS = WCS;
}());