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
    const [a, x, b, c] = line.split(/\s/).map(s => parseInt(s));
    console.log(a * x * x + b * x + c);
}
