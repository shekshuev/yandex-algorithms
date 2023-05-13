const readline = require("readline");
const fs = require("fs");

let currentLine = 0;

const matrix = [];

let n = 0,
    x = 0,
    y = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 0) {
            n = parseInt(line);
        } else if (currentLine === n + 2) {
            x = parseInt(line);
        } else if (currentLine === n + 3) {
            y = parseInt(line);
        } else if (currentLine > 1 && currentLine < n + 2) {
            matrix.push(parseLine(line));
        }
        currentLine++;
    })
    .on("close", solve);

function parseLine(line) {
    return line.split(/\s/);
}

function solve() {
    const elements = [];
    for (const [i, j] of [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ]) {
        if (matrix[x + i]?.[y + j]) {
            elements.push(parseInt(matrix[x + i][y + j]));
        }
    }
    console.log(elements.sort((a, b) => a - b).join(" "));
}
