const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    verticesCount = 0;
let matrix = null;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine > 0) {
            const [u, v] = line.split(/\s/).map(s => parseInt(s, 10) - 1);
            matrix[u][v] = 1;
        } else {
            verticesCount = parseInt(line.split(/\s/)[0], 10);
            matrix = Array.from(Array(verticesCount), () =>
                new Array(verticesCount).fill(0)
            );
        }
        currentLine++;
    })
    .on("close", () => {
        for (const row of matrix) {
            console.log(row.join(" "));
        }
    });
