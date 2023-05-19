const readline = require("readline");
const fs = require("fs");

let currentLine = 0;

let deque = null;

const output = []

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 1) {
            deque = makeDeque(parseInt(line, 10))
        } else if (currentLine > 1) {
            const [command, param] = parseLine(line);
            try {
                const result = deque[snakeCaseToCamelCase(command)](param);
                if (result) {
                    output.push(result)
                }
            } catch (e) {
                output.push(e.message)
            }
        }
        currentLine++;
    })
    .on("close", () => console.log(output.join("\n")))

function parseLine(line) {
    return line.split(/\s/);
}

function snakeCaseToCamelCase(cmd) {
    return {
        "push_front": "pushFront",
        "push_back": "pushBack",
        "pop_front": "popFront",
        "pop_back": "popBack"
    }[cmd];
}

function makeDeque(maxSize) {
    const _storage = new Array(maxSize).fill(0);

    let _front = 0, _back = 1, _size = 0;

    function pushBack(elem) {
        if (_size < maxSize) {
            console.log("back:"_back)
            _back = ((_back || _size) - 1) % maxSize;
            _storage[_back] = elem;
            _size++;
            console.log("[" + _storage.join("\t\t") + "]", _back, _front);
        } else {
            throw new Error("error");
        }
    }

    function popBack() {
        if (_size === 0) {
            throw new Error("error");
        } else {
            const tmp = _storage[_back];
            _storage[_back] = 0;
            _back = (_back + 1) % maxSize;
            _size--;
            console.log("[" + _storage.join("\t\t") + "]", _back, _front);
            return tmp;
        }
    }

    function pushFront(elem) {
        if (_size < maxSize) {
            _front = (_front + 1) % maxSize;
            _storage[_front] = elem;
            _size++;
            console.log("[" + _storage.join("\t\t") + "]", _back, _front);
        } else {
            throw new Error("error");
        }
    }

    function popFront() {
        if (_size === 0) {
            throw new Error("error");
        } else {
            const tmp = _storage[_front];
            _storage[_front] = 0;
            _front = ((_front || _size)  - 1) % maxSize;
            _size--;
            console.log("[" + _storage.join("\t\t") + "]", _back, _front);
            return tmp;
        }
    }

    return { pushBack, popBack, pushFront, popFront };
}
