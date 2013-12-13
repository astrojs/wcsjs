import glob
from astropy.io import fits


def get_headers():
    for f in glob.glob("data/*.fits.gz"):
        header = fits.getheader(f)
        header.totextfile(f.replace('.fits.gz', ''))

if __name__ == '__main__':
    get_headers()