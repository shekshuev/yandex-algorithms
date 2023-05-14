const readline = require("readline");
const fs = require("fs");

let currentLine = 0;
const keys = new Map();
let k = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 0) {
            k = parseInt(line);
        } else {
            for (const key of line.split("")) {
                if (keys.get(key)) {
                    keys.set(key, keys.get(key) + 1);
                } else {
                    keys.set(key, 1);
                }
            }
        }
        currentLine++;
    })
    .on("close", solve);

function solve() {
    let points = 0;
    for (let digit of ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
        if (keys.get(digit) <= k * 2) {
            points++;
        }
    }
    console.log(points);
}
