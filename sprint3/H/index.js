const readline = require("readline");
const fs = require("fs");

let currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 1) {
            solve(line);
        }
        currentLine++;
    });

function solve(line) {
    const result = line
        .split(/\s/)
        .sort((a, b) => parseInt(b + a, 10) - parseInt(a + b, 10))
        .reduce((acc, curr) => acc + curr, "");
    console.log(result);
}
