import sys
import inspect
import numpy
import pyfits
import pywcs
from celwcs import celwcs

def wcstest(x, y):
    """
    Open the gnomonic projection FITS file to check out the WCS.
    """
    
    # Open the FITS header
    header = pyfits.getheader('example-wcs/zenithal/1904-66_TAN.fits')
    
    # Pipe the header through pywcs
    wcs = pywcs.WCS(header)
    
    # Get the pywcs formatted header
    header = wcs.to_header()
    
    # Initialize the celwcs object
    del wcs
    wcs = celwcs(header)
    
    # Format the point
    point = numpy.array( [[float(x)], [float(y)]] )
    
    # Linear transformation
    sky = wcs.frompixel(point)
    print sky
    

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print "Usage: python %s [x] [y]" % inspect.getfile( inspect.currentframe() )
        sys.exit()
        
    wcstest( sys.argv[1], sys.argv[2] )
