const readline = require("readline");
const fs = require("fs");
const path = require("path");

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => solve(parseInt(line, 10)));

function factorial(n) {
    if (n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function solve(n) {
    // число Каталана C(n) = (2n)!/n!(n+1)!
    console.log(Math.ceil(factorial(2 * n) / (factorial(n) * factorial(n + 1))));
}
