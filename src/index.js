import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as d3 from 'd3';
import reportWebVitals from './reportWebVitals';
import rd3 from 'react-d3-library';
// import { csv } from 'd3-request';
import coords from './coordinates.csv'
// const rd3 = require('react-d3-library');
// import App from './App';

// const RD3Component = rd3.Component;
// import {withRouter} from 'react-router-dom';

const App = () => {
  const [ coordinates, setCoordinates ] = useState([]);
  useEffect(() => {
    let coordinates = coords;
    d3.csv(coordinates, function(coordinates) {
      // const coordinates = coords;
      setCoordinates(coordinates);
      console.log(coordinates);
    })
    // d3.csv('coordinates.csv').then(coordinates => {
      // console.log(coordinates);
    // })
    // async function getCoordinates() {
    //   const coordinates = await csv(coords);
    //   // console.log(coordinates);
    //   setCoordinates(coordinates);
    // };
    // getCoordinates();
  }, []);

// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var projection = d3.geoMercator()
    .center([0,20])                // GPS of location to zoom on
    .scale(99)                       // This is like the zoom
    .translate([ width/2, height/2 ])

d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")  // World shape
  .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_gpsLocSurfer.csv") // Position of circles
  .await(ready);

function ready(error, dataGeo, data) {

  // Create a color scale
  var allContinent = d3.map(data, function(d){return(d.homecontinent)}).keys()
  var color = d3.scaleOrdinal()
    .domain(allContinent)
    .range(d3.schemePaired);

  // Add a scale for bubble size
  var valueExtent = d3.extent(data, function(d) { return +d.n; })
  var size = d3.scaleSqrt()
    .domain(valueExtent)  // What's in the data
    .range([ 1, 50])  // Size in pixel

  // Draw the map
  svg.append("g")
      .selectAll("path")
      .data(dataGeo.features)
      .enter()
      .append("path")
        .attr("fill", "#b8b8b8")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
      .style("stroke", "none")
      .style("opacity", .3)

  // Add circles:
  svg
    .selectAll("myCircles")
    .data(data.sort(function(a,b) { return +b.n - +a.n }).filter(function(d,i){ return i<1000 }))
    .enter()
    .append("circle")
      .attr("cx", function(d){ return projection([+d.homelon, +d.homelat])[0] })
      .attr("cy", function(d){ return projection([+d.homelon, +d.homelat])[1] })
      .attr("r", function(d){ return size(+d.n) })
      .style("fill", function(d){ return color(d.homecontinent) })
      .attr("stroke", function(d){ if(d.n>2000){return "black"}else{return "none"}  })
      .attr("stroke-width", 1)
      .attr("fill-opacity", .4)



  // Add title and explanation
  svg
    .append("text")
      .attr("text-anchor", "end")
      .style("fill", "black")
      .attr("x", width - 10)
      .attr("y", height - 30)
      .attr("width", 90)
      .html("WHERE SURFERS LIVE")
      .style("font-size", 14)


  // --------------- //
  // ADD LEGEND //
  // --------------- //

  // Add legend: circles
  var valuesToShow = [100,4000,15000]
  var xCircle = 40
  var xLabel = 90
  svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("circle")
      .attr("cx", xCircle)
      .attr("cy", function(d){ return height - size(d) } )
      .attr("r", function(d){ return size(d) })
      .style("fill", "none")
      .attr("stroke", "black")

  // Add legend: segments
  svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("line")
      .attr('x1', function(d){ return xCircle + size(d) } )
      .attr('x2', xLabel)
      .attr('y1', function(d){ return height - size(d) } )
      .attr('y2', function(d){ return height - size(d) } )
      .attr('stroke', 'black')
      .style('stroke-dasharray', ('2,2'))

  // Add legend: labels
  svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("text")
      .attr('x', xLabel)
      .attr('y', function(d){ return height - size(d) } )
      .text( function(d){ return d } )
      .style("font-size", 10)
      .attr('alignment-baseline', 'middle')
}

  return (
    <p>coordinates</p>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
