const readline = require("readline");
const fs = require("fs");

let matrix = [],
    currentLine = 0,
    rows = 0,
    cols = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 0) {
            rows = parseInt(line, 10);
        } else if (currentLine === 1) {
            cols = parseInt(line, 10);
            matrix = initMatrix(rows, cols);
        } else {
            parseLine(line, currentLine - 2);
        }
        currentLine++;
    })
    .on("close", printOutput);

function initMatrix(cols, rows) {
    return new Array(rows).fill(0).map(() => new Array(cols).fill(0));
}

function parseLine(line, row) {
    line.split(" ")
        .filter(elem => elem.length > 0)
        .forEach((elem, index) => {
            matrix[index][row] = parseInt(elem, 10);
        });
}

function printOutput() {
    for (const row of matrix) {
        console.log(row.join(" "));
    }
}
