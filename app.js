(function() {
  'use strict';
  
  var app = angular.module('GraticulesApp', []);
  
  app.controller('GraticuleCtrl', function($scope) {
    
    $scope.projections = {
      AZP: "Zenithal Perspective",
      SZP: "Slant Zenithal Perspective",
      TAN: "Gnomonic",
      STG: "Stereographic",
      SIN: "Generalized Orthographic",
      NCP: "North Celestial Pole",
      ARC: "Zenithal Equidistant",
      ZPN: "Zenithal Polynomial",
      ZEA: "Zenithal Equal Area",
      AIR: "Airy's",
      CYP: "Cylindrical Perspective",
      CEA: "Cylindrical Equal Area",
      CAR: "Plate Carrée",
      MER: "Mercator",
      SFL: "Sanson-Flamsteed",
      PAR: "Parabolic",
      MOL: "Mollweide",
      AIT: "Aitoff",
      COP: "Conic Perspective",
      COE: "Conic Equal Area",
      COD: "Conic Equidistant",
      COO: "Conic Orthomorphic",
      BON: "Bonne's",
      PCO: "Polyconic",
      TSC: "Tangential Spherical Cube",
      CSC: "COBE Quad-Cube",
      QSC: "Quadrilateral Spherical Cube",
      HPX: "HEALPix"
    };
    
    $scope.projection = 'TAN';
    $scope.name = $scope.projections[$scope.projection];
    $scope.nGraticulesX = 4;
    $scope.nGraticulesY = 4;
    
    $scope.onProjection = function(projection) {
      $scope.projection = projection;
      $scope.name = $scope.projections[projection];
    }
    
  });
  
  app.directive('graticule', function($http) {
    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var w, xTicks, yTicks, extent, ready = false;
        
        var margin = {top: 11, right: 20, bottom: 40, left: 50};
        var width = 384;
        var height = 384;
        
        var xRange = d3.scale.identity()
                      .domain([0, width]);
        var yRange = d3.scale.identity()
                      .domain([height, 0]);
        
        var x = d3.scale.ordinal()
            .range( xRange.ticks(scope.nGraticulesX) );
        var y = d3.scale.ordinal()
            .range( yRange.ticks(scope.nGraticulesY) );
            
        var xAxis = d3.svg.axis()
            .orient("bottom")
            .ticks(scope.nGraticulesX);
                
        var yAxis = d3.svg.axis()
            .orient("left")
            .ticks(scope.nGraticulesY);
        
        var svg = d3.select(element[0]).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var xAxisEl = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")");
        
        var yAxisEl = svg.append("g")
            .attr("class", "y axis");
        
        var imgEl = svg.append("image")
          .attr("xlink:href", "images/1904-66_" + scope.projection + ".png")
          .attr("x", "0")
          .attr("y", "0")
          .attr("width", width + "px")
          .attr("height", height + "px")
        
        var group = svg.append("g");
        group.append("clipPath")
            .attr("id", "clip")
          .append("rect")
            .attr("width", width)
            .attr("height", height);
        
        var gridGroup = group.append("g")
          .attr("clip-path", "url(#clip)")
          .attr("transform", "translate(0, 0)");
        
        scope.$watch('projection', function() {
          imgEl.attr("xlink:href", "images/1904-66_" + scope.projection + ".png")
          
          $http.get('headers/1904-66_' + scope.projection)
            .success(function(data, status, headers, config){
              w = new wcs();
              w.init(data);
              
              xTicks = x.range().map(function(d) {
                d = 0.5 * d + 1; // Convert to FITS reference frame
                return w.pix2sky(d, 1)[1].toFixed(3);
              });
              x.domain(xTicks);
              
              yTicks = y.range().map(function(d) {
                d = 192 - 0.5 * d; // Convert to FITS reference frame
                return w.pix2sky(1, d)[0].toFixed(3);
              });
              y.domain(yTicks);
              
              xAxis.scale(x);
              yAxis.scale(y);
              
              xAxisEl.call(xAxis)
                .selectAll("text")
                  .style("text-anchor", "end")
                  .attr("transform", function(d) {
                    return "rotate(-45)"
                  });
              yAxisEl.call(yAxis);
              
              makeGraticules();
              ready = true;
              
              element.find("image").on("mousemove", function(e) {
                var x = e.offsetX - margin.left;
                var y = e.offsetY - margin.top;
                
                // Convert to FITS reference frame
                x = 0.5 * x + 1;
                y = 192 - 0.5 * y;
                var sky = w.pix2sky(x, y);
                
                scope.$apply(function() {
                  scope.ra = sky[0].toFixed(6) + "°";
                  scope.dec = sky[1].toFixed(6) + "°";
                  scope.x = x;
                  scope.y = y;
                });
                
              });
              
            });
          
        });
        
        scope.$watch('nGraticulesX', function() {
          if (!ready)
            return;
          
          x.range( xRange.ticks(scope.nGraticulesX) );
          xTicks = x.range().map(function(d) {
            d = 0.5 * d + 1; // Convert to FITS reference frame
            return w.pix2sky(d, 1)[1].toFixed(3);
          });
          
          x.domain(xTicks);
          xAxis.scale(x);
          xAxisEl.call(xAxis)
            .selectAll("text")
              .style("text-anchor", "end")
              .attr("transform", function(d) {
                return "rotate(-45)"
              });
          
          makeGraticules();
        });
        scope.$watch('nGraticulesY', function() {
          if (!ready)
            return;
          
          y.range( yRange.ticks(scope.nGraticulesY) );
          yTicks = y.range().map(function(d) {
            d = 192 - 0.5 * d; // Convert to FITS reference frame
            return w.pix2sky(1, d)[0].toFixed(3);
          });
          
          y.domain(yTicks);
          yAxis.scale(y);
          yAxisEl.call(yAxis);
          
          makeGraticules();
        });
        
        var lineFn = d3.svg.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return 384 - d.y; })
            .interpolate("linear");
        
        function makeGraticules() {
          var range, spread;
          
          x.range( xRange.ticks(20) );
          range = x.range();
          spread = range[1] - range[0];
          range.push(range[range.length - 1] + spread);
          range.push(range[range.length - 1] + spread);
          xTicks = range.map(function(d) {
            d = 0.5 * d + 1; // Convert to FITS reference frame
            return w.pix2sky(d, 1)[1];
          });
          
          y.range( yRange.ticks(scope.nGraticulesY) );
          range = y.range();
          spread = range[1] - range[0];
          range.push(range[range.length - 1] + spread);
          range.push(range[range.length - 1] + spread);
          yTicks = range.map(function(d) {
            d = 192 - 0.5 * d; // Convert to FITS reference frame
            return w.pix2sky(1, d)[0];
          });
          
          svg.selectAll("path").remove()
          for (var j = 0; j < yTicks.length; j++) {
            var gridLine = [];
            
            for (var i = 0; i < xTicks.length; i++) {
              var imgcrd = w.sky2pix(yTicks[j], xTicks[i]);
              var point = {
                x: 2.0 * imgcrd[0],
                y: 2.0 * imgcrd[1]
              };
              gridLine.push(point);
            }
            
            gridGroup.append("path")
              .attr("d", lineFn(gridLine))
              .attr("stroke", "#7FFF00")
              .attr("stroke-width", 0.75)
              .attr("fill", "none");
          }
          
          x.range( xRange.ticks(scope.nGraticulesX) );
          range = x.range();
          spread = range[1] - range[0];
          range.push(range[range.length - 1] + spread);
          range.push(range[range.length - 1] + spread);
          xTicks = range.map(function(d) {
            d = 0.5 * d + 1; // Convert to FITS reference frame
            return w.pix2sky(d, 1)[1];
          });
          
          y.range( yRange.ticks(20) );
          range = y.range();
          spread = range[1] - range[0];
          range.push(range[range.length - 1] + spread);
          range.push(range[range.length - 1] + spread);
          yTicks = range.map(function(d) {
            d = 192 - 0.5 * d; // Convert to FITS reference frame
            return w.pix2sky(1, d)[0];
          });
          
          for (var i = 0; i < xTicks.length; i++) {
            var gridLine = [];
            for (var j = 0; j < yTicks.length; j++) {
              var imgcrd = w.sky2pix(yTicks[j], xTicks[i]);
              var point = {
                x: 2.0 * imgcrd[0],
                y: 2.0 * imgcrd[1]
              };
              gridLine.push(point);
            }
            gridGroup.append("path")
              .attr("d", lineFn(gridLine))
              .attr("stroke", "#7FFF00")
              .attr("stroke-width", 0.75)
              .attr("fill", "none");
          }
          
          x.range( xRange.ticks(scope.nGraticulesX) );
          y.range( yRange.ticks(scope.nGraticulesY) );
        }
        
      }
    }
  });
  
})()