const readline = require("readline");
const fs = require("fs");

let currentLine = 0;

const stack = makeStack();

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine > 0) {
            const [command, param] = parseLine(line);
            try {
                const result = stack[command](parseInt(param, 10));
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

function makeStack() {
    const storage = [];

    function pop() {
        if (storage.length === 0) {
            throw new Error("error");
        } else {
            storage.pop();
        }
    }

    function push(elem) {
        storage.push(elem);
    }

    function get_max() {
        if (storage.length === 0) {
            throw new Error("None");
        } else {
            return storage.reduce((acc, curr) => (curr > acc ? curr : acc));
        }
    }

    return { pop, push, get_max };
}
