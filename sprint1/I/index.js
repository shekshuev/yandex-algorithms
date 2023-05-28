const readline = require("readline");
const fs = require("fs");

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        solve(parseInt(line));
    });

function solve(number) {
    let result = false;
    if (number === 1) {
        result = true;
    } else {
        let current = 4;
        while (current <= number) {
            if (current === number) {
                result = true;
                break;
            }
            current *= 4;
        }
    }
    console.log(result ? "True" : "False");
}
