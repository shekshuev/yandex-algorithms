const readline = require("readline");
const fs = require("fs");

let currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 1) {
            solve(line.split(/\s/).map(s => parseInt(s, 10)));
        }
        currentLine++;
    });

function solve(segments) {
    segments.sort((a, b) => b - a);
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < segments.length - 2; i++) {
        if (segments[i] < segments[i + 1] + segments[i + 2] && segments[i] + segments[i + 1] + segments[i + 2] > max) {
            max = segments[i] + segments[i + 1] + segments[i + 2];
        }
    }
    console.log(max);
}
