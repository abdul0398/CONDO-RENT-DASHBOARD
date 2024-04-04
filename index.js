const fs = require("fs").promises;
const data = require("./src/data/rentals.json");
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NGNjNzU1MDhhMzBkYTFjOWEyZWEyYzM1NzkwZTE3MSIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC0xMjIzNjk4OTkyLmFwLXNvdXRoZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tL2FwaS92Mi91c2VyL3Bhc3N3b3JkIiwiaWF0IjoxNzEyMDU2MjgwLCJleHAiOjE3MTIzMTU0ODAsIm5iZiI6MTcxMjA1NjI4MCwianRpIjoib2JYRExlaVZjVzJ6NFF3cSIsInVzZXJfaWQiOjk5NCwiZm9yZXZlciI6ZmFsc2V9.dLHF0Ywaf3LwmieO0UFXn367WlhKr825esHEOn3A_6o");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
};


async function start() {
  const array = data;
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    const rentalcollection = array[i];
    result += rentalcollection.rental.length;
    
    //   const x = rentalcollection.x;
    //   const y = rentalcollection.y;
    //   console.log(x, y);
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   const url = `https://www.onemap.gov.sg/api/common/convert/3414to4326?X=${x}&Y=${y}`;
    //   const res = await fetch(url, requestOptions);
    //   const data = await res.json();
    //   console.log(data);
    //   console.log(`########################## ${i} ##########################`);
    //   delete rentalcollection.x;
    //   delete rentalcollection.y;
    //   rentalcollection.latitude = data.latitude;
    //   rentalcollection.longitude = data.longitude;
    //   result.push(rentalcollection);
    
  }
  console.log(result);
//   await fs.writeFile("rentals.json", JSON.stringify(result, null, 2));
}

start();
