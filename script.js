const fs = require("fs");
const data1 = require("./src/data/rentals1.json");
const data2 = require("./src/data/rentals2.json");
const data3 = require("./src/data/rentals3.json");
const data4 = require("./src/data/rentals4.json");

function mergeAndAverageRent() {
const array = data1.concat(data2, data3, data4);
  const set = new Set();  

for (let i = 0; i < array.length; i++) {
    const areaSqft = array[i].areaSqft;
    set.add(areaSqft);
  }

  const result = [...set].sort();

  console.log(result);
 }
 

 mergeAndAverageRent();
