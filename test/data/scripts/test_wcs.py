import os
import numpy
import pyfits
import pywcs
# from celwcs import celwcs

def test_wcs():
    """
    Testing the WCS routines in celwcs.py
    """
    
    # Set up the CelWCS object
    filename = 'example-wcs/zenithal/1904-66_TAN.fits'
    header = pyfits.getheader(filename)
    
    # Initialize the WCS objects
    wcs_pywcs = pywcs.WCS(header)
    # wcs_celwcs = celwcs(header)
    
    # Set the pixel coordinate
    pixel = numpy.array([0, 0])
    
    # Apply tranformations
    sky_pywcs = wcs_pywcs.all_pix2sky([pixel], 0)[0]
    # sky_celwcs = wcs_celwcs.frompixel(pixel)
    
    # Feedback
    print "Transforming(%.1f, %.1f) to sky ...\n" % (pixel[0], pixel[1])
    print "PyWCS Coordinate:\t%.5f %.5f" % (sky_pywcs[0], sky_pywcs[1])
    # print "CelWCS Coordinate:\t%.5f %.5f" % (sky_celwcs[0], sky_celwcs[1])


def generate_test_coordinates():
    """
    Testing against PyWCS (i.e. WCSLIB).
    """
    root_dir = 'example-wcs'
    
    image_dim = [191, 191]
    pixel_coordinates = numpy.array([
        [0, 0],
        [image_dim[0], 0],
        [0, image_dim[1]],
        image_dim,
        [image_dim[0] / 2., image_dim[1] / 2.]
    ])
    
    for element in pixel_coordinates:
        # Format for JS
        print "pixels.push([%.1f, %.1f]);" % (element[0], element[1])
    
    for root, directories, files in os.walk(os.path.join(root_dir)):
        for f in files:
            info = f.split('.')
            if (info[-1] == 'fits'):
                filename = info[0]
                extension = info[1]
                projection = filename[-3:]
                
                # Construct the file path
                file_path = os.path.join(root, f)
                
                # Get the header
                header = pyfits.getheader(file_path)
                wcs = pywcs.WCS(header)
                sky = wcs.wcs_pix2sky(pixel_coordinates, 0)
                print projection
                for element in sky:
                    # Format for JS
                    print "sky.push([%.11f, %.11f]);" % (element[0], element[1])
                print "\n"
                
        

if __name__ == '__main__':
    generate_test_coordinates()