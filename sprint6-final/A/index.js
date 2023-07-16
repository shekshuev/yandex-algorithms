const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    edgesCount = 0;
const graph = new Map();

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine > 0 && currentLine <= edgesCount) {
            const [u, v, l] = line.split(/\s/).map(s => parseInt(s, 10));
            if (!graph.has(u)) {
                graph.set(u, makeMaxHeap(Vertex.compare));
            }
            if (!graph.has(v)) {
                graph.set(v, makeMaxHeap(Vertex.compare));
            }
            graph.get(u).push(new Vertex(u, v, l));
            graph.get(v).push(new Vertex(v, u, l));
        } else if (currentLine === 0) {
            const [_, eCount] = line.split(/\s/).map(s => parseInt(s, 10));
            edgesCount = eCount;
        }
        currentLine++;
    })
    .on("close", () => findMaximumSpanningTree(graph));

class Vertex {
    constructor(begin, end, weight) {
        this.begin = begin;
        this.end = end;
        this.weight = weight;
    }

    static compare(v1, v2) {
        return v2.weight - v1.weight;
    }
}

function makeMaxHeap(comparator) {
    const _heap = [null];
    let _size = 0;

    const _siftDown = idx => {
        let left = 2 * idx;
        let right = 2 * idx + 1;
        if (_heap.length - 1 < left) {
            return;
        }
        let max = -1;
        if (
            right <= _heap.length - 1 &&
            comparator(_heap[left], _heap[right]) > 0
        ) {
            max = right;
        } else {
            max = left;
        }
        if (comparator(_heap[idx], _heap[max]) > 0) {
            const tmp = _heap[idx];
            _heap[idx] = _heap[max];
            _heap[max] = tmp;
            _siftDown(max);
        }
    };

    const _siftUp = idx => {
        if (idx > 1) {
            let parentIndex = Math.floor(idx / 2);
            if (comparator(_heap[parentIndex], _heap[idx]) > 0) {
                const tmp = _heap[idx];
                _heap[idx] = _heap[parentIndex];
                _heap[parentIndex] = tmp;
                _siftUp(parentIndex);
            }
        }
    };

    const push = elem => {
        _heap.push(elem);
        _siftUp(_heap.length - 1);
        _size += 1;
    };

    const pop = () => {
        const result = _heap[1];
        const tmp = _heap.pop();
        if (_size > 1) {
            _heap[1] = tmp;
        }
        _siftDown(1);
        _size -= 1;
        return result;
    };

    const getSize = () => _size;

    return {
        push,
        pop,
        getSize,
        _heap
    };
}

function findMaximumSpanningTree(graph) {
    const notAdded = new Set(graph.keys());
    const added = new Set();
    const mst = new Map();

    const addVertex = v => {
        added.add(v.end);
        notAdded.delete(v.end);
        mst.set(v.begin, v);
    };

    const getVertexToStart = () => {
        let vertex = null;
        for (const v of notAdded.values()) {
            vertex = graph.get(v)?.pop();
            break;
        }
        return vertex;
    };

    let v = getVertexToStart();

    while (notAdded.size > 0 || graph.get(v?.end)?.getSize() === 0) {
        if (v) {
            addVertex(v);
            v = graph.get(v.end).pop();
        } else {
            v = getVertexToStart();
        }
    }

    if (notAdded.size === 0 && added.size > 0) {
        let total = 0;
        for (const w of mst.values()) {
            total += w.weight;
        }
        console.log(total);
    } else {
        console.log("Oops! I did it again");
    }
}
