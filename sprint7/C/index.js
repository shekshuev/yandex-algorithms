const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0;
let knapsackSize = 0;

const heaps = [];

class Heap {
    constructor(cost, mass) {
        this.cost = cost;
        this.mass = mass;
    }

    compareTo(other) {
        return other.cost - this.cost;
    }
}

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine === 0) {
            knapsackSize = parseInt(line, 10);
        } else if (currentLine > 1) {
            const [cost, mass] = line.split(/\s/).map(s => parseFloat(s, 10));
            heaps.push(new Heap(cost, mass));
        }
        currentLine++;
    })
    .on("close", () => solve(heaps, knapsackSize));

function solve(heaps, knapsackSize) {
    let available = knapsackSize;
    const result = heaps
        .sort((a, b) => a.compareTo(b))
        .reduce((acc, curr) => {
            if (available > curr.mass) {
                acc += curr.mass * curr.cost;
                available -= curr.mass;
            } else {
                acc += available * curr.cost;
                available = 0;
            }
            return acc;
        }, 0);
    console.log(result);
}
