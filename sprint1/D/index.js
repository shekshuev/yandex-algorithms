const readline = require("readline");
const fs = require("fs");

let currentLine = 0,
    n = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 0) {
            n = parseInt(line);
        } else {
            solve(line);
        }
        currentLine++;
    });

function solve(line) {
    if (n === 1) {
        console.log(1);
    } else {
        console.log(
            line
                .split(/\s/)
                .map(s => parseInt(s))
                .reduce((acc, curr, i, array) => {
                    if (
                        (i === 0 && curr > array[1]) ||
                        (i === n - 1 && curr > array[i - 1]) ||
                        (i > 0 &&
                            i < n - 1 &&
                            curr > array[i - 1] &&
                            curr > array[i + 1])
                    ) {
                        return acc + 1;
                    }
                    return acc;
                }, 0)
        );
    }
}
