import os
import sys
import inspect
from wcs_utils import wcs2json

def process_wcs(directory):
    """
    Loop through a directory of FITS files, format the WCS, and export a JSON.
    """
    
    # Get files in the directory
    files = os.listdir(directory)
    
    # Create container for FITS images
    fits_files = []
    
    # Grab only the FITS files
    for f in files:
        try:
            filename, extension = f.split('.')
        except ValueError:
            continue
        
        if extension in ('fit', 'fits'):
            fits_files.append(directory + f)
    
        # Convert to string then JSON
        for f in fits_files:
            filename = f.split('.')[0] + '.json'
            wcs2json(f, filename)
    
    
if __name__ == '__main__':
    if len(sys.argv) != 2:
        print "Usage: python %s [directory]" % inspect.getfile( inspect.currentframe() )
        sys.exit()

    process_wcs(sys.argv[1])