const fs = require('fs');

var mapping_table = require('./generate_mapping_table')
mapping_table.then((res) => {
  console.log(res);
  fs.writeFileSync("./mapping_table.json", JSON.stringify(res), {
    flag: "w+"
  });
})
