
WCS = exports? and @ or @WCS = {}

WCS.Math = {}
WCS.Math.R2D = 180 / Math.PI
WCS.Math.D2R = Math.PI / 180
WCS.Math.WCSTRIG_TOL = 1e-10

WCS.Math.cosd = (angle) ->
  if angle % 90 == 0
    i = Math.abs(Math.floor(angle / 90 + 0.5)) % 4
    switch i
      when 0
        return 1
      when 1
        return 0
      when 2
        return -1
      when 3
        return 0
  return Math.cos(angle * WCS.Math.D2R)

WCS.Math.sind = (angle) ->
  if angle % 90 == 0
    i = Math.abs(Math.floor(angle / 90 - 0.5)) % 4
    switch i
      when 0
        return 1
      when 1
        return 0
      when 2
        return -1
      when 3
        return 0
  return Math.sin(angle * WCS.Math.D2R)

WCS.Math.sincosd = (angle) ->
  if angle % 90 == 0
    i = Math.abs(Math.floor(angle / 90 + 0.5)) % 4
    switch i
      when 0
        s = 0
        c = 1
      when 1
        s = (angle > 0) ? 1 : -1
        c = 0
      when 2
        s = 0
        c = -1
      when 3
        s = (angle > 0) ? -1 : 1
        c = 0
    return s * c
  s = Math.sin(angle * WCS.Math.D2R)
  c = Math.cos(angle * WCS.Math.D2R)
  return s * c

WCS.Math.tand = (angle) ->
  resid = angle & 360
  if resid == 0 or Math.abs(resid) == 180
    return 0
  else if resid == 45 or resid == 225
    return 1
  else if resid == -135 or resid == -315
    return -1
  return Math.tan(angle * WCS.Math.D2R)

WCS.Math.acosd = (v) ->
  if v >= 1
    if v - 1 < WCS.Math.WCSTRIG_TOL
      return 0
  else if v == 0
    return 90
  else if v <= -1
    if v + 1 > -WCS.Math.WCSTRIG_TOL
      return 180
  return Math.acos(v) * WCS.Math.R2D

WCS.Math.asind = (v) ->
  if v <= -1
    if v + 1 > -WCS.Math.WCSTRIG_TOL
      return -90
    else if v == 0
      return 0
    else if v >= 1
      if v - 1 < WCS.Math.WCSTRIG_TOL
        return 90
  return Math.asin(v) * WCS.Math.R2D

WCS.Math.atand = (v) ->
  if v == -1
    return -45
  else if v == 0
    return 0
  else if v == 1
    return 45
  return Math.atan(v) * WCS.Math.R2D

WCS.Math.atan2d = (y, x) ->
  if y == 0
    if x >= 0
      return 0
    else if x < 0
      return 180
  else if x == 0
    if y > 0
      return 90
    else if y < 0
      return -90
  return Math.atan2(y, x) * WCS.Math.R2D

WCS.Math.toRightTriangular = (mat) ->
  n = mat.length
  k = n
  kp = mat[0].length
  loop
    i = k - n
    if mat[i][i] is 0
      j = i + 1
      while j < k
        unless mat[j][i] is 0
          els = []
          np = kp
          loop
            p = kp - np
            els.push mat[i][p] + mat[j][p]
            break unless --np
          mat[i] = els
          break
        j += 1
    unless mat[i][i] is 0
      j = i + 1
      while j < k
        multiplier = mat[j][i] / mat[i][i]
        els = []
        np = kp
        loop
          p = kp - np
          els.push (if p <= i then 0 else mat[j][p] - mat[i][p] * multiplier)
          break unless --np
        mat[j] = els
        j += 1
    break unless --n
  return mat

WCS.Math.determinant = (mat) ->
  m = WCS.Math.toRightTriangular(mat)
  det = m[0][0]
  n = m.length - 1
  k = n
  loop
    i = k - n + 1
    det = det * m[i][i]
    break unless --n
  return det

WCS.Math.matrixInverse = (m) ->
  w = m[0].length
  h = m.length
  I = new Array(h)
  inv = new Array(h)
  temp = []
  mat = []
  j = 0
  while j < h
    mat[j] = []
    i = 0
    while i < w
      mat[j][i] = m[j][i]
      i += 1
    j += 1
  j = 0
  while j < h
    I[j] = new Array(w)
    inv[j] = new Array(w)
    i = 0
    while i < w
      I[j][i] = (if i is j then 1 else 0)
      i += 1
    temp[j] = mat[j].concat(I[j])
    j += 1
  WCS.Math.gaussJordan temp
  j = 0
  while j < h
    inv[j] = temp[j].slice(w, 2 * w)
    j += 1
  return inv

