#!/usr/bin/env python

# Library for performing WCS projections
# Copyright (c) 2005, 2006, 2007, Jeremy Brewer
# 
# All rights reserved.
# 
# Redistribution and use in source and binary forms, with or without 
# modification, are permitted provided that the following conditions are 
# met:
# 
#     * Redistributions of source code must retain the above copyright 
#       notice, this list of conditions and the following disclaimer.
#     * Redistributions in binary form must reproduce the above copyright 
#       notice, this list of conditions and the following disclaimer in 
#       the documentation and/or other materials provided with the
#       distribution.
#     * The names of the contributors may not be used to endorse or 
#       promote products derived from this software without specific prior 
#       written permission.
# 
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
# "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
# LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
# A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT 
# OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
# EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
# PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
# PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
# LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
# NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#
# Changelog:
#
# 9/25/07 Added call to fits_simple_verify() to verify input file is FITS.
#
# 9/14/07 Replaced fitslib.py with pyfits module.  Modification made by
#         Christopher Hanley, Space Telescope Science Institute
#
#
# 8/7/07  Added support for converting CDELT based WCS information to a
#         CD matrix representation.  In addition, the CD matrix inverse is
#         computed and cached upon instantiation now.

""" 
Module for WCS projection classes.

All WCS projections follow a simple interface and are created by a factory
function that determines the proper class to return.    This is best
illustrated with a small example:

import pyfits
import wcslib

fits = pyfits.open("foo.fits")
hdr = fits[0].header

# hdr can be any dictionary-like object with FITS keywords as keys
wcs = wcslib.WcsProjection(hdr)

# give ra, dec of pixel (2, 4) in J2000
ra, dec = wcs.toRaDec(2.0, 4.0)

# give x, y of ra, dec (23.0, 19.0) without rounding to nearest pixel
x, y = wcs.toPixel(23.0, 19.0, rnd=False)
"""

__author__ = "Jeremy Brewer (jeremy.d.brewer@gmail.com)"
__copyright__ = "Copyright 2005, 2006, 2007 Jeremy Brewer"
__license__ = "BSD"
__version__ = "1.1"

import math

