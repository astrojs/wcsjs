import sys
import inspect
from json import JSONEncoder
import pyfits
import pywcs


def wcs2json(in_file, out_file, string = False):
    """
    Constructs a JSON file containing FITS keywords relevant to world coordinate system.
    """
    
    # Keywords relavant to WCS
    # wcs_single_keywords = ['NAXIS', 'WCSAXES', 'LONPOLE', 'LATPOLE', 'EQUINOX', 'RADESYS']
    # wcs_axis_keywords = ['NAXIS', 'CRVAL', 'CRPIX', 'CDELT', 'CTYPE']
    # wcs_matrix_keywords = ['PC', 'CD', 'PV']
    # sip_single_keywords = ['A_ORDER', 'B_ORDER', 'AP_ORDER', 'BP_ORDER']
    # sip_multivalued_keywords = ['A', 'B', 'AP', 'BP']

    # Initialize a dictionary for the WCS properties
    # wcs = {}
    
    # Get the FITS header
    header = pyfits.getheader(in_file)
    
    # # Loop through the single keywords, adding them to dictionary
    # for key in wcs_single_keywords:
    #     if (header.has_key(key)):
    #         wcs[key] = header[key]
    # 
    # # Get the number of axes
    # if wcs.has_key('NAXIS'):
    #     naxes = wcs['NAXIS']
    # elif wcs.has_key('WCSAXES'):
    #     naxes = wcs['WCSAXES']
    # else:
    #     naxes = 2
    # 
    # # Cool, now that we know the dimensions, loop through the axis keywords
    # for key in wcs_axis_keywords:
    #     for axis in xrange(1, naxes + 1):
    #         full_key = "%s%d" % (key, axis)
    #         if (header.has_key(full_key)):
    #             wcs[full_key] = header[full_key]
    #             
    # # Now, for the matrix keywords
    # for key in wcs_matrix_keywords:
    #     for i in xrange(1, naxes + 1):
    #         for j in xrange(1, naxes + 1):
    #             full_key = "%s%d_%d" % (key, i, j)
    #             if (header.has_key(full_key)):
    #                 wcs[full_key] = header[full_key]
    # 
    # # And on to the SIP keywords
    # for key in sip_single_keywords:
    #     if (header.has_key(key)):
    #         wcs[key] = header[key]
    # if (wcs.has_key('A_ORDER') and wcs.has_key('B_ORDER')):
    #     for key in sip_multivalued_keywords:
    #         for i in xrange(0, wcs['A_ORDER'] + 1):
    #             for j in xrange(0, wcs['B_ORDER'] + 1):
    #                 full_key = "%s_%d_%d" % (key, i, j)
    #                 if (header.has_key(full_key)):
    #                     wcs[full_key] = header[full_key]

    json = JSONEncoder().encode(dict(header))
    if string:
        return "var %s = %s;" % (header['CTYPE1'].lower()[5:].replace('-', '_'), json)
    else :
        f = open(out_file, 'w')    
        f.write( "var %s = %s;" % (header['CTYPE1'].lower()[5:], json) )
        f.close()


def avm2json(avm_file, out_file):
    """
    Extract WCS related metadata from an AVM tagged PR image, and convert to JSON.
    """
    try:
        from pyavm import AVM, NoAVMPresent
    except ImportError:
        print "Function needs the PyAVM library."
        print "Run: easy_install pyavm"
    
    try:
        avm = AVM(avm_file)
    except NoAVMPresent:
        return False
        
    # Short cut the spatial info
    spatial = avm.Spatial
    
    # Check Spatial.Quality
    if spatial.__dict__.has_key('Quality'):
        if spatial.__dict__['Quality'].lower() == 'full':
            wcs_dict = {}
            wcs_dict['radecsys'] = spatial.CoordinateFrame
            wcs_dict['crpix'] = spatial.ReferencePixel
            wcs_dict['equinox'] = spatial.Equinox
            wcs_dict['cd'] = spatial.CDMatrix
            wcs_dict['crval'] = spatial.ReferenceValue
            wcs_dict['naxis'] = spatial.ReferenceDimension
            wcs_dict['cdelt'] = spatial.Scale
            wcs_dict['ctype'] = ["RA---"+ spatial.CoordsystemProjection, "DEC--" + spatial.CoordsystemProjection]
            wcs_dict['crota2'] = spatial.Rotation
            
            f = open(out_file, 'w')
            json = JSONEncoder().encode(wcs_dict)
            f.write(json)
            f.close()
            return True

    return False
    

if __name__ == '__main__':

    if len(sys.argv) != 3:
        print "Usage: python %s [fits file] [json file]" % inspect.getfile( inspect.currentframe() )
        sys.exit()
        
    wcs2json( sys.argv[1], sys.argv[2] )