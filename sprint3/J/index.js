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
    let moved = true;
    let iterations = 0;
    while (moved) {
        moved = false;
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                const tmp = array[i - 1];
                array[i - 1] = array[i];
                array[i] = tmp;
                moved = true;
            }
        }
        if (moved) {
            console.log(array.join(" "));
        }
        iterations++;
    }
    if (iterations === 1) {
        console.log(array.join(" "));
    }
}
