const readline = require("readline");
const fs = require("fs");

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => console.log(fibonacci(...line.split(" ").map(s => parseInt(s, 10)))));

function fibonacci(n, k) {
    let prev = 1;
    let fib = 1;
    for (let i = 1; i < n; i++) {
        const tmp = prev;
        prev = fib % Math.pow(10, k);
        fib += tmp;
    }
    return fib % Math.pow(10, k)
}
