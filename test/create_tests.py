
import glob
import numpy
from astropy import wcs
from astropy.io import fits

JS_TEST_TEMPLATE = """
  '%(projection)s': function(test) {
    var header, w, world;
    
    header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_%(projection)s'), 'utf8');
    w = new wcs();
    w.init(header);
    
    world = w.pix2sky(%(x0)d, %(y0)d);
    test.equal(world[0], %(ra0).14f);
    test.equal(world[1], %(dec0).14f);
    
    world = w.pix2sky(%(x1)d, %(y1)d);
    test.equal(world[0], %(ra1).14f);
    test.equal(world[1], %(dec1).14f);
    
    world = w.pix2sky(%(x2)d, %(y2)d);
    test.equal(world[0], %(ra2).14f);
    test.equal(world[1], %(dec2).14f);
    
    test.done();
  },
"""


def get_projection(filename):
    return filename[13:16]

def create_tests():
    for f in glob.glob("data/*.fits.gz"):
        header = fits.getheader(f)
        w = wcs.WCS(header)
        
        pixcrd = numpy.array([[0, 0], [24, 38], [45, 98]], numpy.float_)
        world = w.all_pix2world(pixcrd, 0)
        
        template_obj = {
            "projection": get_projection(f),
        }
        
        for index, value in enumerate(pixcrd):
            template_obj["x%d" % index] = value[0]
            template_obj["y%d" % index] = value[1]
            template_obj["ra%d" % index] = world[index][0]
            template_obj["dec%d" % index] = world[index][1]
        
        template = JS_TEST_TEMPLATE % template_obj
        print template

if __name__ == '__main__':
    create_tests()