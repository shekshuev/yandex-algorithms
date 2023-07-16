const readline = require("readline");
const fs = require("fs");
const path = require("path");
const os = require("os");

let currentLine = 0,
    verticesCount = 0,
    edgesCount = 0;
const graph = new Map();
const weights = new Map();

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine > 0 && currentLine <= edgesCount) {
            const [u, v, l] = line.split(/\s/).map(s => parseInt(s, 10));
            if (graph.has(u)) {
                graph.get(u).push(v);
            } else {
                graph.set(u, [v]);
            }
            if (graph.has(v)) {
                graph.get(v).push(u);
            } else {
                graph.set(v, [u]);
            }
            if (!weights.has(`${u}-${v}`) || weights.get(`${u}-${v}`) > l) {
                weights.set(`${u}-${v}`, l);
            }
            if (!weights.has(`${v}-${u}`) || weights.get(`${v}-${u}`) > l) {
                weights.set(`${v}-${u}`, l);
            }
        } else if (currentLine === 0) {
            const [vCount, eCount] = line.split(/\s/).map(s => parseInt(s, 10));
            verticesCount = vCount;
            edgesCount = eCount;
        }
        currentLine++;
    })
    .on("close", () => solve(graph, weights, verticesCount));

function dijkstra(s, graph, weights, verticesCount) {
    const previous = new Array(verticesCount + 1).fill(null);
    const dist = new Array(verticesCount + 1).fill(Number.POSITIVE_INFINITY);
    const visited = new Array(verticesCount + 1).fill(false);

    const weight = (u, v) => {
        return weights.get(`${u}-${v}`);
    };

    const relax = (u, v) => {
        if (dist[v] > dist[u] + weight(u, v)) {
            dist[v] = dist[u] + weight(u, v);
            previous[v] = u;
        }
    };

    const getMinDistNotVisitedVertex = () => {
        let currentMinimum = Number.POSITIVE_INFINITY;
        let currentMinimumVertex = null;
        for (const v of graph.keys()) {
            if (!visited[v] && dist[v] < currentMinimum) {
                currentMinimum = dist[v];
                currentMinimumVertex = v;
            }
        }
        return currentMinimumVertex;
    };

    dist[s] = 0;

    while (true) {
        const u = getMinDistNotVisitedVertex();
        if (u === null || dist[u] === Number.POSITIVE_INFINITY) {
            break;
        }
        visited[u] = true;

        let neighbors = graph.get(u) || [];

        for (let v of neighbors) {
            relax(u, v);
        }
    }
    return dist;
}

function solve(graph, weights, verticesCount) {
    const result = [];
    for (const v of Array(verticesCount + 1).keys()) {
        const row = [];
        if (v > 0) {
            const tmp = dijkstra(v, graph, weights, verticesCount);
            for (let i = 1; i < verticesCount + 1; i++) {
                row.push(tmp[i]);
            }
            result.push(row);
        }
    }
    for (let i = 0; i < verticesCount; i++) {
        for (let j = 0; j < verticesCount; j++) {
            if (result[i][j] === Number.POSITIVE_INFINITY) {
                result[i][j] = -1;
            }
        }
    }
    console.log(result.map(arr => arr.join(" ")).join(os.EOL));
}
