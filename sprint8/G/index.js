const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    input = null,
    pattern = null;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine === 1) {
            input = line.split(/\s/).map(s => parseInt(s, 10));
        } else if (currentLine === 3) {
            pattern = line.split(/\s/).map(s => parseInt(s, 10));
        }
        currentLine++;
    })
    .on("close", () => solve(input, pattern));

function solve(input, pattern) {
    const find = (input, pattern, start) => {
        if (input?.length < pattern?.length) {
            return -1;
        }
        for (let pos = start; pos < input.length - pattern.length + 1; pos++) {
            let match = true;
            for (let offset = 0; offset < pattern.length; offset++) {
                if (input[pos + offset] !== pattern[offset]) {
                    match = false;
                    break;
                }
            }
            if (!match) {
                match = true;
                let c = input[pos] - pattern[0];
                for (let offset = 1; offset < pattern.length; offset++) {
                    if (input[pos + offset] !== pattern[offset] + c) {
                        match = false;
                        break;
                    }
                }
            }
            if (match) {
                return pos;
            }
        }
        return -1;
    };

    const occurrences = [];
    let start = 0;
    let pos;
    while (true) {
        pos = find(input, pattern, start);
        if (pos === -1) {
            break;
        } else {
            occurrences.push(pos + 1);
            start = pos + 1;
        }
    }
    console.log(occurrences.join(" "));
}
