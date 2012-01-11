Quick and dirty README.

Sift out the files wcs.js and math.js in the jasmine directory.  Drop them into your JS project.

Create a JSON with relevant WCS keywords and values, e.g.


    var tan = {
        "EQUINOX": 2000.0,
        "CRPIX1": -268.0658087122,
        "CRPIX2": -0.5630437201085,
        "CRVAL1": 0.0,
        "NAXIS1": 192,
        "CDELT1": -0.06666666666667,
        "CDELT2": 0.06666666666667,
        "NAXIS2": 192,
        "LONPOLE": 180.0,
        "NAXIS": 2,
        "CTYPE2": "DEC--TAN",
        "CTYPE1": "RA---TAN",
        "CRVAL2": -90.0,
        "LATPOLE": -90.0
    };

Initialize a WCS Mapper object with the JSON.


    var wcs;
    wcs = WCS.Mapper(tan);


Transform coordinates from pixel to sky and back:


    // Pixel to sky transformation
    var pixel = [x, y];
    sky = wcs.pixelToCoordinate(pixel);

    // Access the sky coordinates
    alert(sky.ra);
    alert(sky.dec);


    // Sky to pixel transformation
    var sky = [ra, dec];
    pix = wcs.coordinateToPixel(sky[0], sky[1]);

    // Access the pixel coordinates
    alert(pix.x);
    alert(pix.y);


