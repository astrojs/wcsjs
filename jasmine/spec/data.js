var air, arc, azp, ncp, sin, stg, szp, tan, zea, zpn;

//
//	Zenithal Projections
//

// Airy
air = {"naxis2": 192, "crval2": -90, "crpix1": -234.754501084, "crpix2": 8.33933082442, "crval1": 0, "naxis1": 192, "wcsaxes": 2, "cdelt2": 0.0666666666667, "cunit2": "deg", "lonpole": 180, "pv2_1": 45, "cunit1": "deg", "ctype2": "DEC--AIR", "ctype1": "RA---AIR", "cdelt1": -0.0666666666667, "restfrq": 1420405750, "equinox": 2000, "latpole": -90, "restwav": 0};

// Zenithal Equidistant
arc = {"naxis2": 192, "crval2": -90, "crpix1": -246.941901905, "crpix2": 5.08227445044, "crval1": 0, "naxis1": 192, "wcsaxes": 2, "cdelt2": 0.0666666666667, "cunit2": "deg", "lonpole": 180, "cunit1": "deg", "ctype2": "DEC--ARC", "ctype1": "RA---ARC", "cdelt1": -0.0666666666667, "restfrq": 1420405750, "equinox": 2000, "latpole": -90, "restwav": 0};

// Zenithal perspective
azp = {"naxis2": 192, "crval2": -90, "crpix1": -254.110084878, "crpix2": -11.3494854253, "crval1": 0, "naxis1": 192, "wcsaxes": 2, "cdelt2": 0.0666666666667, "cunit2": "deg", "lonpole": 180, "pv2_1": 2, "cunit1": "deg", "ctype2": "DEC--AZP", "ctype1": "RA---AZP", "cdelt1": -0.0666666666667, "restfrq": 1420405750, "equinox": 2000, "latpole": -90, "pv2_2": 30, "restwav": 0};

// North Celestial Pole (SIN special case)
ncp = {"naxis2": 192, "crval2": -90, "crpix1": -237.189543154, "crpix2": 7.68857200935, "crval1": 0, "naxis1": 192, "wcsaxes": 2, "cdelt2": 0.0666666666667, "cunit2": "deg", "lonpole": 180, "pv2_1": 0, "cunit1": "deg", "ctype2": "DEC--SIN", "ctype1": "RA---SIN", "cdelt1": -0.0666666666667, "restfrq": 1420405750, "equinox": 2000, "latpole": -90, "pv2_2": -1.21679644751e-08, "restwav": 0};

// Generalized orthographic
sin = {"naxis2": 192, "crval2": -90, "crpix1": -237.189543154, "crpix2": 7.68857112488, "crval1": 0, "naxis1": 192, "wcsaxes": 2, "cdelt2": 0.0666666666667, "cunit2": "deg", "lonpole": 180, "pv2_1": 0, "cunit1": "deg", "ctype2": "DEC--SIN", "ctype1": "RA---SIN", "cdelt1": -0.0666666666667, "restfrq": 1420405750, "equinox": 2000, "latpole": -90, "pv2_2": 0, "restwav": 0};

// Stereographic
stg = {"naxis2": 192, "crval2": -90, "crpix1": -251.945990929, "crpix2": 3.74494253774, "crval1": 0, "naxis1": 192, "wcsaxes": 2, "cdelt2": 0.0666666666667, "cunit2": "deg", "lonpole": 180, "cunit1": "deg", "ctype2": "DEC--STG", "ctype1": "RA---STG", "cdelt1": -0.0666666666667, "restfrq": 1420405750, "equinox": 2000, "latpole": -90, "restwav": 0};

// Slant zenithal perspective
szp = {"pv2_3": 60, "crval2": -90, "crpix1": -247.865697278, "crpix2": -22.6205195637, "crval1": 0, "naxis1": 192, "wcsaxes": 2, "cdelt2": 0.0666666666667, "cunit2": "deg", "lonpole": 180, "pv2_1": 2, "cunit1": "deg", "ctype2": "DEC--SZP", "ctype1": "RA---SZP", "cdelt1": -0.0666666666667, "restfrq": 1420405750, "equinox": 2000, "latpole": -90, "naxis2": 192, "pv2_2": 180, "restwav": 0};

// Gnomonic
tan = {"naxis2": 192, "crval2": -90, "crpix1": -268.065808712, "crpix2": -0.563043720109, "crval1": 0, "naxis1": 192, "wcsaxes": 2, "cdelt2": 0.0666666666667, "cunit2": "deg", "lonpole": 180, "cunit1": "deg", "ctype2": "DEC--TAN", "ctype1": "RA---TAN", "cdelt1": -0.0666666666667, "restfrq": 1420405750, "equinox": 2000, "latpole": -90, "restwav": 0};

// Zenithal equal area
zea = {"naxis2": 192, "crval2": -90, "crpix1": -244.488069036, "crpix2": 5.73805594999, "crval1": 0, "naxis1": 192, "wcsaxes": 2, "cdelt2": 0.0666666666667, "cunit2": "deg", "lonpole": 180, "cunit1": "deg", "ctype2": "DEC--ZEA", "ctype1": "RA---ZEA", "cdelt1": -0.0666666666667, "restfrq": 1420405750, "equinox": 2000, "latpole": -90, "restwav": 0};

// Zenithal polynomial
zpn = {"naxis2": 192, "equinox": 2000, "crpix1": -183.293725563, "crpix2": 22.0921112058, "lonpole": 180, "ctype2": "DEC--ZPN", "ctype1": "RA---ZPN", "pv2_8": 0, "pv2_9": 0, "pv2_0": 0.05, "wcsaxes": 2, "pv2_2": -0.807, "pv2_3": 0.337, "pv2_4": -0.065, "pv2_5": 0.01, "pv2_6": 0.003, "pv2_7": -0.001, "pv2_12": 0, "pv2_13": 0, "pv2_10": 0, "pv2_11": 0, "pv2_16": 0, "pv2_17": 0, "pv2_14": 0, "pv2_15": 0, "restfrq": 1420405750, "pv2_18": 0, "pv2_19": 0, "restwav": 0, "crval2": -90, "crval1": 0, "cunit1": "deg", "cunit2": "deg", "cdelt1": -0.0666666666667, "cdelt2": 0.0666666666667, "naxis1": 192, "pv2_1": 0.975, "latpole": -90};


