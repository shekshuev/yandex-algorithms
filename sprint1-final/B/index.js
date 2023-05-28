// https://contest.yandex.ru/contest/22450/run-report/87369601/
const readline = require("readline");
const fs = require("fs");

let currentLine = 0;
let initialPushedKeys = 0;

const inputRows = [];

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 0) {
            initialPushedKeys = parseInt(line, 10);
        } else {
            inputRows.push(line);
        }
        currentLine++;
    })
    .on("close", solve);

function stringArrayToMap(stringArray) {
    const map = new Map();
    for (const line of stringArray) {
        for (const letter of line) {
            if (map.get(letter)) {
                map.set(letter, map.get(letter) + 1);
            } else {
                map.set(letter, 1);
            }
        }
    }
    return map;
}

function countScore(inputRows, initialPushedKeys) {
    const keysMap = stringArrayToMap(inputRows);
    const maxPushedKeys = initialPushedKeys * 2;
    let points = 0;
    for (let i = 1; i <= 9; i++) {
        if (keysMap.get(`${i}`) <= maxPushedKeys) {
            points++;
        }
    }
    return points;
}

function solve() {
    const points = countScore(inputRows, initialPushedKeys);
    console.log(points);
}
