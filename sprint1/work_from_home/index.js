const readline = require("readline");
const fs = require("fs");

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        solve(parseInt(line));
    });

function solve(n) {
    let result = "";
    if (n === 0) {
        result = "0";
    } else {
        while (n > 0) {
            result = (n & 1) + result;
            n >>= 1;
        }
    }
    console.log(result);
}
