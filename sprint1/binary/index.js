const readline = require("readline");
const fs = require("fs");

const numbers = [];

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        numbers.push(line);
    })
    .on("close", solve);

function solve() {
    numbers.sort((a, b) => b.length - a.length);
    numbers.push("");
    let remainder = 0;
    const diff = numbers[0].length - numbers[1].length;
    for (let i = numbers[0].length - 1; i >= 0; i--) {
        const tmp =
            parseInt(numbers[0][i]) +
            parseInt(numbers[1][i - diff] || 0) +
            remainder;
        remainder = (tmp >> 1) & 1;
        numbers[2] = (tmp & 1) + numbers[2];
    }
    if (remainder === 1) {
        numbers[2] = remainder + numbers[2];
    }
    console.log(numbers[2]);
}
