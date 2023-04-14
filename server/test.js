const fs = require('fs');
const path = require('path')
const fastcsv = require('fast-csv');

//fs.createReadStream(path.resolve(__dirname, "./data", 'neuroTest.csv')).pipe(fastcsv.parse({headers:true})).on('data', row=>console.log(row))