const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    source = null,
    strings = [];

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine === 0) {
            source = line;
        } else if (currentLine > 1) {
            strings.push(
                line.split(/\s/).map((s, i) => (i == 0 ? s : parseInt(s, 10)))
            );
        }
        currentLine++;
    })
    .on("close", () => solve(source, strings));

function solve(source, strings) {
    strings.sort((s1, s2) => s1[1] - s2[1]);
    let start = 0,
        end = 0;
    const cache = [];
    for (const [str, index] of strings) {
        end = index;
        cache.push(source.substring(start, end));
        cache.push(str);
        start = end;
    }
    if (end < source.length) {
        end = source.length;
        cache.push(source.substring(start, end));
    }
    console.log(cache.join(""));
}
