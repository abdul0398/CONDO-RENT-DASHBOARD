const fs = require("fs");
const data1 = require("./src/data/rentals1.json");
const data2 = require("./src/data/rentals2.json");
const data3 = require("./src/data/rentals3.json");
const data4 = require("./src/data/rentals4.json");

function modifyData(data) {
  const result = [...data1, ...data2, ...data3, ...data4];
  const set = new Set();  


  result.forEach((item) => {
    const month = `20${item.leaseDate.slice(2)}-${item.leaseDate.slice(0, 2)}`;
    set.add(item.areaSqft);

  })

console.log(set);
}

modifyData(data4);
