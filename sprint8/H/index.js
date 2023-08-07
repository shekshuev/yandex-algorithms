const readline = require("readline");
const fs = require("fs");
const path = require("path");

const input = [];

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => input.push(line))
    .on("close", () => solve(input));

function search(pattern, text) {
    const result = [];
    const s = `${pattern}#${text}`;
    const p = new Array(pattern.length).fill(null);
    p[0] = 0;
    let pPrev = 0;
    for (let i = 1; i < s.length; i++) {
        k = pPrev;
        while (k > 0 && s[k] !== s[i]) {
            k = p[k - 1];
        }
        if (s[k] === s[i]) {
            k += 1;
        }
        if (i < p.length) {
            p[i] = k;
        }
        pPrev = k;
        if (k === p.length) {
            result.push(i - 2 * p.length);
        }
    }
    return result;
}

function solve([text, pattern, replacement]) {
    const positions = search(pattern, text);
    const cache = [];
    let start = 0;
    for (const pos of positions) {
        const part = text.substring(start, pos);
        if (part.length > 0) {
            cache.push(part);
        }
        cache.push(replacement);
        start = pattern.length + pos;
    }
    if (start < text.length) {
        cache.push(text.substring(start, text.length));
    }
    console.log(cache.join(""));
}
