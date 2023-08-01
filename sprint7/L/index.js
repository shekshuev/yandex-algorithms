const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    size = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine === 0) {
            size = parseInt(line.split(/\s/)[1], 10);
        } else {
            solve(
                line.split(/\s/).map(s => parseInt(s, 10)),
                size
            );
        }
        currentLine++;
    });

function solve(weights, size) {
    // const dp = Array.from(Array(weights.length + 1), () =>
    //     new Array(size + 1).fill(0)
    // );
    // for (let i = 1; i <= weights.length; i++) {
    //     for (let j = 1; j <= size; j++) {
    //         if (weights[i - 1] <= j) {
    //             dp[i][j] = Math.max(
    //                 dp[i - 1][j],
    //                 dp[i - 1][j - weights[i - 1]] + weights[i - 1]
    //             );
    //         } else {
    //             dp[i][j] = dp[i - 1][j];
    //         }
    //     }
    // }
    // console.log(dp[dp.length - 1][size]);
    const dp = Array.from(Array(2), () => new Array(size + 1).fill(0));
    for (let i = 1; i <= weights.length; i++) {
        for (let j = 1; j <= size; j++) {
            if (weights[i - 1] <= j) {
                dp[1][j] = Math.max(
                    dp[0][j],
                    dp[0][j - weights[i - 1]] + weights[i - 1]
                );
            } else {
                dp[1][j] = dp[0][j];
            }
        }
        dp.shift();
        dp.push(new Array(size + 1).fill(0));
    }
    console.log(dp[0][size]);
}
