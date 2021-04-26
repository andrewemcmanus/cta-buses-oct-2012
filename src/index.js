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
        const coordstrings = Object.values(location);
        let lat = parseFloat(coordstrings[0]);
        let long = parseFloat(coordstrings[1]);
        coordinates.push([lat, long]);
        i++;
      }
      // console.log(boardings);
      setBoardings(boardings);
      setCoordinates(coordinates);
    })
  }, []);
  // BOARDINGS: scale to radius of circle
  // COORDINATES: scale to area of page
  let a = Math.floor(Math.random() * csvData.length);
  // let projection = d3.projection(coordinates[a])
  const RD3Component = rd3.Component;
  // The svg
  // var svg = d3.select("svg"),
      // width = +svg.attr(boardings),
      // height = +svg.attr(boardings);
  // console.log(width);
  // const projection = d3.geo.projection(coordinates[a]);
  // Map and projection
    var width = boardings[a];
    var height = boardings[a];
    var projection = d3.geo.mercator().center(coordinates).scale(680).translate([width / 2, height / 2]);
    var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
    var path = d3.geo.path().projection(projection);
;
      // .center(coordinates)                // GPS of location to zoom on
      // .scale(99);                       // Zoom in
      // .translate([ boardings[a], boardings[a] ]);
  console.log(path);

  return (
    <div>
      <p>Location is: { coordinates[a] }</p>
      <p>Boardings are: { boardings[a] }</p>
    </div>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