class BaseWcsProjection(object):
  
    """
    Base class for all WCS projections.  Handles setting the basic WCS
    values.
    """
    
    def __init__(self, hdr, autoflip=True):

        """
        Creates a WCS object from the given FITS header dictionary-like object.
        A KeyError is raised if the appropriate keyword is not found, and a
        ValueError is raised if the keywords types are invalid.
        
        Input:  hdr      -- a dictionary like object containing FITS keywords
                autoflip -- whether to automatically flip the WCS
        """

        self.cd = [0.0] * 4
        self.crval = [0.0] * 2
        self.crpix = [0.0] * 2
        self.ctype = [""] * 2
        
        # this check allows interpoerability with more primitive header
        # reading codes that don't strip the quotes
        self.ctype[0] = str(hdr["CTYPE1"]).lstrip("'").rstrip("'")
        self.ctype[1] = str(hdr["CTYPE2"]).lstrip("'").rstrip("'")
        
        self.crval[0] = float(hdr["CRVAL1"])
        self.crval[1] = float(hdr["CRVAL2"])

        self.crpix[0] = float(hdr["CRPIX1"])
        self.crpix[1] = float(hdr["CRPIX2"])

        # convert older WCS conventions to a CD matrix
        if "CDELT1" in hdr:
            # check for projections that can't be changed to CD matrices
            if self.ctype[-3:] in ("AIT", "GLS", "MER"):
                raise ValueError("FITS file has unsupported CDELT " \
                                 "projection '%s'" % self.ctype[-3:])

            cdelt1 = hdr["CDELT1"]
            cdelt2 = hdr["CDELT2"]

            if "PC1_1" in hdr:
                # rotation matrix given as PC matrix
                pc1_1 = hdr["PC1_1"]
                pc1_2 = hdr["PC1_2"]
                pc2_1 = hdr["PC2_1"]
                pc2_2 = hdr["PC2_2"]
                self.cd[0] = cdelt1 * pc1_1
                self.cd[1] = cdelt1 * pc1_2
                self.cd[2] = cdelt2 * pc2_1
                self.cd[3] = cdelt2 * pc2_2               
            elif "PC001001" in hdr:
                # rotation matrix given as PC matrix, alternate version
                pc1_1 = hdr["PC001001"]
                pc1_2 = hdr["PC001002"]
                pc2_1 = hdr["PC002001"]
                pc2_2 = hdr["PC002002"]
                self.cd[0] = cdelt1 * pc1_1
                self.cd[1] = cdelt1 * pc1_2
                self.cd[2] = cdelt2 * pc2_1
                self.cd[3] = cdelt2 * pc2_2               
            else:
                # rotation given by CROTA, which defaults to 0
                if "CROTA2" in hdr:
                    crota = math.radians(float(hdr["CROTA2"]))
                elif "CROTA1" in hdr:
                    crota = math.radians(float(hdr["CROTA1"]))
                else:
                    crota = 0.0

                self.cd[0] = cdelt1 * math.cos(crota)
                self.cd[1] = -cdelt2 * math.sin(crota)
                self.cd[2] = cdelt1 * math.sin(crota)
                self.cd[3] = cdelt2 * math.cos(crota)
        else:
            # normal CD matrix
            self.cd[0] = float(hdr["CD1_1"])
            self.cd[1] = float(hdr["CD1_2"])
            self.cd[2] = float(hdr["CD2_1"])
            self.cd[3] = float(hdr["CD2_2"])

        # flip if needed
        if autoflip:
            self.flip()

        # compute the inverse of the CD matrix
        self.cd_inverse = [0.0] * 4
        det = self.cd[0] * self.cd[3] - self.cd[1] * self.cd[2]
        if det == 0.0:
            raise ZeroDivisionError("CD matrix has 0 determinant")

        self.cd_inverse[0] = self.cd[3] / det
        self.cd_inverse[1] = -self.cd[1] / det
        self.cd_inverse[2] = -self.cd[2] / det
        self.cd_inverse[3] = self.cd[0] / det

    def flip(self):
        
        """
        Flips the WCS so that CTYPE1 contains ra.
        """
        
        if self.ctype[0].startswith("DEC"):
            # ra, dec swapped
            self.crval[0], self.crval[1] = self.crval[1], self.crval[0]
            self.cd[0], self.cd[2] = self.cd[2], self.cd[0]
            self.cd[1], self.cd[3] = self.cd[3], self.cd[1]
            self.ctype[0], self.ctype[1] = self.ctype[1], self.ctype[0]

    def forceFlip(self):
        
        """
        Like flip() but ignores the CTYPE values.  This method is useful
        when the CTYPE values are known to be incorrect (e.g. when CTYPE1
        is ra but CRVAL2 is greater than 90 degrees).  The CTYPE values are
        not flipped along with the other WCS values.
        """
        
        self.crval[0], self.crval[1] = self.crval[1], self.crval[0]
        self.cd[0], self.cd[2] = self.cd[2], self.cd[0]
        self.cd[1], self.cd[3] = self.cd[3], self.cd[1]

    def __str__(self):
        raise NotImplementedError("abstract method")
    
    def toPixel(self, ra, dec, rnd=False):
        raise NotImplementedError("abstract method")

    def toRaDec(self, px, py):
        raise NotImplementedError("abstract method")

