const readline = require("readline");
const fs = require("fs");

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        solve(parseInt(line));
    });

function search(number, result) {
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            result.push(i);
            search(number / i, result);
            return;
        }
    }
    result.push(number);
}

function solve(number) {
    const result = [];
    search(number, result);
    console.log(result.join(" "));
}
