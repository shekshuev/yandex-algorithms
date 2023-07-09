const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    startIndex = 1,
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
        } else {
            const [vCount, eCount] = line.split(/\s/).map(s => parseInt(s, 10));
            verticesCount = vCount;
            edgesCount = eCount;
        }
        currentLine++;
    })
    .on("close", () => dfs(vertices, startIndex, verticesCount));

function dfs(vertices, startIndex, verticesCount) {
    const colors = new Array(verticesCount + 1).fill(WHITE);
    const stack = [startIndex];
    const entry = new Array(verticesCount + 1).fill(0);
    const leave = new Array(verticesCount + 1).fill(0);
    let time = 0;
    while (stack.length > 0) {
        const v = stack.pop();
        if (colors[v] === WHITE) {
            colors[v] = GRAY;
            stack.push(v);
            entry[v] = time++;
            if (vertices.has(v)) {
                for (const w of vertices.get(v).sort((a, b) => b - a)) {
                    if (colors[w] === WHITE) {
                        stack.push(w);
                    }
                }
            }
        } else if (colors[v] === GRAY) {
            colors[v] = BLACK;
            leave[v] = time++;
        }
    }
    for (let i = 1; i <= verticesCount; i++) {
        console.log(`${entry[i]} ${leave[i]}`);
    }
}
