const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0;
const input = [];

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if ([1, 3].includes(currentLine)) {
            input.push(line.split(/\s/));
        }
        currentLine++;
    })
    .on("close", () => solve(input));

function solve([first, second]) {
    const N = first.length;
    const M = second.length;
    const dp = Array.from(Array(N + 1), () => new Array(M + 1).fill(0));
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= M; j++) {
            if (first[i - 1] === second[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    console.log(dp[N][M]);
    if (dp[N][M] > 1) {
        const answer1 = [],
            answer2 = [];
        let i = N,
            j = M;
        while (i > 1 || j > 1) {
            if (first[i - 1] === second[j - 1]) {
                answer1.push(i);
                answer2.push(j);
                i--;
                j--;
            } else if (dp[i][j] === dp[i][j - 1] && j > 0) {
                j--;
            } else if (dp[i][j] === dp[i - 1][j] && i > 0) {
                i--;
            }
        }
        console.log(answer1.reverse().join(" "));
        console.log(answer2.reverse().join(" "));
    }
}
