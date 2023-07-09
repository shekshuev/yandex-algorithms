const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    edgesCount = 0,
    verticesCount = 0;
const vertices = new Map();

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
        } else {
            const [vCount, eCount] = line.split(/\s/).map(s => parseInt(s, 10));
            verticesCount = vCount;
            edgesCount = eCount;
        }
        currentLine++;
    })
    .on("close", () => mainDFS(vertices, verticesCount));

function mainDFS(vertices, verticesCount) {
    const colors = new Array(verticesCount + 1).fill(-1);
    let componentCount = 0;

    const dfs = (vertices, startIndex) => {
        const stack = [startIndex];
        while (stack.length > 0) {
            const v = stack.pop();
            if (colors[v] === -1) {
                colors[v] = 0;
                stack.push(v);
                if (vertices.has(v)) {
                    for (const w of vertices.get(v).sort((a, b) => b - a)) {
                        if (colors[w] === -1) {
                            stack.push(w);
                        }
                    }
                }
            } else if (colors[v] === 0) {
                colors[v] = componentCount;
            }
        }
    };
    for (let i = 1; i <= verticesCount; i++) {
        if (colors[i] === -1) {
            componentCount++;
            dfs(vertices, i);
        }
    }
    const outputs = new Array(componentCount).fill("");
    for (let i = 1; i < colors.length; i++) {
        outputs[colors[i] - 1] += i + " ";
    }
    console.log(componentCount);
    for (const output of outputs) {
        console.log(output);
    }
}
