const readline = require("readline");
const fs = require("fs");

let currentLine = 0, days = null, cost = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 1) {
            days = line.split(/\s/).map(elem => parseInt(elem, 10))
        } else if (currentLine === 2) {
            cost = parseInt(line, 10);
        }
        currentLine++;
    })
    .on("close", solve);

function solve() {
    const search = (data, predicate, left, right) => {
        if (right <= left) {
            return -1;
        } else {
            const mid = Math.floor((left + right) / 2);
            if (predicate(data, mid) === 0) {
                return mid + 1;
            } else if (predicate(data, mid) < 0) {
                return search(data, predicate, left, mid);
            } else {
                return search(data, predicate, mid + 1, right);
            }
        }
    }

    const predicate = searchElem => (data, mid) => {
        if (searchElem > data[mid - 1] && searchElem <= data[mid] || mid === 0 && searchElem <= data[mid]) {
            return 0;
        } else if (searchElem <= data[mid]) {
            return -1;
        } else {
            return 1;
        }
    }

    const one = search(days, predicate(cost), 0, days.length);
    const two = search(days, predicate(cost * 2), 0, days.length);

    console.log(`${one} ${two}`);
}
