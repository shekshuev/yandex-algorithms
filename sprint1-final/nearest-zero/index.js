const readline = require("readline");
const fs = require("fs");

let numbers = null,
    currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 1) {
            numbers = line.split(/\s/).map(s => parseInt(s));
        }
        currentLine++;
    })
    .on("close", solve);

function solve() {
    const max = numbers.length;
    const distance = new Array(numbers.length).fill(max);
    for (let i = 0, j = numbers.length - 1; i < numbers.length, j >= 0; i++, j--) {
        if (numbers[i] === 0) {
            distance[i] = 0;
        } else {
            distance[i] = Math.min(distance[i], i - 1 < 0 ? max : distance[i - 1] + 1);
        }
        if (numbers[j] === 0) {
            distance[j] = 0;
        } else {
            distance[j] = Math.min(distance[j], j + 1 === max ? max : distance[j + 1] + 1);
        }
    }
    console.log(distance.join(" "));
}
