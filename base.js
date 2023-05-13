const readline = require("readline");
const fs = require("fs");

let totalLines = 0,
    currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        parseLine(line);
        currentLine++;
    })
    .on("close", close);

function parseLine(line) {}

function close() {
    solve();
}

function solve() {}
