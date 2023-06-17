const readline = require("readline");
const fs = require("fs");
const path = require("path");
const os = require("os");

let currentLine = 0,
    a = 0,
    m = 0,
    hashes = [],
    output = [];

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt")),
    })
    .on("line", (line) => {
        if (currentLine === 0) {
            a = parseInt(line, 10);
        } else if (currentLine === 1) {
            m = parseInt(line, 10);
        } else if (currentLine === 2) {
            hashes = countHashes(line, a, m);
        } else if (currentLine > 3) {
            const [start, end] = line.split(/\s/).map((s) => parseInt(s, 10));
            output.push(getSubstrHash(start, end, hashes, a, m));
        }
        currentLine++;
    })
    .on("close", () => console.log(output.join(os.EOL)));

function getHash(string, a, m) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = modulo((hash + string.charCodeAt(i)) * (i === string.length - 1 ? 1 : a), m);
    }
    return hash;
}

function countHashes(string, a, m) {
    const hashes = new Array(string.length + 1).fill(0);
    hashes[1] = getHash(string[0], a, m);
    for (let i = 2; i < string.length + 1; i++) {
        hashes[i] = modulo(modulo(hashes[i - 1] * a, m) + string[i - 1].charCodeAt(), m);
    }
    return hashes;
}

// function moduloPow(n, p, m) {
//     let result = modulo(n, m);
//     const nModulo = result;
//     let i = 0;
//     while (i < p - 1) {
//         result = modulo(result * nModulo, m);
//         i++;
//     }
//     return result;
// }

// WTF ??? (https://github.com/fuodorov/yaalgorithms/blob/main/sprint_4/prefix_hash.py)
function moduloPow(x, p, r) {
    let m = x % r;
    let t = 1;
    while (p) {
        if (p % 2) {
            t *= m;
            t %= r;
        }
        m *= m;
        m %= r;
        p = Math.floor(p / 2);
    }
    return t % r;
}

function modulo(n, m) {
    return ((n % m) + m) % m;
}

function getSubstrHash(start, end, hashes, a, m) {
    return modulo(hashes[end] - modulo(hashes[start - 1] * moduloPow(a, end - start + 1, m), m), m);
}
