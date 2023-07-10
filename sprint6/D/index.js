const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    startIndex = 0,
    edgesCount = 0,
    verticesCount = 0;
const vertices = [];

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
            if (vertices[u]) {
                vertices[u].push(v);
            } else {
                vertices[u] = [v];
            }
            if (vertices[v]) {
                vertices[v].push(u);
            } else {
                vertices[v] = [u];
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
    const result = [];
    const planned = [startIndex];
    colors[startIndex] = GRAY;
    result.push(startIndex);
    while (planned.length > 0) {
        const u = planned.shift();
        if (vertices[u]?.length > 0) {
            vertices[u].sort((a, b) => a - b);
            for (const v of vertices[u]) {
                if (colors[v] === WHITE) {
                    colors[v] = GRAY;
                    planned.push(v);
                    result.push(v);
                }
            }
        }
        colors[u] = BLACK;
    }
    console.log(result.join(" "));
}
