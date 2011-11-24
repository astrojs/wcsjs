(function () {
	"use strict"
	
	var WCS = function (header) {
		this.naxis;
		this.crpix;
		this.cdelt;
		this.pc;
		this.cd;
		this.cunit;
	};
	
	WCS.prototype = {

		pxl_to_proj_plane: function (pts) {

			var ii, jj, num_points, point, proj_plane;

			num_points = pts.length;

			// Loop over the number of points
			for (ii = 0; ii < num_points; ii += 1) {
				// Transform the point
				point = 0;
				for (jj = 0; jj < this.naxis; jj += 1) {
					point += this.cd[2*ii + jj] * (pts[jj] - crpix[jj]);
				}
				proj_plane[ii] = point;
			}			
			return proj_plane;
		},
		
		proj_plane_to_spherical: function (x, y) {

			var phi, theta, r;
			
			phi = Math.atan2(-y, x);
			r = Math.sqrt(x*x + y*y);
			
			// Assuming only Gnomonic projects for now
			theta = Math.atan(180 / Math.PI * r);
			
			return [phi, theta];
		},
		
		spherical_to_celestial: function (phi, theta) {
			
		},
		
	};

	self.WCS = WCS;
}());