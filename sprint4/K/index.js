const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    subwayExitCount = 0,
    busStopCount = 0,
    subwayExits = [],
    busStops = [],
    busMap = new Map();

// input2 2959

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input2.txt")),
    })
    .on("line", line => {
        if (currentLine === 0) {
            subwayExitCount = parseInt(line, 10);
        } else if (currentLine > 0 && currentLine < subwayExitCount + 1) {
            subwayExits.push(line.split(/\s/).map(s => parseInt(s, 10)));
        } else if (currentLine === subwayExitCount + 1) {
            busStopCount = parseInt(line, 10);
        } else {
            const [x, y] = line.split(/\s/).map(s => parseInt(s, 10));
            const distance = countApproximateDistance([x, y]);
            if (busMap.has(distance)) {
                busMap.get(distance).push([x, y]);
            } else {
                busMap.set(distance, [[x, y]]);
            }

            busStops.push([x, y]);
        }
        currentLine++;
    })
    .on("close", () => {
        // solve(subwayExits, busStops);
        solve2();
    });

function countApproximateDistance([x, y]) {
    return Math.floor(Math.sqrt(x * x + y * y)) / 20;
}

function solve2() {
    console.log(busMap, busMap.size);

    const countDistance = ([x1, y1], [x2, y2]) => {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

    const distances = new Map();

    let totalStops = 0;
    console.time("search2");
    for (const [i, exit] of subwayExits.entries()) {
        const approximateDistance = countApproximateDistance(exit);
        for (const key of busMap.keys()) {
            if (approximateDistance <= key) {
                const stops = busMap.get(key);
                for (const stop of stops) {
                    totalStops++;
                    const distance = countDistance(exit, stop);
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
    console.timeEnd("search2");
    let max = Number.MIN_SAFE_INTEGER;
    let maxIndex = 0;
    for (const key of distances.keys()) {
        const current = distances.get(key);
        if (max < current) {
            max = current;
            maxIndex = key;
        }
    }
    console.log(maxIndex, totalStops);
}

function solve(subwayExits, busStops) {
    const countDistance = ([x1, y1], [x2, y2]) => {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
    let totalStops = 0;
    console.time("search");
    const distances = new Map();
    for (const [i, exit] of subwayExits.entries()) {
        for (const stop of busStops) {
            totalStops++;
            const distance = countDistance(exit, stop);
            const key = i + 1;
            if (distance <= 20) {
                if (!distances.has(key)) {
                    distances.set(key, 1);
                } else {
                    distances.set(key, distances.get(key) + 1);
                }
            }
        }
    }
    console.timeEnd("search");
    let max = Number.MIN_SAFE_INTEGER;
    let maxIndex = 0;
    for (const key of distances.keys()) {
        const current = distances.get(key);
        if (max < current) {
            max = current;
            maxIndex = key;
        }
    }
    console.log(maxIndex, totalStops);
}
