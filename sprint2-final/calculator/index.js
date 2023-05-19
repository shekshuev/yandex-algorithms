const readline = require("readline");
const fs = require("fs");

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        solveEquation(line);
    });

function solveEquation(line) {
    const operands = [];

    const operations = {
        "*": (a, b) => b * a,
        "/": (a, b) => Math.floor(b / a),
        "+": (a, b) => b + a,
        "-": (a, b) => b - a
    }

    for (const elem of line.split(/\s/)) {
        if (["*", "/", "+", "-"].includes(elem)) {
            operands.push(operations[elem](operands.pop(), operands.pop()));
        } else {
            operands.push(parseInt(elem, 10));
        }
    }

    console.log(operands.pop())
}

