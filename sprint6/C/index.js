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
    .on("close", () => mainDFS(vertices, startIndex, verticesCount));

function mainDFS(vertices, startIndex, verticesCount) {
    const colors = new Array(verticesCount + 1).fill(WHITE);
    const result = [];

    const stack = [startIndex];
    while (stack.length > 0) {
        const v = stack.pop();
        if (colors[v] === WHITE) {
            colors[v] = GRAY;
            result.push(v);
            stack.push(v);
            if (vertices.has(v)) {
                for (const w of vertices.get(v).sort((a, b) => b - a)) {
                    if (colors[w] === WHITE) {
                        stack.push(w);
                    }
                }
            }
        } else if (colors[v] === GRAY) {
            colors[v] = BLACK;
        }
    }
    console.log(result.join(" "));
}
