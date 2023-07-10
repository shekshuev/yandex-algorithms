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

function makeQueue(maxSize) {
    const storage = new Array(maxSize).fill(null);

    let _head = 0,
        _tail = 0,
        _size = 0;

    function size() {
        return _size;
    }

    function push(elem) {
        if (_size < maxSize) {
            storage[_tail] = elem;
            _tail = (_tail + 1) % maxSize;
            _size++;
        } else {
            throw new Error("error");
        }
    }

    function pop() {
        const tmp = peek();
        storage[_head] = null;
        _head = (_head + 1) % maxSize;
        _size--;
        return tmp;
    }

    function peek() {
        if (_size === 0) {
            throw new Error("None");
        } else {
            return storage[_head];
        }
    }

    return { size, push, pop, peek };
}

function BFS(vertices, startIndex, verticesCount) {
    const colors = new Array(verticesCount + 1).fill(WHITE);
    const result = [];
    const planned = makeQueue(verticesCount);
    planned.push(startIndex);
    colors[startIndex] = GRAY;
    result.push(startIndex);
    while (planned.size() > 0) {
        const u = planned.pop();
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
