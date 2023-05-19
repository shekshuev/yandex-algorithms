const readline = require("readline");
const fs = require("fs");

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => console.log(fibonacci(parseInt(line, 10))));

function fibonacci(number) {
    if ([0,1].includes(number)) {
        return 1
    } else {
        return fibonacci(number - 2) + fibonacci(number - 1)
    }
}
