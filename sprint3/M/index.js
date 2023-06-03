const readline = require("readline");
const fs = require("fs");

let firstArray = null,
    secondArray = null,
    currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 2) {
            firstArray = line.split(/\s/).map(s => parseInt(s, 10));
        } else if (currentLine === 3) {
            secondArray = line.split(/\s/).map(s => parseInt(s, 10));
        }
        currentLine++;
    })
    .on("close", () => solve(firstArray, secondArray));

function solve(firstArray, secondArray) {
    const array = firstArray.concat(secondArray).sort((a, b) => a - b);
    const n = array.length;
    if (n % 2 === 0) {
        console.log((array[n / 2 - 1] + array[n / 2]) / 2);
    } else {
        console.log(array[Math.floor(n / 2)]);
    }
}
