// https://contest.yandex.ru/contest/22450/run-report/87350726/
const readline = require("readline");
const fs = require("fs");

let currentLine = 0;
const keys = new Map();
let maxPushedKeys = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 0) {
            maxPushedKeys = parseInt(line, 10) * 2;
        } else {
            accumulateInputData(line);
        }
        currentLine++;
    })
    .on("close", solve);

function accumulateInputData(line) {
    for (const key of line.split("")) {
        if (keys.get(key)) {
            keys.set(key, keys.get(key) + 1);
        } else {
            keys.set(key, 1);
        }
    }
}

function countScore(keysMap, maxPushedKeys) {
    let points = 0;
    for (let digit of ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
        if (keysMap.get(digit) <= maxPushedKeys) {
            points++;
        }
    }
    return points;
}

function solve() {
    const points = countScore(keys, maxPushedKeys);
    console.log(points);
}
