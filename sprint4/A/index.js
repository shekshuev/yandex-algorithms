const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    a = 0,
    m = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt")),
    })
    .on("line", (line) => {
        if (currentLine === 0) {
            a = parseInt(line, 10);
        } else if (currentLine === 1) {
            m = parseInt(line, 10);
        } else if (currentLine === 2) {
            solve(line, a, m);
        }
        currentLine++;
    });

function solve(string, a, m) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = ((hash + string.charCodeAt(i)) * (i === string.length - 1 ? 1 : a)) % m;
    }
    console.log(hash);
}
