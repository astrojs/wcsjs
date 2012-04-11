import os
import sys
import inspect
from wcs_utils import wcs2json

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