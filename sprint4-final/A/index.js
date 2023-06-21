const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    countDocuments = 0,
    index = new Map(),
    results = [];

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt")),
    })
    .on("line", line => {
        if (currentLine === 0) {
            countDocuments = parseInt(line, 10);
        } else if (currentLine > 0 && currentLine <= countDocuments) {
            createIndex(line, currentLine);
        } else if (currentLine > countDocuments + 1) {
            results.push(countRelevance(line, index));
        }
        currentLine++;
    })
    .on("close", solve);

function createIndex(text, textNumber) {
    for (const word of text.split(/\s/)) {
        if (!index.has(word)) {
            const textMap = new Map();
            textMap.set(textNumber, 1);
            index.set(word, textMap);
        } else {
            const textMap = index.get(word);
            if (!textMap.has(textNumber)) {
                textMap.set(textNumber, 1);
            } else {
                textMap.set(textNumber, textMap.get(textNumber) + 1);
            }
        }
    }
}

function countRelevance(searchString, index) {
    const relevance = new Map();
    for (const word of searchString.split(/\s/)) {
        if (index.has(word)) {
            const wordMap = index.get(word);
            for (const textNumber of wordMap.keys()) {
                if (!relevance.has(textNumber)) {
                    relevance.set(textNumber, 1);
                } else {
                    relevance.set(textNumber, relevance.get(textNumber) + 1);
                }
            }
        }
    }
    return relevance;
}

function solve() {
    for (const map of results) {
        console.log(
            Array.from(map, ([key, value]) => ({ key, value }))
                .sort((a, b) => b.value - a.value)
                .map(elem => elem.key)
                .slice(0, 5)
                .join(" ")
        );
    }

    // console.log(index, [...results]);
}
