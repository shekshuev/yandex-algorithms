const readline = require("readline");
const fs = require("fs");

let currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 0) {
            currentLine++;
        } else {
            solve(line);
        }
    });

function solve(line) {
    const result = line
        .trim()
        .split(/\s/)
        .reduce((acc, curr) => {
            return acc.length >= curr.length ? acc : curr;
        });
    console.log(`${result}\n${result.length}`);
}
