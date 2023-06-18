const readline = require("readline");
const fs = require("fs");
const path = require("path");
const os = require("os");

let currentLine = 0,
    s = 0,
    numbers = null;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt")),
    })
    .on("line", (line) => {
        if (currentLine === 1) {
            s = parseInt(line, 10);
        } else if (currentLine === 2) {
            numbers = line.split(/\s/).map((s) => parseInt(s, 10));
        }
        currentLine++;
    })
    .on("close", () => solve(numbers, s));

function solve(numbers, s) {
    const output = new Set();
    const pairs = new Map();
    const counts = new Map();
    for (let i = 0; i < numbers.length; i++) {
        if (!counts.get(numbers[i])) {
            counts.set(numbers[i], 1);
        } else {
            counts.set(numbers[i], counts.get(numbers[i]) + 1);
        }
        for (let j = i + 1; j < numbers.length; j++) {
            if (!pairs.get(numbers[i] + numbers[j])) {
                pairs.set(numbers[i] + numbers[j], [[numbers[i], numbers[j]].sort()]);
            } else {
                pairs.get(numbers[i] + numbers[j]).push([numbers[i], numbers[j]].sort());
            }
        }
    }
    const prev = new Set();
    // костыль для следующего цикла - если элементы в массиве одинаковые, то в цикле будет только один проход
    // с добавлением в prev
    const keys = [...pairs.keys()];
    if (keys.length === 1) {
        keys.push(keys[0]);
    }
    for (const key of keys) {
        const tmp = s - key;
        if (prev.has(tmp)) {
            const first = pairs.get(key);
            const second = pairs.get(tmp);
            for (let i = 0; i < first.length; i++) {
                for (let j = 0; j < second.length; j++) {
                    const arr = [first[i][0], first[i][1], second[j][0], second[j][1]].sort((a, b) => a - b);
                    const countsArr = new Map();
                    for (let k = 0; k < arr.length; k++) {
                        if (!countsArr.get(arr[k])) {
                            countsArr.set(arr[k], 1);
                        } else {
                            countsArr.set(arr[k], countsArr.get(arr[k]) + 1);
                        }
                    }
                    let flag = false;
                    for (const key2 of countsArr.keys()) {
                        if (countsArr.get(key2) > counts.get(key2)) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        output.add(arr.join(" "));
                    }
                }
            }
        } else {
            prev.add(key);
        }
    }
    console.log(output.size);
    console.log(
        [...output]
            .map((s) => s.split(/\s/).map((s2) => parseInt(s2, 10)))
            .sort((a, b) => {
                for (let i = 0; i < a.length; i++) {
                    if (a[i] - b[i] === 0) {
                        continue;
                    } else {
                        return a[i] - b[i];
                    }
                }
                return 0;
            })
            .map((arr) => arr.join(" "))
            .join(os.EOL)
    );
}
