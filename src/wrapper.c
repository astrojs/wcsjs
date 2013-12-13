#include <stdio.h>
#include <wcslib/wcshdr.h>
#include <wcslib/wcs.h>


struct wcsprm* getWcs(char *header, int nkeyrec) {
  int relax = 0, ctrl = 0;
  int nreject, nwcs;
  struct wcsprm *wcs;
  
  wcspih(header, nkeyrec, relax, ctrl, &nreject, &nwcs, &wcs);
  return wcs;
}

int pix2sky(struct wcsprm *wcs, double x, double y, double *world) {
  double imgcrd[2], phi[2], theta[2];
  int status[1];
  double pixcrd[2] = {x, y};
  
  wcsp2s(wcs, 1, 2, pixcrd, imgcrd, phi, theta, world, status);
  return status[0];
}

int sky2pix(struct wcsprm *wcs, double ra, double dec, double *pixcrd) {
  double imgcrd[2], phi[2], theta[2];
  int status[1];
  double world[2] = {ra, dec};
  
  wcss2p(wcs, 1, 2, world, phi, theta, imgcrd, pixcrd, status);
  return status[0];
}