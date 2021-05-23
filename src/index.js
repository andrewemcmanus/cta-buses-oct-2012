import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as d3 from 'd3';
// import { geoProjection } from 'd3-geo-projection';
// import { projection } from 'd3-geo';
// import Bubblemap from './Bubblemap.js';
// import Mapping from './Mapping.js'
import reportWebVitals from './reportWebVitals';
import rd3 from 'react-d3-library';
// import { geoMercator } from 'd3';
// import { csv } from 'd3-request';
import csvData from './stop_id-board-alight-location.csv'
// const rd3 = require('react-d3-library');
// import App from './App';
import streets from './streets.topojson'
// const RD3Component = rd3.Component;
// import {withRouter} from 'react-router-dom';

const App = () => {
  const [ coordinates, setCoordinates ] = useState([]);
  const [ boardings, setBoardings ] = useState([]);
  let a = Math.floor(Math.random() * csvData.length);
  useEffect(() => {
    // let coordinates = csvData;
    d3.csv(csvData, function(csvData) {
      // console.log(csvData[0]);
      const coordinates = [];
      const boardings = [];
      let i = 0;
      // console.log(length);
      while (i < csvData.length) {
        // console.log(csvData[i].boardings);
        let boardObject = csvData[i].boardings;
        let boardFloat = parseFloat(boardObject);
        boardings.push(boardFloat);
        // console.log(boardObject);

        let locationObject = csvData[i].location;
        let doubleObject = locationObject.replaceAll("'", '"')
        let location = JSON.parse(doubleObject);
        // console.log(location[i]);
        // location.latitude = +location.latitude;
        // location.longitude = +location.longitude;
        const coordstrings = Object.values(location);
        let lat = parseFloat(coordstrings[0]);
        let long = parseFloat(coordstrings[1]);
        coordinates.push([long, lat]);
        // d3 requires long-lat format
        i++;
      }
      setBoardings(boardings);
      setCoordinates(coordinates);
    });
  }, []);
  // BOARDINGS: scale to radius of circle
  // COORDINATES: scale to area of page
  // would +coordinates.long, +coordinates.lat work instead of the simple array?

      // console.log(coordinates);

      // calling projection() returns undefined 'point' at line 4323 in d3.js
      // check svg attributes: length vs. width, returning NaN?


      const projection = d3.geo.mercator().center(coordinates).scale(99).translate([300, 300])
      const body = d3.select("body").append("svg").attr("width", 300).attr("height", 300);
      const path = d3.geo.path().projection(projection);
      const valueExtent = d3.extent(boardings, function(d) { return +d.n; })
      // console.log(projection());
      const size = d3.scale.sqrt()
        .domain(valueExtent)  // What's in the data
        .range([ 1, 50]);  // Size in pixel
      // console.log(size());
      // console.log(valueExtent);
        // console.log(path);
        const svg = d3.select("svg")
            .append("g")
            .selectAll("path")
            .data(coordinates)
            .enter()
            .append("path")
              .attr("fill", "#b8b8b8")
              .attr("d", path())
            .style("stroke", "none")
            .style("opacity", .3);
        // console.log(svg[0].parentNode.children);
        // const [x, y] = projection;
        // console.log(x);
        // .selectAll: shows what the DOM connection is! Is myCircles correct?
        // const circles = d3.select("svg")
        //   .selectAll("circle")
        //   .data(coordinates)
        //   .enter()
        //   .append("circle")
        //     .attr("cx", projection()[0] )
        //     .attr("cy", projection()[1] )
        //     .attr("r", function(d){ return size(boardings) })
        //     .attr("stroke", function(d){ if(d.n>2000){return "black"}else{return "none"}  })
        //     .attr("stroke-width", 1)
        //     .attr("fill-opacity", .4);
        // // console.log(circles);

  // let projection = d3.projection(coordinates[a])
  const RD3Component = rd3.Component;
  // The svg
  // var svg = d3.select("svg"),
      // width = +svg.attr(boardings),
      // height = +svg.attr(boardings);
  // console.log(width);
  // const projection = d3.geo.projection(coordinates[a]);
  // Map and projection

// CHECK d3.extent, d3.select (for "svg")


  // COORDINATES: returning NaN when passed through here



    console.log(coordinates[a]);
      // .center(coordinates)                // GPS of location to zoom on
      // .scale(99);                       // Zoom in
      // .translate([ boardings[a], boardings[a] ]);
      // coordinates.map(() => {
      //     return <circle cx={coordinates[0]} cy={coordinates[1]} r={1.5}/>
      //   })
      // WHAT IS THE VARIABLE THAT GOES INTO THE ATTRIBUTE FUNCTIONS?

    const circles = d3.select("svg").selectAll("myCircles").data(coordinates.sort(function(a,b) { return +b.n - +a.n }).filter(function(d,i){ return i<1000 }))
        .enter()
        .append("circle")
          .attr("cx", function(d){ return projection(coordinates)[0] })
          .attr("cy", function(d){ return projection(coordinates)[1] })
          .attr("r", function(d){ return size(boardings) })
          .attr("stroke", function(d){ if(d.n>2000){return "black"}else{return "none"}  })
          .attr("stroke-width", 1)
          .attr("fill-opacity", .4);

  return (
    <div>
      {coordinates.map(() => {
          return <svg>
            <circles cx={1} cy={1} r={30}/>
          </svg>
        }) }
    </div>
  )
}
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
