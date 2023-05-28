const readline = require("readline");
const fs = require("fs");
const os = require("os");

let coords = [],
    currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine > 0) {
            coords.push(line.split(/\s/).map(elem => parseInt(elem, 10)));
        }
        currentLine++;
    })
    .on("close", () => solve(coords));

function solve(coords) {
    Array.prototype.peek = function () {
        if (this.length <= 0) {
            return null;
        } else {
            return this[this.length - 1];
        }
    };

    const comparator = (a, b) => (b[0] - a[0] === 0 ? b[1] - a[1] : a[0] - b[0]);

    const result = coords
        .sort((a, b) => comparator(a, b))
        .reduce((acc, curr) => {
            if (acc.length === 0) {
                acc.push(curr);
            } else {
                const last = acc.peek();
                if (curr[0] > last[1]) {
                    acc.push(curr);
                } else if (curr[1] >= last[1]) {
                    last[1] = curr[1];
                }
            }
            return acc;
        }, []);

    console.log(result.map(arr => arr.join(" ")).join(os.EOL));
}
