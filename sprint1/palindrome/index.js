const readline = require("readline");
const fs = require("fs");

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        solve(line);
    });

function solve(line) {
    let first = 0,
        last = line.length - 1,
        result = true;
    const r = /^[a-zA-Z]{1}$/;
    while (first < last) {
        if (!r.test(line[first])) {
            first++;
            continue;
        }
        if (!r.test(line[last])) {
            last--;
            continue;
        }
        if (line[first].toUpperCase() !== line[last].toUpperCase()) {
            result = false;
            break;
        }
        first++;
        last--;
    }
    console.log(result ? "True" : "False");
}