WCS.Math.gaussJordan = `function (m, eps) {
  if (!eps) eps = 1e-10;
  var h, w, y, y2, x, maxrow, tmp, c;
  h = m.length;
  w = m[0].length;
  y = -1;

  while (++y < h) {
    maxrow = y;

    // Find max pivot.
    y2 = y;
    while (++y2 < h) {
      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
        maxrow = y2;
    }

    // Swap.
    tmp = m[y];
    m[y] = m[maxrow];
    m[maxrow] = tmp;

    // Singular?
    if (Math.abs(m[y][y]) <= eps)
      return false;

    // Eliminate column y.
    y2 = y;
    while (++y2 < h) {
      c = m[y2][y] / m[y][y];
      x = y - 1;
      while (++x < w) {
        m[y2][x] -= m[y][x] * c;
      }
    }
  }

  // Backsubstitute.
  y = h;
  while (--y >= 0) {
    c = m[y][y];
    y2 = -1;
    while (++y2 < y) {
      x = w;
      while (--x >= y) {
        m[y2][x] -=  m[y][x] * m[y2][y] / c;
      }
    }
    m[y][y] /= c;
    // Normalize row y.
    x = h - 1;
    while (++x < w) {
      m[y][x] /= c;
    }
  }
  return true;
};`

class WCS.Mapper
  constructor: (header) ->

    # Instance attributes
    @wcsobj = {}
    @projection = null
    @longitudeAxis = null
    @latitudeAxis = null

    @verifyHeader(header)
    @setProjection(header)

  verifyHeader: (header) =>
    @wcsobj.naxis = naxis = header['NAXIS'] or header['WCSAXES'] or 2
    @wcsobj.radesys = header['RADESYS'] or 'ICRS'

    requiredCards = ['CRPIX', 'CRVAL', 'CTYPE']
    @wcsobj.crpix = []
    @wcsobj.crval = []
    @wcsobj.ctype = []
    
    # Check that required values exist in JSON object
    for axis in [1..naxis]
      for j in [0..requiredCards.length-1]
        key = requiredCards[j] + axis
        if not header.hasOwnProperty(key)
          throw new Error("Not enough information to compute WCS, missing required keyword " + key)
        else
          arrayName = requiredCards[j].toLowerCase()
          @wcsobj[arrayName].push(header[key])

    # Check for CUNIT and CDELT, defaulting to degrees and unity, respectively
    # TODO: When CUNIT is not degrees, relevant values need to be converted
    @wcsobj.cunit = []
    @wcsobj.cdelt = []
    for axis in [1..naxis]
      key = 'CUNIT' + axis
      @wcsobj.cunit.push(header[key] or 'deg')
      key = 'CDELT' + axis
      @wcsobj.cdelt.push(header[key] or 1)

    # LONPOLE and LATPOLE default to values appropriate for a zenithal projection
    @wcsobj.lonpole = header['LONPOLE'] or 0
    @wcsobj.latpole = header['LATPOLE'] or 0

    # EQUINOX defaults to 2000 if not given
    @wcsobj.equinox = header['EQUINOX'] or 2000

    # DATE_OBS defaults to today
    date = new Date()
    @wcsobj.date_obs = header['DATE_OBS'] or (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())

    # Attempt to derive the PC matrix when not given, otherwise default to identity
    @wcsobj.pc = @checkCard(header, 'PC', naxis) or @derivePC(header)
    @wcsobj.pcInv = WCS.Math.matrixInverse(@wcsobj.pc)

    # Store the CD matrix if given
    @wcsobj.cd = @checkCard(header, 'CD', naxis)
    if @wcsobj.cd?
      @wcsobj.cd_inv = WCS.Math.matrixInverse(@wcsobj.cd)

  ###
  Check that a given array-valued key is contained in the header.
  e.g. For NAXIS = 2 and the PC matrix, the header should contain:
  PC1_1, PC1_2, PC2_1, PC2_2
  ###
  checkCard: (header, key, dimensions) =>
    obj = []
    for i in [1..dimensions]
      obj[i-1] = []
      for j in [1..dimensions]
        fullKey = key + i + '_' + j
        if not header.hasOwnProperty(fullKey)
          return
        else
        obj[i-1].push(header[fullKey])
    return obj

  ###
  Derive the PC matrix using CROTAi or using the CD matrix

  TODO: Test this function!
  ###
  derivePC: (header) =>
    if header.hasOwnProperty('CROTA2')
      crota = header['CROTA2']
      lambda = @wcsobj.cdelt[1] / @wcsobj.cdelt[0]
    else
      cd = @checkCard(header, 'CD', @wcsobj.naxis)
      if !cd?
        crota = 0
        lambda = 1
      else
        # TODO: Generalize for larger matrices
        cdDet = WCS.Math.determinant(cd)
        cdSign = cdDet < 0 ? -1 : 1
        @wcsobj.cdelt[0] = Math.sqrt(Math.abs(cdDet)) * cdSign
        @wcsobj.cdelt[1] = Math.sqrt(Math.abs(cdDet))
        crota = WCS.Math.atan2d(-1 * cd[0][1], cd[1][1])
        lambda = @wcsobj.cdelt[1] / @wcsobj.cdelt[0]
    pc = [[WCS.Math.cosd(crota), -lambda * WCS.Math.sind(crota)], [WCS.Math.sind(crota) / lambda, WCS.Math.cosd(crota)]]
    return pc

  setProjection: (header) =>
    zenithal = ['AIR', 'ARC', 'AZP', 'NCP', 'SIN', 'STG', 'SZP', 'TAN', 'TAN-SIP', 'ZEA', 'ZPN']
    cylindrical = ['CYP', 'CEA', 'CAR', 'MER', 'SFL', 'PAR', 'MOL', 'AIT']
    conic = ['COP', 'COE', 'COD', 'COO']
    polyConic = ['BON', 'PCO']
    quadCube = ['TSC', 'CSC', 'QSC']

    # Determine the longitude and latitude axis
    @projection = @wcsobj.ctype[0][5..]
    @longitudeAxis  = if @wcsobj.ctype[0].match("RA|GLON|ELON|HLON|SLON") then 0 else 1
    @latitudeAxis   = if @wcsobj.ctype[1].match("DEC|GLAT|ELAT|HLAT|SLAT") then 1 else 0

    # TODO: Incorporate @longitudeAxis and @latitudeAxis into this code
    if @projection in zenithal
      @wcsobj.phi0    = 0
      @wcsobj.theta0  = 90
      @wcsobj.alphaP  = @wcsobj.crval[0]
      @wcsobj.deltaP  = @wcsobj.crval[1]
      @wcsobj.lonpole = if @wcsobj.crval[1] >= @wcsobj.theta0 then 0 else 180

      if @projection is 'AIR'
        @wcsobj.thetaB = if header.hasOwnProperty('PV2_1') then parseFloat(header['PV2_1']) else 90
        @wcsobj.etaB = (90 - @wcsobj.thetaB) / 2

        toSpherical: (x, y) =>
          throw 'Sorry, not yet implemented!'
        fromSpherical: (phi, theta) =>
          throw 'Sorry, not yet implemented!'

      else if @projection is 'ARC'

        toSpherical: (x, y) =>
          r     = Math.sqrt(x * x + y * y)
          theta = @wcsobj.theta0 - r
          phi   = WCS.Math.atan2d(x, -y)
          
          return [phi, theta]
          
        fromSpherical: (phi, theta) =>
          r = 90 - theta
          x = r * WCS.Math.sind(phi)
          y = -r * WCS.Math.cosd(phi)

          return [x, y]

      else if @projection is 'AZP'

        toSpherical: (x, y) =>
          throw 'Sorry, not yet implemented!'
        fromSpherical: (phi, theta) =>
          throw 'Sorry, not yet implemented!'

      else if @projection is 'NCP'

        toSpherical: (x, y) =>
          throw 'Sorry, not yet implemented!'
        fromSpherical: (phi, theta) =>
          throw 'Sorry, not yet implemented!'

      else if @projection is 'SIN'

        toSpherical: (x, y) =>
          r     = Math.sqrt(x * x + y * y)
          theta = WCS.Math.acosd(Math.PI * r / 180)
          phi   = WCS.Math.atan2d(x, -y)

          return [phi, theta]

        fromSpherical: (phi, theta) =>
          r = 180 / Math.PI * WCS.Math.cosd(theta)
          x = r * WCS.Math.sind(phi)
          y = -r * WCS.Math.cosd(phi)

          return [x, y]

      else if @projection is 'STG'

        toSpherical: (x, y) =>
          r     = Math.sqrt(x * x + y * y)
          theta = @wcsobj.theta0 - 2 * WCS.Math.atand(Math.PI * r / 360)
          phi   = WCS.Math.atan2d(x, -y)

          return [phi, theta]

        fromSpherical: (phi, theta) =>
          r = 360 / Math.PI * WCS.Math.tand((90 - theta) / 2)
          x = r * WCS.Math.sind(phi)
          y = -r * WCS.Math.cosd(phi)

          return [x, y]

      else if @projection is 'SZP'

        toSpherical: (x, y) =>
          throw 'Sorry, not yet implemented!'
        fromSpherical: (phi, theta) =>
          throw 'Sorry, not yet implemented!'

      else if @projection is 'TAN'

        toSpherical: (x, y) =>
          r     = Math.sqrt(x * x + y * y)
          theta = WCS.Math.atand(180 / (Math.PI * r))
          phi   = WCS.Math.atan2d(x, -y)

          return [phi, theta]

        fromSpherical: (phi, theta) =>
          r = 180 / (Math.PI * WCS.Math.tand(theta))
          x = r * WCS.Math.sind(phi)
          y = -r * WCS.Math.cosd(phi)

          return [x, y]

      else if @projection is 'TAN-SIP'

        toSpherical: (x, y) =>
          throw 'Sorry, not yet implemented!'
        fromSpherical: (phi, theta) =>
          throw 'Sorry, not yet implemented!'

      else if @projection is 'ZEA'
        toSpherical: (x, y) =>
          r     = Math.sqrt(x * x + y * y)
          theta = @wcsobj.theta0 - 2 * WCS.Math.asind(Math.PI * r / 360)
          phi   = WCS.Math.atan2d(x, -y)

          return [phi, theta]

        fromSpherical: (phi, theta) =>
          r = 360 / Math.PI * WCS.Math.sind((90 - theta) / 2)
          x = r * WCS.Math.sind(phi)
          y = -r * WCS.Math.cosd(phi)

          return [x, y]

      else if @projection is 'ZPN'

        toSpherical: (x, y) =>
          throw 'Sorry, not yet implemented!'
        fromSpherical: (phi, theta) =>
          throw 'Sorry, not yet implemented!'

    if @projection in cylindrical
      @wcsobj.phi0    = 0
      @wcsobj.theta0  = 90
      throw 'Sorry, not yet implemented!'

    if @projection in conic
      @wcsobj.phi0    = 0
      @wcsobj.theta0  = if header.hasOwnProperty('PV2_1') then header['PV2_1'] else 0

      throw 'Sorry, not yet implemented!'

    if @projection in polyConic
      @wcsobj.phi0    = 0
      @wcsobj.theta0  = 0
      throw 'Sorry, not yet implemented!'

    if @projection in quadCube
      @wcsobj.phi0    = 0
      @wcsobj.theta0  = 0
      throw 'Sorry, not yet implemented!'

  toIntermediate: (points) =>
    proj = [];
    for i in [0..@wcsobj.naxis-1]
      proj[i] = 0
      points[i] -= @wcsobj.crpix[i]
      for j in [0..@wcsobj.naxis-1]
        proj[i] += @wcsobj.cdelt[i] * @wcsobj.pc[i][j] * points[j]
    return proj

  fromIntermediate: (proj) =>
    points = []
    for i in [0..@wcsobj.naxis-1]
      points[i] = 0
      for j in [0..@wcsobj.naxis-1]
        points[i] += @wcsobj.pcInv[i][j] * proj[j] / @wcsobj.cdelt[i]
      points[i] += @wcsobj.crpix[i]
    return points

  toCelestial: (phi, theta) =>
    sinTheta = WCS.Math.sind(theta)
    cosTheta = WCS.Math.cosd(theta)
    sinDphi = WCS.Math.sind(phi - @wcsobj.lonpole)
    cosDphi = WCS.Math.cosd(phi - @wcsobj.lonpole)
    sinDecP = WCS.Math.sind(@wcsobj.delta_p)
    cosDecP = WCS.Math.cosd(@wcsobj.delta_p)

    xTemp = sinTheta * cosDecP - cosTheta * sinDecP * cosDphi
    yTemp = -cos_theta * sin_dphi
    zTemp = sinTheta * sinDecP + cosTheta * cosDecP * cosDphi

    ra = WCS.Math.atan2d(yTemp, xTemp) + @wcsobj.alphaP
    ra = (ra + 360) % 360
    dec = WCS.Math.asind(zTemp)

    return [ra, dec]

  fromCelestial: (ra, dec) =>
    sinDelta = WCS.Math.sind(dec)
    cosDelta = WCS.Math.cosd(dec)
    sinDp = WCS.Math.sind(@wcsobj.deltaP)
    cosDp = WCS.Math.cosd(@wcsobj.deltaP)
    sinDalpha = WCS.Math.sind(ra - @wcsobj.alphaP)
    cosDalpha = WCS.Math.cosd(ra - @wcsobj.alphaP)

    xTemp = sinDelta * cosDp - cosDelta * sinDp * cosDalpha
    yTemp = -cosDelta * sinDalpha

    phi = @wcsobj.lonpole + WCS.Math.atan2d(yTemp, xTemp)
    theta = WCS.Math.asind(sinDelta * sinDp + cosDelta * cosDp * cosDalpha)

    return [phi, theta];

  pixelToCoordinate: () =>
    coords = @toIntermediate(arguments[0], arguments[1])
    coords = @toSpherical(coords[0], coords[1])
    coords = @toCelestial(coords[0], coords[1])
    return {ra: coords[0], dec: coords[1]}

  coordinateToPixel: () =>
    coords = @fromCelestial(arguments[0], arguments[1])
    coords = @fromSpherical(coords[0], coords[1])
    coords = @fromIntermediate(coords)
    return {x: coords[0], y: coords[1]}
