const readline = require("readline");
const fs = require("fs");

let ids = null,
    max = 0,
    currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 1) {
            ids = line.split(/\s/).map(s => parseInt(s, 10));
        } else if (currentLine === 2) {
            max = parseInt(line, 10);
        }
        currentLine++;
    })
    .on("close", () => solve(ids, max));

function solve(ids, max) {
    const result = ids
        .sort((a, b) => a - b)
        .reduce((acc, curr) => {
            if (acc.length === 0 || acc[acc.length - 1].id !== curr) {
                acc.push({
                    id: curr,
                    value: 1,
                });
            } else {
                acc[acc.length - 1].value++;
            }
            return acc;
        }, [])
        .sort((a, b) => b.value - a.value)
        .slice(0, max)
        .map(a => a.id)
        .join(" ");

    console.log(result);
}
