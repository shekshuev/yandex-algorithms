const readline = require("readline");
const fs = require("fs");

let strings = [];

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        strings.push(line);
    })
    .on("close", () => console.log(solve(strings)));

function solve([s, t]) {
    if (s === t || s.length === 0) {
        return "True";
    } else if (s.length > t.length) {
        return "False";
    } else {
        let i = 0,
            j = 0;
        while (j < t.length) {
            if (s[i] === t[j]) {
                i++;
                if (i >= s.length) {
                    return "True";
                }
            }
            j++;
        }
        return "False";
    }
}
