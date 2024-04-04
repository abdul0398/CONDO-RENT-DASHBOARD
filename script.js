const dataPath = "./src/data/rentals.json";
const fs = require('fs');

function start() {
  // Read the JSON file
  fs.readFile(dataPath, 'utf8', (err, jsonString) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }

    try {
      // Parse JSON data
      const data = JSON.parse(jsonString);

      // Calculate part size
      const length = data.length;
      const partSize = Math.floor(length / 4);

      // Divide the data into four parts and write each part into a separate file
      for (let i = 0; i < 4; i++) {
        const start = i * partSize;
        const end = (i === 3) ? length : (i + 1) * partSize; // Last part might be smaller
        const partData = data.slice(start, end);

        // Write partData to a separate file
        const fileName = `part_${i + 1}.json`;
        fs.writeFile(fileName, JSON.stringify(partData), (err) => {
          if (err) {
            console.log("Error writing file:", err);
            return;
          }
          console.log(`Part ${i + 1} written to ${fileName}`);
        });
      }
    } catch (err) {
      console.log("Error parsing JSON:", err);
    }
  });
}

start();
