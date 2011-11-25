import sys
import inspect
from json import JSONEncoder
import pyfits
import pywcs


def wcs2json(in_file, out_file):
    """
    Constructs a JSON file containing FITS keywords relevant to world coordinate system.
    """
    header = pyfits.getheader(in_file)
    wcs = pywcs.WCS(header)
    header_wcs = wcs.to_header()
    
    wcs_dict = {}
    print header_wcs
    for key in header_wcs.keys():
        wcs_dict[key.lower().replace('-', '_')] = header_wcs[key]
        
    f = open(out_file, 'w')    
    json = JSONEncoder().encode(wcs_dict)
    f.write(json)
    f.close()


if __name__ == '__main__':

    if len(sys.argv) != 3:
        print "Usage: python %s [fits file] [json file]" % inspect.getfile( inspect.currentframe() )
        sys.exit()
        
    wcs2json( sys.argv[1], sys.argv[2] )