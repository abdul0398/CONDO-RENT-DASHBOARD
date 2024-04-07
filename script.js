const fs = require("fs");
const data1 = require("./src/data/rentals1.json");
const data2 = require("./src/data/rentals2.json");
const data3 = require("./src/data/rentals3.json");
const data4 = require("./src/data/rentals4.json");

function mergeAndAverageRent(data) {
  console.log(data.length);
  const mergedData = [];
  const dataMap = new Map();
  let flag = 0;
  
 
  for (let index = 0; index < data.length; index++) {
    const item = data[index]
     // Create a key without the rent property
     const key = JSON.stringify({ ...item, rent: undefined });
 
     if (dataMap.has(key)) {
       // If the object already exists in the map, calculate the average rent
       const existingItem = dataMap.get(key);
       const averageRent = (existingItem.rent + item.rent) / 2;
       // Merge the objects, excluding the rent property
       const mergedItem = { ...existingItem, rent: averageRent };
       mergedData.push(mergedItem);
       dataMap.delete(key); // Remove the existing item from the map
     } else {
       // If the object does not exist in the map, add it
       dataMap.set(key, item);
     }
  };
 
  // Add any remaining items from the map to the mergedData array
  dataMap.forEach(item => mergedData.push(item));
  console.log(mergedData.length);
  fs.writeFileSync("src/data/Rental4.json", JSON.stringify(mergedData, null, 2));
 }
 

 mergeAndAverageRent(data4);
