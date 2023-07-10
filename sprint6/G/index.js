const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    startIndex = 0,
    edgesCount = 0,
    verticesCount = 0;
const vertices = new Map();

const WHITE = 1;
const GRAY = 2;
const BLACK = 3;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine > 0 && currentLine <= edgesCount) {
            const [u, v] = line.split(/\s/).map(s => parseInt(s, 10));
            if (vertices.has(u)) {
                vertices.get(u).push(v);
            } else {
                vertices.set(u, [v]);
            }
            if (vertices.has(v)) {
                vertices.get(v).push(u);
            } else {
                vertices.set(v, [u]);
            }
        } else if (currentLine === 0) {
            const [vCount, eCount] = line.split(/\s/).map(s => parseInt(s, 10));
            verticesCount = vCount;
            edgesCount = eCount;
        } else {
            startIndex = parseInt(line, 10);
        }
        currentLine++;
    })
    .on("close", () => BFS(vertices, startIndex, verticesCount));

function BFS(vertices, startIndex, verticesCount) {
    const colors = new Array(verticesCount + 1).fill(WHITE);
    const distance = new Array(verticesCount + 1).fill(null);
    const previous = new Array(verticesCount + 1).fill(null);
    const planned = [startIndex];
    colors[startIndex] = GRAY;
    distance[startIndex] = 0;
    while (planned.length > 0) {
        const u = planned.shift();
        if (vertices.has(u)) {
            for (const v of vertices.get(u).sort((a, b) => a - b)) {
                if (colors[v] === WHITE) {
                    colors[v] = GRAY;
                    distance[v] = distance[u] + 1;
                    previous[v] = u;
                    planned.push(v);
                }
            }
        }
        colors[u] = BLACK;
    }
    const path = (s, v, previous) => {
        let path = 0;
        let current = v;
        while (current) {
            path++;
            current = previous[current];
            if (current === s) {
                return path;
            }
        }
        return 0;
    };

    let max = 0;
    for (const v of vertices.keys()) {
        let tmp = path(startIndex, v, previous);
        max = tmp > max ? tmp : max;
    }
    console.log(max);
}
