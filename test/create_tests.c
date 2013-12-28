#include <stdio.h>
#include <string.h>
#include "fitsio.h"
#include <wcslib/wcshdr.h>
#include <wcslib/wcs.h>


int main(void) {
  
  fitsfile *fptr;
  int nkeyrec, nreject, nwcs, status = 0;
  char *header;
  char filepath[27];
  struct wcsprm *wcs;
  
  int nprojections = 28;
  char *projections[] = {"AIR","AIT","ARC","AZP","BON","CAR","CEA","COD","COE","COO","COP","CSC","CYP","HPX","MER","MOL","NCP","PAR","PCO","QSC","SFL","SIN","STG","SZP","TAN","TSC","ZEA","ZPN"};
  
  int pixcrd1[] = {0, 0, 24, 38, 45, 98};
  double pixcrd[] = {0, 0, 24, 38, 45, 98};
  double imgcrd[6], phi[6], theta[6], world[6];
  int stat[6];
  
  for (int i = 0; i < nprojections; i++) {
    
    // Get header from FITS file
    strcpy(filepath, "test/data/1904-66_");
    strcat(filepath, projections[i]);
    strcat(filepath, ".fits");
    
    fits_open_image(&fptr, filepath, READONLY, &status);
    fits_hdr2str(fptr, 1, NULL, 0, &header, &nkeyrec, &status);
    
    wcspih(header, nkeyrec, 0, 0, &nreject, &nwcs, &wcs);
    wcsp2s(wcs, 3, 2, pixcrd, imgcrd, phi, theta, world, stat);
    
    printf("'%s': function(test) {\n", projections[i]);
    printf("  var header, w, world, pixel;\n");
    printf("\n");
    printf("  header = fs.readFileSync(path.join(__dirname, 'data', '1904-66_%s'), 'utf8');\n", projections[i]);
    printf("  w = new wcs();\n");
    printf("  w.init(header);\n");
    printf("\n");
    
    for (int j = 0; j < 6; j += 2) {
      printf("  world = w.pix2sky(%d, %d);\n", pixcrd1[j], pixcrd1[j+1]);
      printf("  test.equal(world[0].toFixed(6), %.6f);\n", world[j]);
      printf("  test.equal(world[1].toFixed(6), %.6f);\n", world[j+1]);
      printf("\n");
      printf("  pixel = w.sky2pix(%f, %f);\n", world[j], world[j+1]);
      printf("  test.equal(Math.round(pixel[0]), %d);\n", pixcrd1[j]);
      printf("  test.equal(Math.round(pixel[1]), %d);\n", pixcrd1[j+1]);
      
      printf("\n");
    }
    
    printf("  test.done();\n");
    printf("},\n\n");
    
    fits_close_file(fptr, &status);
  }
  
  // fits_open_image(&fptr, "examples/m101.fits", READONLY, &status);
  // fits_hdr2str(fptr, 1, NULL, 0, &header, &nkeyrec, &status);
  // wcspih(header, nkeyrec, 0, 0, &nreject, &nwcs, &wcs);
  // wcsp2s(wcs, 3, 2, pixcrd, imgcrd, phi, theta, world, stat);
  // 
  // for (int j = 0; j < 6; j += 2) {
  //   printf("%f, %f\n", world[j], world[j+1]);
  // }
  // 
  // fits_close_file(fptr, &status);
  
  return 0;
}