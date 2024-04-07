const fs = require("fs");
const data1 = require("./src/data/rentals1.json");
const data2 = require("./src/data/rentals2.json");
const data3 = require("./src/data/rentals3.json");
const data4 = require("./src/data/rentals4.json");

function mergeAndAverageRent() {
  const array = data1.concat(data2, data3, data4);
  const graphCalculation = {};
  
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    


    const month = `20${element.leaseDate.slice(2)}-${element.leaseDate.slice(0, 2)}`;
    

    if(!graphCalculation[month]){
      graphCalculation[month] = {
        rents:[],
        rentsqft:[]
      };
    }



    const area = element.areaSqft;
    
    const arrayAreas = area.split("-");
    const areaSqft = (parseInt(arrayAreas[0]) + parseInt(arrayAreas[1])) / 2;
    const rent = element.rent;



    graphCalculation[month].rents.push(element.rent);
    graphCalculation[month].rentsqft.push(element.rent / areaSqft);
  
    
  }
    for (let month in graphCalculation) {
      graphCalculation[month].averageRent = Math.round(
        graphCalculation[month].rents.reduce((a, b) => a + b, 0) /
        graphCalculation[month].rents.length);
      graphCalculation[month].averageRentSqft = Math.round(
        graphCalculation[month].rentsqft.reduce(
          (a, b) => {
          if(isNaN(a)){
            return b;
          }
          if(isNaN(b)){
            return a;
          }
          return a + b;
            
            
          
          },
          0
        ) / graphCalculation[month].rentsqft.length * 100)/100;
        delete graphCalculation[month].rents;
        delete graphCalculation[month].rentsqft;
    }
console.log(graphCalculation);
    // create a new ts file with the merged data
    fs.writeFileSync("./src/data/rentals.ts", `export const rentals = ${JSON.stringify(graphCalculation)}`);


}

mergeAndAverageRent();
