const readline = require("readline");
const fs = require("fs");
const path = require("path");

let strings = [];

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => strings.push(line))
    .on("close", () => solve(strings));

function compare(first, second) {
    const cache = [[], []];
    for (let i = 0; i < first.length; i++) {
        if (first.charCodeAt(i) % 2 === 0) {
            cache[0].push(first[i]);
        }
    }
    for (let i = 0; i < second.length; i++) {
        if (second.charCodeAt(i) % 2 === 0) {
            cache[1].push(second[i]);
        }
    }
    return cache[0] < cache[1] ? -1 : cache[0] > cache[1] ? 1 : 0;
}

function solve([first, second]) {
    console.log(compare(first, second));
}
