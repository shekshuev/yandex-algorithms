const readline = require("readline");
const fs = require("fs");

let currentLine = 0;

let queue = makeQueue();

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine > 0) {
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

function makeQueue() {

    let _head = null, _size = 0;

    function get() {
        if (_size === 0) {
            throw new Error("error");
        } else {
            const tmp = _head.value;
            _head = _head.next;
            _size--;
            return tmp;
        }
    }

    function put(value) {
        if (!_head) {
            _head = {
                value,
                next: null
            }
        } else {
            let node = _head;
            while (node.next) {
                node = node.next;
            }
            node.next = {
                value,
                next: null
            }
        }
        _size++;
    }

    function size() {
        return _size;
    }

    return { get, put, size };
}
