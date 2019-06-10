const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

var obj = {};

var readStreamPromise = function(path) {
  return new Promise(function(resolve, reject) {
    fs.createReadStream(path)
    .pipe(csv())
    .on('data', (data) => {
      var key = data["AdWords API"] || data["AdWords API Report"];
      var val = data["Google Ads API"] || data["Google Ads API Resource"];
      obj[key] = val;

    })
    .on('end', () => {
      return resolve()
    });
  });
}

var mapping_csv = [
  './resources_mapping.csv',
  './ad_group_performance.csv',
  './video_performance.csv',
  './ad_performance.csv',
  './keywords_performance.csv',
  './ad_group_performance.csv',
  './campaign_performance.csv'
];

var promise_array = mapping_csv.map((val) => {
  var file_path = path.resolve(__dirname,val);
  return readStreamPromise(file_path);
});

function getMappingTable() {
  Promise.all(promise_array)
  .then(() => {
    return obj
  })
  .catch((err) => {
    return err
  })
}
module.exports = Promise.all(promise_array).then(() => {return obj});
