const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0;

const lessons = [];

class Lesson {
    constructor(begin, end) {
        this.begin = begin;
        this.end = end;
    }

    compareTo(other) {
        if (this.end === other.end) {
            return this.begin - other.begin;
        }
        return this.end - other.end;
    }
}

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine > 0) {
            const [begin, end] = line.split(/\s/).map(s => parseFloat(s, 10));
            lessons.push(new Lesson(begin, end));
        }
        currentLine++;
    })
    .on("close", () => solve(lessons));

function solve(lessons) {
    let last = 0;
    lessons
        .sort((a, b) => a.compareTo(b))
        .filter((elem, i) => {
            if (i === 0 || elem.begin >= last) {
                last = elem.end;
                return true;
            }
            return false;
        })
        .map((elem, i, arr) => {
            if (i === 0) {
                console.log(arr.length);
            }
            console.log(`${elem.begin} ${elem.end}`);
        });
}
