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
    
    # PyWCS omits NAXIS tags
    header_wcs.update('NAXIS1', header['NAXIS1'])
    header_wcs.update('NAXIS2', header['NAXIS2'])

    wcs_dict = {}
    naxis = []
    crval = []
    cunit = []
    crpix = []
    cdelt = []
    ctype = []
    pc = []
    pv = []
    cd = []
    
    # First pass to populate arrayed data
    for key in header_wcs.keys():
        
        #
        # Check for data that is multi-valued
        #
        
        if (key.lower().startswith('naxis')):
            naxis.append(header_wcs[key])
        elif (key.lower().startswith('crval')):
            crval.append(header_wcs[key])
        elif (key.lower().startswith('cunit')):
            cunit.append(header_wcs[key])
        elif (key.lower().startswith('crpix')):
            crpix.append(header_wcs[key])
        elif (key.lower().startswith('cdelt')):
            cdelt.append(header_wcs[key])
        elif (key.lower().startswith('ctype')):
            ctype.append(header_wcs[key])
        elif (key.lower().startswith('pc')):
            pc.append(header_wcs[key])
        elif (key.lower().startswith('pv')):
            pv.append(header_wcs[key])
        elif (key.lower().startswith('cd')):
            cd.append(header_wcs[key])
        else:
            wcs_dict[key.lower().replace('-', '_')] = header_wcs[key]            
    
    if (len(naxis) > 0):
        wcs_dict['naxis'] = naxis
    if (len(crval) > 0):
        wcs_dict['crval'] = crval
    if (len(cunit) > 0):
        wcs_dict['cunit'] = cunit
    if (len(crpix) > 0):
        wcs_dict['crpix'] = crpix
    if (len(cdelt) > 0):
        wcs_dict['cdelt'] = cdelt
    if (len(ctype) > 0):
        wcs_dict['ctype'] = ctype
    if (len(pc) > 0):
        wcs_dict['pc'] = pc
    if (len(pv) > 0):
        wcs_dict['pv'] = pv
    if (len(cd) > 0):
        wcs_dict['cd'] = cd
        
    f = open(out_file, 'w')    
    json = JSONEncoder().encode(wcs_dict)
    f.write(json)
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