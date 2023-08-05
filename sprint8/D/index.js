const readline = require("readline");
const fs = require("fs");
const path = require("path");

let strings = [],
    currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine > 0) {
            strings.push(line);
        }
        currentLine++;
    })
    .on("close", () => solve(strings));

function solve(strings) {
    if (strings.length === 1) {
        console.log(strings[0].length);
    } else {
        let prefix = 0;
        while (true) {
            let flag = false;
            for (let i = 1; i < strings.length; i++) {
                if (
                    !strings[i][prefix] ||
                    strings[i][prefix] !== strings[0][prefix]
                ) {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                break;
            } else {
                prefix++;
            }
        }
        console.log(prefix);
    }
}
