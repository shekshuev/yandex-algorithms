const readline = require("readline");
const fs = require("fs");

let prices = [],
    budget = 0;
currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 0) {
            budget = parseInt(line.split(/\s/)[1], 10);
        } else if (currentLine === 1) {
            prices = line.split(/\s/).map(s => parseInt(s, 10));
        }
        currentLine++;
    })
    .on("close", () => solve(budget, prices));

function solve(budget, prices) {
    prices.sort((a, b) => a - b);
    let count = 0;
    for (let i = 0; i < prices.length; i++) {
        budget -= prices[i];
        if (budget >= 0) {
            count++;
        } else {
            break;
        }
    }
    console.log(count);
}
