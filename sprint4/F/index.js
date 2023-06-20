const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt")),
    })
    .on("line", line => {
        if (currentLine === 1) {
            solve(line.split(/\s/));
        }
        currentLine++;
    });

function solve(arr) {
    const map = new Map();
    for (const [i, word] of arr.entries()) {
        const sorted = word.split("").sort().join("");
        if (!map.has(sorted)) {
            map.set(sorted, [i]);
        } else {
            map.get(sorted).push(i);
        }
    }
    for (const key of map.keys()) {
        console.log(map.get(key).join(" "));
    }
}
