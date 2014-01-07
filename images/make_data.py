import glob
from os import path
import json
import numpy as np
from astropy.io import fits
import Image


def make_images():
    
    # Get the global min and max pixel
    extents = []
    for f in glob.glob(path.join('..', 'test', 'data',"*.fits.gz")):
        data = fits.getdata(f)
        extents.append( np.nanmin(data) )
        extents.append( np.nanmax(data) )
    
    extents = np.array(extents)
    minimum = extents.min()
    maximum = extents.max()
    extent = float(maximum - minimum)
    extent = extent - 0.75 * extent
    
    for f in glob.glob(path.join('..', 'test', 'data', "*.fits.gz")):
        data = fits.getdata(f)
        
        data = (data - minimum) / extent
        data = (255.0 * data)
        data = np.clip(data, 0, 255).astype('uint8')
        data = np.flipud(data)
        
        im = Image.fromarray(data)
        im.save(f.replace('fits.gz', 'png'))

def make_headers():
    headers = {}
    for f in glob.glob(path.join('..', 'test', 'data', "*.fits.gz")):
        header = fits.getheader(f)
        
        del header["HISTORY"]
        del header["COMMENT"]
        headers[f[8:11]] = header.tostring()
        
    print json.dumps(headers)


if __name__ == '__main__':
    make_images()