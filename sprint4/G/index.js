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
            solve(line.split(/\s/).map(s => parseInt(s, 10)));
        }
        currentLine++;
    });

function solve(arr) {
    const map = new Map();
    map.set(0, [0]);
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        arr[i] === 0 ? counter++ : counter--;
        if (!map.get(counter)) {
            map.set(counter, [i + 1]);
        } else {
            map.get(counter).push(i + 1);
        }
    }
    let max = 0;
    for (const key of map.keys()) {
        const tmp = map.get(key)?.[map.get(key)?.length - 1] - map.get(key)?.[0];
        max = tmp > max ? tmp : max;
    }
    console.log(max);
}
