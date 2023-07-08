const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    verticesCount = 0;
const vertices = new Map();

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine > 0) {
            const [u, v] = line.split(/\s/).map(s => parseInt(s, 10));
            if (vertices.has(u)) {
                vertices.get(u).push(v);
            } else {
                vertices.set(u, [v]);
            }
        } else {
            verticesCount = parseInt(line.split(/\s/)[0], 10);
        }
        currentLine++;
    })
    .on("close", () => solve(vertices, verticesCount));

function solve(vertices, verticesCount) {
    for (let i = 1; i <= verticesCount; i++) {
        if (vertices.has(i)) {
            console.log(
                `${vertices.get(i).length} ${vertices
                    .get(i)
                    .sort((a, b) => a - b)
                    .join(" ")}`
            );
        } else {
            console.log(0);
        }
    }
}
