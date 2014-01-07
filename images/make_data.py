import glob
from os import path
import json
import numpy as np
from astropy.io import fits
import Image


def make_images():
    for f in glob.glob(path.join('..', 'test', 'data', "*.fits.gz")):
        
        data = fits.getdata(f)
        
        minimum = np.nanmin(data)
        extent = float(np.nanmax(data) - minimum)
        extent = extent - 0.5 * extent
        
        data = (data - minimum) / extent
        data = (255.0 * data).astype('uint8')
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