class WcsTanProjection(BaseWcsProjection):

    """Class for WCS with a TAN projection and no distortion."""
    
    def __init__(self, hdr, autoflip=True):

        """
        Creates a WCS object from the given FITS header dictionary-like object.
        
        Input:  hdr -- a dictionary like object containing FITS keywords
        """

        BaseWcsProjection.__init__(self, hdr, autoflip=autoflip)

    def __str__(self):
        
        """
        Returns a FITS header-like representation but with newlines
        """
        
        l = []
        l.append("CTYPE1 = '%8s'" % self.ctype[0])
        l.append("CTYPE2 = '%8s'" % self.ctype[1])
        l.append("CRVAL1 = %.10f" % self.crval[0])
        l.append("CRVAL2 = %.10f" % self.crval[1])
        l.append("CRPIX1 = %.10f" % self.crpix[0])
        l.append("CRPIX2 = %.10f" % self.crpix[1])
        l.append("CD1_1 = %.10e" % self.cd[0])
        l.append("CD1_2 = %.10e" % self.cd[1])
        l.append("CD2_1 = %.10e" % self.cd[2])
        l.append("CD2_2 = %.10e" % self.cd[3])
        
        return "\n".join(l)

    def toPixel(self, ra, dec, rnd=False):

        """
        Computes the pixel coordinates for a position in ra, dec using the TAN
        projection.

        Input:  ra  -- the ra of the position
                dec -- the dec of the position
                rnd -- (optional) whether to round the returned values to the
                       nearest integer, default true

        Return: 1.) The x pixel coordinate
                2.) The y pixel coordinate
        """

        # convert angles to radians
        ra = math.radians(ra)
        dec = math.radians(dec)

        # extract data into more wcs paper notation
        ra_p = math.radians(self.crval[0])
        dec_p = math.radians(self.crval[1])

        # native longitude of the celestial pole (in radians)
        if dec_p != math.radians(90.0):
            phi_p = math.radians(180.0)
        else:
            phi_p = 0.0

        # compute the "native spherical coordinates" (in radians)
        phi = phi_p + math.atan2(-math.cos(dec) * math.sin(ra - ra_p), \
                                  math.sin(dec) * math.cos(dec_p) - \
                                  math.cos(dec) * math.sin(dec_p) * \
                                  math.cos(ra - ra_p))
        theta = math.asin(math.sin(dec) * math.sin(dec_p) + \
                          math.cos(dec) * math.cos(dec_p) * \
                          math.cos(ra - ra_p))

        # compute "intermediate world coordinates"
        x = (180.0 / math.pi) * math.sin(phi) / math.tan(theta)
        y = -(180.0 / math.pi) * math.cos(phi) / math.tan(theta)

        px = self.cd_inverse[0] * x + self.cd_inverse[1] * y + self.crpix[0]
        py = self.cd_inverse[2] * x + self.cd_inverse[3] * y + self.crpix[1]

        # round to nearest int
        if rnd:
            px = int(px + 0.5)
            py = int(py + 0.5)

        return px, py
    
    def toRaDec(self, px, py):

        """
        Computes the ra, dec coordinates for a position in pixel coordinates
        px, py using the TAN projection.

        Input:  px -- the x pixel coordinate
                py -- the y pixel coordinate

        Return: 1.) ra  -- the ra of the position in degrees
                2.) dec -- the dec of the position in degrees
        """

        # use notation more like WCS paper
        ra_p = math.radians(self.crval[0])
        dec_p = math.radians(self.crval[1])
        rx = self.crpix[0]
        ry = self.crpix[1]

        # native longitude of the celestial pole in radians
        phi_p = math.radians(180.0)
        if dec_p >= math.radians(90.0):
            phi_p = 0.0

        # compute intermediate world coordinates
        dx = px - rx
        dy = py - ry
        x = self.cd[0] * dx + self.cd[1] * dy
        y = self.cd[2] * dx + self.cd[3] * dy
        
        # compute the "native spherical coordinates" in radians
        r_theta = math.sqrt(x * x + y * y)
        phi = math.atan2(x, -y)
        theta = math.atan2(180.0, math.pi * r_theta)

        # compute ra, dec
        ra = ra_p + math.atan2(-math.cos(theta) * math.sin(phi - phi_p), \
                                math.sin(theta) * math.cos(dec_p) - \
                                math.cos(theta) * math.sin(dec_p) * \
                                math.cos(phi - phi_p))
        dec = math.asin(math.sin(theta) * math.sin(dec_p) + \
                        math.cos(theta) * math.cos(dec_p) * \
                        math.cos(phi - phi_p))

        # convert ra, dec to degrees
        ra = math.degrees(ra)
        dec = math.degrees(dec)
        
        if ra < 0.0:
            ra += 360.0
        
        return ra, dec

