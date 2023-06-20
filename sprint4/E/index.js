const readline = require("readline");
const fs = require("fs");
const path = require("path");

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt")),
    })
    .on("line", line => solve(line));

function solve(string) {
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < string.length; i++) {
        let count = 1;
        const letters = new Set();
        letters.add(string[i]);
        for (let j = i + 1; j < string.length; j++) {
            if (!letters.has(string[j])) {
                letters.add(string[j]);
                count++;
            } else {
                break;
            }
        }
        max = count > max ? count : max;
    }
    console.log(max);
}
