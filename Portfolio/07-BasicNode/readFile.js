const fs = require("fs");

fs.readFile("./data/input.txt", "utf-8", (err, data) => {
    console.log(data);
});

console.log("End of program");