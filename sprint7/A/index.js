const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine > 0) {
            solve(line.split(/\s/).map(s => parseInt(s, 10)));
        }
        currentLine++;
    });

function solve(prices) {
    let profit = 0;
    let current = 0;
    let hasStock = false;
    for (let i = 0; i < prices.length - 1; i++) {
        if (hasStock) {
            if (prices[i + 1] < prices[i]) {
                profit += prices[i] - current;
                hasStock = false;
            }
        } else {
            if (prices[i + 1] > prices[i]) {
                hasStock = true;
                current = prices[i];
            }
        }
    }
    if (hasStock) {
        profit += prices[prices.length - 1] - current;
    }
    console.log(profit);
}
