var air, arc, azp, ncp, sin, stg, szp, tan, zea, zpn;
var ait, car, cea, cyp, mer, mol, par, sfl;

//
//	Zenithal Projections
//

// Airy
air = {"crpix": [-234.754501084, 8.33933082442], "equinox": 2000, "pv": [45], "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---AIR", "DEC--AIR"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": -90, "restwav": 0}

// Zenithal Equidistant
arc = {"crpix": [-246.941901905, 5.08227445044], "equinox": 2000, "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---ARC", "DEC--ARC"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": -90, "restwav": 0}

// Zenithal perspective
azp = {"crpix": [-254.110084878, -11.3494854253], "equinox": 2000, "pv": [2, 30], "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---AZP", "DEC--AZP"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": -90, "restwav": 0}

// North Celestial Pole (SIN special case)
ncp = {"crpix": [-237.189543154, 7.68857200935], "equinox": 2000, "pv": [0, -1.21679644751e-08], "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---SIN", "DEC--SIN"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": -90, "restwav": 0}

// Generalized orthographic
sin = {"crpix": [-237.189543154, 7.68857112488], "equinox": 2000, "pv": [0, 0], "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---SIN", "DEC--SIN"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": -90, "restwav": 0}

// Stereographic
stg = {"crpix": [-251.945990929, 3.74494253774], "equinox": 2000, "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---STG", "DEC--STG"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": -90, "restwav": 0}

// Slant zenithal perspective
szp = {"crpix": [-247.865697278, -22.6205195637], "equinox": 2000, "pv": [2, 180, 60], "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---SZP", "DEC--SZP"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": -90, "restwav": 0}

// Gnomonic
tan = {"crpix": [-268.065808712, -0.563043720109], "equinox": 2000, "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---TAN", "DEC--TAN"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": -90, "restwav": 0}

// Zenithal equal area
zea = {"crpix": [-244.488069036, 5.73805594999], "equinox": 2000, "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---ZEA", "DEC--ZEA"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": -90, "restwav": 0}

// Zenithal polynomial
zpn = {"crpix": [-183.293725563, 22.0921112058], "equinox": 2000, "pv": [0.05, 0.975, -0.807, 0.337, -0.065, 0.01, 0.003, -0.001, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---ZPN", "DEC--ZPN"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": -90, "restwav": 0}


//
//	Cylindrical Projections
//

// Hammer-Aitoff
ait = {"crpix": [-246.231711628, 7.11585002705], "equinox": 2000, "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---AIT", "DEC--AIT"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": 0, "restwav": 0}

// Plate Carrée
car = {"crpix": [-248.217381441, 7.52703819975], "equinox": 2000, "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---CAR", "DEC--CAR"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": 0, "restwav": 0}

// Cylindrical Equal Area
cea = {"crpix": [-248.217381441, 7.68857112488], "equinox": 2000, "pv": [1], "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---CEA", "DEC--CEA"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": 0, "restwav": 0}

// Cylindrical Perspective
cyp = {"crpix": [-147.105551401, 20.5609993928], "equinox": 2000, "pv": [1, 0.707106781187], "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---CYP", "DEC--CYP"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": 0, "restwav": 0}

// Mercator
mer = {"crpix": [-248.217381441, 7.36497841286], "equinox": 2000, "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---MER", "DEC--MER"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": 0, "restwav": 0}

// Mollweide
mol = {"crpix": [-212.76559475, -2.31067099452], "equinox": 2000, "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---MOL", "DEC--MOL"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": 0, "restwav": 0}

// Parabolic
par = {"crpix": [-246.555149428, 3.32293776965], "equinox": 2000, "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---PAR", "DEC--PAR"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": 0, "restwav": 0}

// Sanson-Flamsteed
sfl = {"crpix": [-246.348308624, 7.52703819975], "equinox": 2000, "wcsaxes": 2, "lonpole": 180, "cdelt": [-0.0666666666667, 0.0666666666667], "naxis": [192, 192], "ctype": ["RA---SFL", "DEC--SFL"], "crval": [0, -90], "restfrq": 1420405750, "cunit": ["deg", "deg"], "latpole": 0, "restwav": 0}
