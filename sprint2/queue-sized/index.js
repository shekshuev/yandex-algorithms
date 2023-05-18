const readline = require("readline");
const fs = require("fs");

let currentLine = 0;

let queue = null;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 1) {
            queue = makeQueue(parseInt(line, 10))
        } else if (currentLine > 1) {
            const [command, param] = parseLine(line);
            try {
                const result = queue[command](parseInt(param, 10));
                process.stdout.write(typeof result === "number" ? result + "\n" : "");
            } catch (e) {
                process.stdout.write(e.message + "\n");
            }
        }
        currentLine++;
    });

function parseLine(line) {
    return line.split(/\s/);
}

function makeQueue(maxSize) {
    const storage = new Array(maxSize).fill(null);

    let _head = 0, _tail = 0, _size = 0;

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
