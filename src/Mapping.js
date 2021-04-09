import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { csv } from 'd3';
// csv or fetch?
import * as d3 from 'd3';
import coords from './coordinates.csv'

// "GROUPDATA" is undefined in d3
// ***this problem is independent of the components***

// d3.csv is not pairing the coordinates correctly...
// Is papaparse necessary?

const Mapping = () => {
  const [rows, setRows] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [data, setData] = useState([]);
  // console.log(coords);
  useEffect(() => {
    let coordinates = coords;
    // console.log(coordinates);
    function fetchCsv() {
        return fetch(coordinates).then(function (response) {
          // console.log(response.body);
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');
            // console.log(reader);
            // console.log(decoder);
            return reader.read().then(function (result) {
                // console.log(result.value);
                return decoder.decode(result.value);
            });
        });
    };

    async function getCsvData() {
      let csvData = await fetchCsv();
      // console.log(csvData);
      setCoordinates(csvData);
      // console.log(coordinates);
      // Papa.parse(csvData, { complete: this.setData.bind(this)})
    };
    // getCsvData();
    // console.log(coordinates);
    // console.log(result);
    // d3.csv(coordinates, function(d) {
    //   console.log(d[3]);
    //   // return d;
    //   setCoordinates(coordinates);
    //   // console.log(coordinates);
    //   let reader = coordinates.getReader();
    //   let response = coordinates;
    //   // console.log(response);
    //   const reader = response.body.getReader()
    //   // console.log(reader);
    //   const result = reader.read() // raw array
    //   console.log(result);
    //   const decoder = new TextDecoder('utf-8')
    //   const csv = decoder.decode(result.value) // the csv text
    //   console.log(csv);
    //   const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
    //   const rows = results.data // array of objects
    //   console.log(rows);
    //   setRows(rows);
    //   return coordinates;
    // });

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
