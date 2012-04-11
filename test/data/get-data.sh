
# Make some directories
mkdir conic
mkdir cylindrical
mkdir zenithal

# Download the example files
cd zenithal
curl -# -C - -o "1904-66_AIR.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_AIR.fits.gz"
curl -# -C - -o "1904-66_ARC.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_ARC.fits.gz"
curl -# -C - -o "1904-66_AZP.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_AZP.fits.gz"
curl -# -C - -o "1904-66_NCP.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_NCP.fits.gz"
curl -# -C - -o "1904-66_SIN.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_SIN.fits.gz"
curl -# -C - -o "1904-66_STG.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_STG.fits.gz"
curl -# -C - -o "1904-66_SZP.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_SZP.fits.gz"
curl -# -C - -o "1904-66_TAN.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_TAN.fits.gz"
curl -# -C - -o "1904-66_ZEA.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_ZEA.fits.gz"
curl -# -C - -o "Deep_32_TAN_SIP.fits" "http://lsst.astro.washington.edu/simdata/deep/ccds/Deep_32.fits"

cd ../cylindrical
curl -# -C - -o "1904-66_AIT.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_AIT.fits.gz"
curl -# -C - -o "1904-66_CAR.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_CAR.fits.gz"
curl -# -C - -o "1904-66_CEA.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_CEA.fits.gz"
curl -# -C - -o "1904-66_CYP.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_CYP.fits.gz"
curl -# -C - -o "1904-66_MER.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_MER.fits.gz"
curl -# -C - -o "1904-66_MOL.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_MOL.fits.gz"
curl -# -C - -o "1904-66_PAR.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_PAR.fits.gz"
curl -# -C - -o "1904-66_SFL.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_SFL.fits.gz"

cd ../conic
curl -# -C - -o "1904-66_COD.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_COD.fits.gz"
curl -# -C - -o "1904-66_COE.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_COE.fits.gz"
curl -# -C - -o "1904-66_COO.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_COO.fits.gz"
curl -# -C - -o "1904-66_COP.fits.gz" "http://www.atnf.csiro.au/people/mcalabre/data/WCS/1904-66_COP.fits.gz"