const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    field = [];

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine > 0) {
            field.unshift(line.split("").map(s => parseInt(s, 10)));
        }
        currentLine++;
    })
    .on("close", () => solve(field));

function solve(field) {
    const dp = Array.from(Array(field.length), () =>
        new Array(field[0].length).fill(0)
    );
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            dp[i][j] =
                Math.max(dp[i - 1]?.[j] || 0, dp[i][j - 1] || 0) + field[i][j];
        }
    }

    console.log(dp[dp.length - 1][dp[0].length - 1]);
}
