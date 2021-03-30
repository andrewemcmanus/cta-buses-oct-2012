import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { csv } from 'd3';
// csv or fetch?
import * as d3 from 'd3';
import coords from './coordinates.csv'

// "GROUPDATA" is undefined in d3
// ***this problem is independent of the components***

// d3.csv is not pairing the coordinates correctly...

const Mapping = () => {
  const [rows, setRows] = useState([]);
  const [coordinates, setCoordinates] = useState();
  useEffect(() => {
    let coordinates = coords;
    d3.csv(coordinates, function(d) {
      console.log(d[3]);
      return d;
      // setCoordinates(coordinates);
      // console.log(coordinates);
      // const reader = coordinates.getReader();
      // const response = coordinates;
      // console.log(response);
      // const reader = response.body.getReader()
      // // console.log(reader);
      // const result = reader.read() // raw array
      // const decoder = new TextDecoder('utf-8')
      // const csv = decoder.decode(result.value) // the csv text
      // const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      // const rows = results.data // array of objects
      // console.log(rows);
      // setRows(rows)
    });

    // async function getData() {

    // }
    // getData()
  }, []) // [] means just do this once, after initial render

  return (
    <div className="app">

    </div>
  )
}

export default Mapping;
// class Mapping extends React.Component {
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             data: []
//         };
//
//         this.getData = this.getData.bind(this);
//     }
//
//     componentWillMount() {
//         this.getCsvData();
//     }
//
//     fetchCsv() {
//         return fetch('../coordinates.csv').then(function (response) {
//             let reader = response.body.getReader();
//             let decoder = new TextDecoder('utf-8');
//
//             return reader.read().then(function (result) {
//                 return decoder.decode(result.value);
//             });
//         });
//     }
//
//     getData(result) {
//         this.setState({data: result.data});
//     }
//
//     async getCsvData() {
//         let csvData = await this.fetchCsv();
//
//         Papa.parse(csvData, {
//             complete: this.getData
//         });
//     }
//
//     render() {
//         return (
//
//         );
//     }
// }
//
// export default withRouter(Mapping);
