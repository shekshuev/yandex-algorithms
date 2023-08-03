const readline = require("readline");
const fs = require("fs");
const path = require("path");

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => solve(line));

function solve(str) {
    console.log(str.split(/\s/).reverse().join(" "));
}