class WcsSipProjection(WcsTanProjection):
    
    """Class for WCS information with SIP distortion coefficients."""
    
    def __init__(self, hdr, autoflip=True):
        WcsTanProjection.__init__(self, hdr, autoflip=autoflip)
        
        # forward coefficients
        self.a_order = hdr.get("A_ORDER", 0)
        self.b_order = hdr.get("B_ORDER", 0)

        self.a = {}
        self.b = {}

        if self.a_order != 0:
            for i in xrange(self.a_order + 1):
                for j in xrange(self.a_order + 1):
                    coef = hdr.get("A_%d_%d" % (i, j), None)
                    if coef is not None:
                        self.a[(i, j)] = coef

        if self.b_order != 0:
            for i in xrange(self.b_order + 1):
                for j in xrange(self.b_order + 1):
                    coef = hdr.get("B_%d_%d" % (i, j), None)
                    if coef is not None:
                        self.b[(i, j)] = coef
        
        # reverse coefficients
        self.ap_order = hdr.get("AP_ORDER", 0)
        self.bp_order = hdr.get("BP_ORDER", 0)

        self.ap = {}
        self.bp = {}

        if self.ap_order != 0:
            for i in xrange(self.ap_order + 1):
                for j in xrange(self.ap_order + 1):
                    coef = hdr.get("AP_%d_%d" % (i, j), None)
                    if coef is not None:
                        self.ap[(i, j)] = coef

        if self.bp_order != 0:
            for i in xrange(self.bp_order + 1):
                for j in xrange(self.bp_order + 1):
                    coef = hdr.get("BP_%d_%d" % (i, j), None)
                    if coef is not None:
                        self.bp[(i, j)] = coef

    def __str__(self):
        s = WcsTanProjection.__str__(self)

        l = []

        if self.a_order != 0:
            for i in xrange(self.a_order + 1):
                for j in xrange(self.a_order + 1):
                    coef = self.a.get((i, j), None)
                    if coef is not None:
                        l.append("A_%d_%d = %.10e" % (i, j, coef))

        if self.b_order != 0:
            for i in xrange(self.b_order + 1):
                for j in xrange(self.b_order + 1):
                    coef = self.b.get((i, j), None)
                    if coef is not None:
                        l.append("B_%d_%d = %.10e" % (i, j, coef))
        
        if self.ap_order != 0:
            for i in xrange(self.ap_order + 1):
                for j in xrange(self.ap_order + 1):
                    coef = self.ap.get((i, j), None)
                    if coef is not None:
                        l.append("AP_%d_%d = %.10e" % (i, j, coef))

        if self.bp_order != 0:
            for i in xrange(self.bp_order + 1):
                for j in xrange(self.bp_order + 1):
                    coef = self.bp.get((i, j), None)
                    if coef is not None:
                        l.append("BP_%d_%d = %.10e" % (i, j, coef))

        l.append("A_ORDER = %d" % self.a_order)
        l.append("B_ORDER = %d" % self.b_order)
        l.append("AP_ORDER = %d" % self.ap_order)
        l.append("BP_ORDER = %d" % self.bp_order)

        return "%s\n%s" % (s, "\n".join(l))

    def _transformPoint(self, px, py):
        
        """
        Performs SIP transform on pixel coordinates.
        """
        
        # compute relative pixel coordinates
        u = px - self.crpix[0]
        v = py - self.crpix[1]
        
        dx = 0.0
        dy = 0.0
             
        for i, j in self.a:
            coef = self.a.get((i, j), 0.0)
            dx += coef * (u ** i) * (v ** j)

        for i, j in self.b:
            coef = self.b.get((i, j), 0.0)
            dy += coef * (u ** i) * (v ** j)
        
        return px + dx, py + dy

    def _reverseTransformPoint(self, px, py):
        
        """
        Reverse SIP transform to get original pixel coordinates.
        """

        # compute relative pixel coordinates
        u = px - self.crpix[0]
        v = py - self.crpix[1]

        dx = 0.0
        dy = 0.0
        
        for i, j in self.ap:
            coef = self.ap.get((i, j), 0.0)
            dx += coef * (u ** i) * (v ** j)

        for i, j in self.bp:
            coef = self.bp.get((i, j), 0.0)
            dy += coef * (u ** i) * (v ** j)

        return px + dx, py + dy

    def toRaDec(self, px, py):
        px, py = self._transformPoint(px, py)
        return WcsTanProjection.toRaDec(self, px, py)

    def toPixel(self, ra, dec, rnd=False):
        px, py = WcsTanProjection.toPixel(self, ra, dec, rnd)
        return self._reverseTransformPoint(px, py)

def WcsProjection(hdr, autoflip=True):

    """
    Factory function that returns the proper WCS projection subclass.  All
    classes returned by this function support the following interface:

    # any dictionary object
    wcs = wcslib.WcsProjection(hdr)
    
    # gives x, y given ra, dec, optionally rounding to nearest int
    x, y = wcs.project(ra, dec, rnd=False)
    
    # gives ra, dec given x, y
    ra, dec = wcs.invProject(x, y)
    
    The subclass returned is determined by the CTYPE1 keyword contained in
    the input header.
    
    If the autoflip flag is True (the default), the WCS will be flipped
    so that CTYPE1 contains ra and CTYPE2 contains dec.
    
    Input:  hdr      -- any dictionary-like object with FITS keywords as keys
                        and their values as its values
            autoflip -- whether to automatically flip the WCS if CTYPE1
                        contains ra

    Return:  The proper WCS projection subclass for the type of projection
             contained in the FITS header.
    """

    ctype = hdr.get("CTYPE1", "")
    if not ctype:
        raise ValueError("header doesn't contain CTYPE information")
    
    if "TAN" in ctype:
        if "SIP" in ctype:
            return WcsSipProjection(hdr, autoflip=autoflip)
        else:
            return WcsTanProjection(hdr, autoflip=autoflip)
    else:
        raise ValueError("unsuppported WCS projection '%s'" % ctype)

if __name__ == "__main__":
    import sys
    import os
    import pyfits
    
    if len(sys.argv) != 2:
        print "Usage: %s <fits file>" % os.path.basename(sys.argv[0])
        sys.exit(2)
    
    fitsfile = sys.argv[1]
    fitslib.fits_simple_verify(fitsfile)
    fits = pyfits.open(fitsfile)
    hdr = fits[0].header
    wcs = WcsProjection(hdr)

    # need to put some testing code here with a known FITS file
