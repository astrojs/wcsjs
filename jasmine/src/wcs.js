
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
		this.cdelt = [deg_to_rad(parseFloat(hdr.cdelt1)), deg_to_rad(parseFloat(hdr.cdelt2))];
		this.cunit = [hdr.cunit1, hdr.cunit2];
		this.ctype = [hdr.ctype1, hdr.ctype2];
		this.crval = [deg_to_rad(parseFloat(hdr.crval1)), deg_to_rad(parseFloat(hdr.crval2))];
		this.lonpole = deg_to_rad(parseFloat(hdr.lonpole));
		this.latpole = deg_to_rad(parseFloat(hdr.latpole));
		this.date_obs = hdr.date_obs;
		
		// Check the projection and define the appropriate function
		if (this.ctype[0].slice(5) === 'TAN' && this.ctype[1].slice(5) === 'TAN') {

			this.lat_0 = Math.PI / 2;

			WCS.prototype.to_spherical = function (x, y) {
				var r, theta, phi;

				r = Math.sqrt(x*x + y*y);
				theta = this.lat_0 - Math.atan(r);
				phi = Math.atan2(x, -y);

				return [phi, theta];
			};
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

			alpha_p = this.crval[0];
			delta_p = this.crval[1];
			phi_p = this.lonpole;

			x = -1 * Math.cos(theta) * Math.sin(phi - phi_p);
			y = Math.sin(theta) * Math.cos(delta_p) - Math.cos(theta) * Math.sin(delta_p) * Math.cos(phi - phi_p);
			
			alpha = alpha_p + Math.atan2(x, y);
			alpha += (2 * Math.PI);
			alpha = alpha % (2 * Math.PI);
			delta = Math.asin(Math.sin(theta) * Math.sin(delta_p) + Math.cos(theta) * Math.cos(delta_p) * Math.cos(phi - phi_p));

			return [rad_to_deg(alpha), rad_to_deg(delta)];
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