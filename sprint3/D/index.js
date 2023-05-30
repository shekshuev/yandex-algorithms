const readline = require("readline");
const fs = require("fs");

let currentLine = 0,
    cookies = null,
    greedFactors = null;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 1) {
            greedFactors = line.split(/\s/).map(s => parseInt(s, 10));
        } else if (currentLine === 3) {
            cookies = line.split(/\s/).map(s => parseInt(s, 10));
        }
        currentLine++;
    })
    .on("close", () => solve(cookies, greedFactors));

function solve(cookies, greedFactors) {
    cookies.sort((a, b) => a - b);
    greedFactors.sort((a, b) => a - b);
    let j = 0;
    for (let i = 0; i < cookies.length; i++) {
        if (greedFactors[j] <= cookies[i]) {
            j++;
        }
        if (j === greedFactors.length) {
            break;
        }
    }
    console.log(j);
}
