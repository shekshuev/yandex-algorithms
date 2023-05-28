const readline = require("readline");
const fs = require("fs");

const letters = [];

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        letters.push(line.split(""));
    })
    .on("close", solve);

function solve() {
    letters[0].sort();
    letters[1].sort();
    let letter = null;
    for (let i = 0; i < letters[1].length; i++) {
        if (letters[0][i] !== letters[1][i]) {
            letter = letters[1][i];
            break;
        }
    }
    console.log(letter);
}
