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

const BEGIN_LETTER = "a";
const END_LETTER = "z";
const BEGIN_DIGIT = "1";
const END_DIGIT = "9";

function unpack(str) {
    const cache = [];
    const multipliers = [];
    for (const letter of str) {
        if (letter >= "a" && letter <= "z") {
            if (multipliers.length === 0) {
                cache.push(letter);
            } else {
                const multiplier = multipliers.pop();
                for (let _ = 0; _ < multiplier; _++) {
                    cache.push(letter);
                }
            }
        }
    }
}

function solve(strings) {
    console.log(unpack(strings[0]));
    // if (strings.length === 1) {
    //     console.log(strings[0].length);
    // } else {
    //     let prefix = 0;
    //     while (true) {
    //         let flag = false;
    //         for (let i = 1; i < strings.length; i++) {
    //             if (
    //                 !strings[i][prefix] ||
    //                 strings[i][prefix] !== strings[0][prefix]
    //             ) {
    //                 flag = true;
    //                 break;
    //             }
    //         }
    //         if (flag) {
    //             break;
    //         } else {
    //             prefix++;
    //         }
    //     }
    //     console.log(prefix);
    // }
}
