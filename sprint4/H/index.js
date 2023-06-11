const readline = require("readline");
const fs = require("fs");
const path = require("path");

const input = [];

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt")),
    })
    .on("line", line => {
        input.push(line);
    })
    .on("close", () => console.log(solve(input)));

function solve([first, second]) {
    if (first.length !== second.length) {
        return "NO";
    }
    function test(first, second) {
        const map = new Map();
        for (let i = 0; i < first.length; i++) {
            if (!map.get(first[i])) {
                map.set(first[i], second[i]);
            } else if (map.get(first[i]) !== second[i]) {
                return false;
            }
        }
        return true;
    }
    return test(first, second) && test(second, first) ? "YES" : "NO";
}
