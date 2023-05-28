const readline = require("readline");
const fs = require("fs");

let currentLine = 0,
    list = [],
    number = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 1) {
            list = line.split(/\s/).map(s => parseInt(s));
        } else if (currentLine === 2) {
            number = parseInt(line);
        }
        currentLine++;
    })
    .on("close", solve);

function solve() {
    let current = number
        .toString()
        .split("")
        .map(s => parseInt(s));
    if (list.length > current.length) {
        current = new Array(list.length - current.length)
            .fill(0)
            .concat(current);
    } else if (current.length > list.length) {
        list = new Array(current.length - list.length).fill(0).concat(list);
    }
    let reminder = 0;
    for (let i = list.length - 1; i >= 0; i--) {
        let tmp = current[i] + list[i] + reminder;
        reminder = Math.floor(tmp / 10);
        current[i] = tmp % 10;
    }
    if (reminder > 0) {
        current.unshift(reminder);
    }
    console.log(current.join(" "));
}
