import os
import sys
import inspect
from json import JSONEncoder

import pyfits
import pywcs

def wcs2json(in_file, out_file, string = False):
    """
    Constructs a JSON file containing FITS keywords relevant to world coordinate system.
    """
    header = pyfits.getheader(in_file)
    json = JSONEncoder().encode(dict(header))
    if string:
        return "var %s = %s;" % (header['CTYPE1'].lower()[5:].replace('-', '_'), json)
    else :
        f = open(out_file, 'w')    
        f.write( "var %s = %s;" % (header['CTYPE1'].lower()[5:], json) )
        f.close()

def process_wcs(directory):
    """
    Loop through a directory of FITS files, format the WCS, and export a JSON.
    """
    
    fits_files = []
    data = []
    for root, dirs, files in os.walk(directory):
        for f in files:
            
            # Process only the FITS files
            try:
                filename, extension = f.split('.')
            except ValueError:
                continue
            
            if extension.lower() in ('fit', 'fits'):
                f = os.path.join(root, f)
                filename += '.js'
                fits_files.append(f)
                data.append( wcs2json( f, os.path.join(root, filename), string = True) )
    
    f = open('test/data/data.js', 'w')
    for item in data:
        f.write(item)
        f.write("\n");
    f.close()
    
    # # Get files in the directory
    # files = os.listdir(directory)
    # 
    # # Create container for FITS images
    # fits_files = []
    # 
    # # Grab only the FITS files
    # for f in files:
    #     try:
    #         filename, extension = f.split('.')
    #     except ValueError:
    #         continue
    #     
    #     if extension in ('fit', 'fits'):
    #         fits_files.append(directory + f)
    # 
    #     # Convert to string then JSON
    #     for f in fits_files:
    #         filename = f.split('.')[0] + '.js'
    #         wcs2json(f, filename)
    
    
if __name__ == '__main__':
    if len(sys.argv) != 2:
        print "Usage: python %s [directory]" % inspect.getfile( inspect.currentframe() )
        sys.exit()

    process_wcs(sys.argv[1])