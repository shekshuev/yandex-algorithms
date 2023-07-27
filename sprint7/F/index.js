const readline = require("readline");
const fs = require("fs");
const path = require("path");

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        const [n, k] = line.split(/\s/).map(s => parseInt(s, 10));
        solve(n, k);
    });

function count(n, k, dp) {
    if (n < 0) {
        return 0;
    } else if (n < 2) {
        dp[n] = n;
        return n;
    } else {
        if (dp[n] !== 0) {
            return dp[n] % 1000000007;
        } else {
            for (let i = 1; i <= k; i++) {
                dp[n] += count(n - i, k, dp) % 1000000007;
            }
            return dp[n] % 1000000007;
        }
    }
}

function solve(n, k) {
    const dp = new Array(n + 1).fill(0);
    console.log(count(n, k, dp));
}
