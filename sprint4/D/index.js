const readline = require("readline");
const fs = require("fs");

let totalLines = 0,
    currentLine = 0;

const set = new Set();

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 0) {
            totalLines = parseInt(line, 10);
        } else if (totalLines > 0) {
            set.add(line);
            totalLines--;
        }
        currentLine++;
    })
    .on("close", () => {
        for (const item of set) {
            console.log(item);
        }
    });
