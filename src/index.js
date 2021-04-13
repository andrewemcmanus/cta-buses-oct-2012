import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as d3 from 'd3';
// import Bubblemap from './Bubblemap.js';
// import Mapping from './Mapping.js'
import reportWebVitals from './reportWebVitals';
import rd3 from 'react-d3-library';
// import { geoMercator } from 'd3';
// import { csv } from 'd3-request';
import csvData from './stop_id-board-alight-location.csv'
// const rd3 = require('react-d3-library');
// import App from './App';

// const RD3Component = rd3.Component;
// import {withRouter} from 'react-router-dom';

const App = () => {
  const [ coordinates, setCoordinates ] = useState([]);
  const [boardings, setBoardings ] = useState([]);
  useEffect(() => {
    // let coordinates = csvData;
    d3.csv(csvData, function(csvData) {
      // console.log(csvData[0]);
      const locationObject = csvData[0].location;
      const boardObject = parseFloat(csvData[0].boardings);
      console.log(boardObject);
      let doubleObject = locationObject.replaceAll("'", '"')
      // let newObject = JSON.stringify(doubleObject);
      let location = JSON.parse(doubleObject);
      // console.log(location);
      const coordstrings = Object.values(location);
      let lat = parseFloat(coordstrings[0]);
      let long = parseFloat(coordstrings[1]);
      const coordinates = [lat, long];
      console.log(coordinates);
      // still strings...
      setBoardings(boardObject);
      setCoordinates(coordinates);
    })
  }, []);

  return (
    <div><h1>Test</h1></div>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
