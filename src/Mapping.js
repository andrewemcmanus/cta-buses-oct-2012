import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as d3 from 'd3';

const Mapping = () => {
  const [rows, setRows] = useState([])
  useEffect(() => {
    async function getData() {
      const response = await fetch('./coordinates.csv')
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      const rows = results.data // array of objects
      // console.log(rows);
      setRows(rows)
    }
    getData()
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
