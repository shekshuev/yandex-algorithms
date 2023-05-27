const readline = require("readline");
const fs = require("fs");

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        solve(parseInt(line, 10));
    });

function solve(n) {

    const check = (line) => {
        const stack = [];
        let error = false;
        for (const s of line) {
            if (s === "(") {
                stack.push(s)
            } else if (stack.slice(-1)?.[0] === "(") {
                stack.pop()
            } else {
                error = true;
                break;
            }
        }
        return stack.length === 0 && !error
    }

    (function generate(n, prefix) {
        if (n == 0) {
            if (check(prefix)) {
                console.log(prefix);
            }
        } else {
            generate(n - 1, prefix + "(");
            generate(n - 1, prefix + ")");
        }
    })(2 * n, "")
}
