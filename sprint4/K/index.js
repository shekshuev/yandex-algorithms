const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    subwayExitCount = 0,
    subwayExits = [],
    busMap = new Map();

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt")),
    })
    .on("line", (line) => {
        if (currentLine === 0) {
            subwayExitCount = parseInt(line, 10);
        } else if (currentLine > 0 && currentLine < subwayExitCount + 1) {
            subwayExits.push(line.split(/\s/).map((s) => parseInt(s, 10)));
        } else if (currentLine > subwayExitCount + 1) {
            const [x, y] = line.split(/\s/).map((s) => parseInt(s, 10));
            const bucket = getBucketKey([x, y]);
            if (busMap.has(bucket)) {
                busMap.get(bucket).push([x, y]);
            } else {
                busMap.set(bucket, [[x, y]]);
            }
        }
        currentLine++;
    })
    .on("close", () => solve(subwayExits, busMap));

function getBucketKey([x, y]) {
    return [Math.floor(x / 20), Math.floor(y / 20)].toString();
}

function solve(subwayExits, busMap) {
    const countDistance = ([x1, y1], [x2, y2]) => {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

    const distances = new Map();
    const delta = [0, 20, -20];
    for (const [i, [x, y]] of subwayExits.entries()) {
        for (const deltaX of delta) {
            for (const deltaY of delta) {
                const bucket = getBucketKey([x + deltaX, y + deltaY]);
                const stops = busMap.get(bucket) || [];
                for (const stop of stops) {
                    const distance = countDistance([x, y], stop);
                    if (distance <= 20) {
                        if (!distances.has(i + 1)) {
                            distances.set(i + 1, 1);
                        } else {
                            distances.set(i + 1, distances.get(i + 1) + 1);
                        }
                    }
                }
            }
        }
    }
    let max = Number.MIN_SAFE_INTEGER;
    let maxIndex = 0;
    for (const key of distances.keys()) {
        const current = distances.get(key);
        if (max < current) {
            max = current;
            maxIndex = key;
        }
    }
    console.log(maxIndex);
}
