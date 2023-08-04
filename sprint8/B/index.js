const readline = require("readline");
const fs = require("fs");
const path = require("path");

let strings = [];

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => strings.push(line))
    .on("close", () => solve(strings));

function difference(first, second) {
    const n = first?.length || 0;
    const m = second?.length || 0;
    if (Math.abs(m - n) > 1) {
        return false;
    }
    let i = 0,
        j = 0,
        diff = 0;
    const maxLength = Math.max(n, m);
    while (i < maxLength && j < maxLength) {
        if (first[i] === second[j]) {
            i++;
            j++;
        } else {
            if (n > m) {
                i++;
            } else if (m > n) {
                j++;
            } else {
                i++;
                j++;
            }
            if (++diff > 1) {
                return false;
            }
        }
    }
    return diff <= 1;
}

function solve([first, second]) {
    if (difference(first, second)) {
        console.log("OK");
    } else {
        console.log("FAIL");
    }
}
