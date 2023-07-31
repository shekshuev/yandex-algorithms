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

    const result = [];
    let i = dp.length - 1,
        j = dp[0]?.length - 1 || 0;
    while (i > 0 || j > 0) {
        const down = +dp[i - 1]?.[j];
        const left = +dp[i][j - 1];
        if (isNaN(down) || left >= down) {
            result.unshift("R");
            j--;
        } else if (isNaN(left) || down > left) {
            result.unshift("U");
            i--;
        }
    }

    console.log(result.join(""));
}
