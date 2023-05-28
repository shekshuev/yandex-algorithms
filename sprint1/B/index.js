const readline = require("readline");
const fs = require("fs");

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        solve(line);
    });

function solve(line) {
    const [a, b, c] = line.split(/\s/).map(s => Math.abs(parseInt(s)));
    const sum = (a % 2) + (b % 2) + (c % 2);
    console.log([0, 3].includes(sum) ? "WIN" : "FAIL");
}
