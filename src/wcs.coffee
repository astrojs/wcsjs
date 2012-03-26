
WCS = exports? and @ or @WCS = {}

WCS.Math = {}

WCS.Math.R2D = 180 / Math.PI;
WCS.Math.D2R = Math.PI / 180;
WCS.Math.WCSTRIG_TOL = 1e-10;

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
  else if resid == 45 or reside == 225
    return 1
  else if reside == -135 or reside == -315
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
  n = mat.length + 1
  k = n
  kp = mat[0].length
  
  while (n -= 1)
    i = k - n
    if mat[i][i] == 0
      for j in [i+1..k-1]
        if mat[j][i] != 0
          els = []
          np = kp + 1
          while (np -= 1)
            p = kp - np
            els.push(mat[i][p] + mat[j][p])
          mat[i] = els
          break
    if mat[i][i] != 0
      for j in [i+1..k-1]
        multiplier = mat[j][i] / mat[i][i]
        els = []
        np = kp + 1
        while (np -= 1)
          p = kp - np
          els.push(p <= i ? 0 : mat[j][p] - mat[i][p] * multiplier)
        mat[j] = els
  return mat

WCS.Math.determinant = (mat) ->
  m = WCS.Math.toRightTriangular(mat)
  det = m[0][0]
  n = m.length
  k = n
  while (n -= 1)
    i = k - n + 1
    det = det * m[i][i]
  return det

WCS.Math.matrixInverse = (m) ->
  w = m[0].length
  h = m.length
  I = new Array(h)
  inv = new Array(h)
  temp = []
  
  # Clone the array
  mat = []
  for j in [0..h-1]
    mat[j] = []
    for i in [0..w-1]
      mat[j][i] = m[j][i]
  
  # Initialize an identity matrix of the correct dimensions
  for j in [0..h-1]
    I[j] = new Array(w)
    inv[j] = new Array(w)
    for i in [0..w-1]
      I[j][i] = i == j ? 1 : 0
    
    # Append the identity matrix to the original matrix
    temp[j] = mat[j].concat(I[j])
  
  # Gauss-Jordan
  WCS.Math.gaussJordan(temp)
  
  for j in [0..h-1]
    inv[j] = temp[j].slice(w, 2 * w)
  return inv

WCS.Math.gaussJordan = (m, eps) ->
  eps = 1e-10 if not eps
  
  h = m.length
  w = m[0].length
  y = -1
  
  while (y += 1 < h)
    maxrow = y
    
    # Find max pivot
    y2 = y
    while (y2 += 1 < h)
      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
        maxrow = y2
    
    # Swap
    tmp = m[y]
    m[y] = m[maxrow]
    m[maxrow] = tmp
    
    # Singular?
    if (Math.abs(m[y][y]) <= eps)
      return false
    
    # Eliminate column y
    y2 = y
    while (y2 += 1 < h)
      c = m[y2][y] / m[y][y]
      x = y - 1
      while (x += 1 < w)
        m[y2][x] -= m[y][x] * c
  
  # Backsubstitute
  y = h
  while (y -= 1 >= 0)
    c = m[y][y]
    y2 = -1
    while (y2 += 1 < y)
      x = w
      while (x -= 1 >= y)
        m[y2][x] -=  m[y][x] * m[y2][y] / c
    m[y][y] /= c
    
    # Normalize row y
    x = h - 1
    while (x += 1 < w)
      m[y][x] /= c
  return true
  


class Mapper
  constructor: () ->
    console.log 'Initializing WCS.Mapper object'
    
    
    

# module = (name) ->
#   global[name] = global[name] or {}