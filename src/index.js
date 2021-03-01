import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as d3 from 'd3';
// import Bubblemap from './Bubblemap.js';
import reportWebVitals from './reportWebVitals';
import rd3 from 'react-d3-library';
// import { geoMercator } from 'd3';
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
      // const pairs = coordinates.values();
      setCoordinates(coordinates);
    })
  }, []);

  return (
    // <div><Bubblemap /></div>
    <p>coordinates</p>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
