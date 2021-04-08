import React from 'react';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';

// "GROUPDATA" is undefined in d3.js
// ***this problem is independent of the components***

// import axios from 'axios';
// import queue from 'd3-queue';
// .style("fill", function(d){ return color(d.homecontinent) }) line 52
// .domain(allContinent) line 111
// const RD3Component = rd3.Component;
const RD3Component = rd3.Component;
// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var projection = d3.geo.mercator()
    .center([0,20])                // GPS of location to zoom on
    .scale(99)                       // Zoom in
    .translate([ width/2, height/2 ]);
// Test with different URLs?
// Is there an existing GeoJSON file of Chicago streets?
var dataGeo = d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
// console.log(dataGeo.response);
var data = d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_gpsLocSurfer.csv");
// console.log(data.response);
// d3.queue()

//   .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")  // World shape
//   .defer(d3.csv, ) // Position of circles
//   .await(ready);
// FORMAT FOR dataGeo AND data?

d3.select("svg")
    .append("g")
    .selectAll("path")
    .data(features)
    .enter()
    .append("path")
      .attr("fill", "#b8b8b8")
      .attr("d", d3.geoPath()
          .projection(projection)
      )
    .style("stroke", "none")
    .style("opacity", .3);

// Add circles:
d3.select("svg")
  .selectAll("myCircles")
  .data(data.sort(function(a,b) { return +b.n - +a.n }).filter(function(d,i){ return i<1000 }))
  .enter()
  .append("circle")
    .attr("cx", function(d){ return projection([+d.homelon, +d.homelat])[0] })
    .attr("cy", function(d){ return projection([+d.homelon, +d.homelat])[1] })
    .attr("r", function(d){ return size(+d.n) })
    .attr("stroke", function(d){ if(d.n>2000){return "black"}else{return "none"}  })
    .attr("stroke-width", 1)
    .attr("fill-opacity", .4);

d3.select("svg")
    .append("text")
    .attr("text-anchor", "end")
    .style("fill", "black")
    .attr("x", width - 10)
    .attr("y", height - 30)
    .attr("width", 90)
    .html("WHERE SURFERS LIVE")
    .style("font-size", 14);

var valuesToShow = [100,4000,15000];
var xCircle = 40;
var xLabel = 90;
d3.select("svg")
  .selectAll("legend")
  .data(valuesToShow)
  .enter()
  .append("circle")
    .attr("cx", xCircle)
    .attr("cy", function(d){ return height - size(d) } )
    .attr("r", function(d){ return size(d) })
    .style("fill", "none")
    .attr("stroke", "black");

d3.select("svg")
  .selectAll("legend")
  .data(valuesToShow)
  .enter()
  .append("line")
    .attr('x1', function(d){ return xCircle + size(d) } )
    .attr('x2', xLabel)
    .attr('y1', function(d){ return height - size(d) } )
    .attr('y2', function(d){ return height - size(d) } )
    .attr('stroke', 'black')
    .style('stroke-dasharray', ('2,2'));

d3.select("svg")
  .selectAll("legend")
  .data(valuesToShow)
  .enter()
  .append("text")
    .attr('x', xLabel)
    .attr('y', function(d){ return height - size(d) } )
    .text( function(d){ return d } )
    .style("font-size", 10)
    .attr('alignment-baseline', 'middle');

d3.map(dataGeo, function(d){return(d.homecontinent)}).keys();

d3.scale.ordinal().range(d3.schemePaired);

    // Add a scale for bubble size
var valueExtent = d3.extent(dataGeo, function(d) { return +d.n; });

var size = d3.scale.sqrt().domain(valueExtent).range([ 1, 50]);

    // Draw the map
var features = dataGeo.features;

export default function ready(error) {

  // Create a color scale

  // console.log(svg);
  // is this function rendering twice?
}
