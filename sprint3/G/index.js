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

function solve(array) {
    const counts = [0, 0, 0];
    for (let i = 0; i < array.length; i++) {
        counts[array[i]]++;
    }
    const result = new Array(array.length).fill(null);
    let index = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < counts[i]; j++) {
            result[index] = i;
            index++;
        }
    }
    console.log(result.join(" "));
}
