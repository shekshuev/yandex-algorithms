/*
-- РЕШЕНИЕ --
https://contest.yandex.ru/contest/26133/run-report/89473485/

-- ПРИНЦИП РАБОТЫ --
1. C помощью функции makeTrie создается префиксное дерево,
   содержащее все допустимые слова.
2. Функция search проверяет, возможно ли склеить исходный
   текст с помощью слов из бора. Работает по аналогии с 
   задачей о рюкзаке - в dp элемент равен true, если с 
   этого элемента возможно собрать текст словами, иначе
   false. 


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Символы строки задают путь по префиксному дереву. Если 
путь по существующим рёбрам дерева проложить не удаётся, 
шаблон в текущей стартовой позиции не подходит. Если же 
алгоритм в процессе движения по рёбрам дошёл до одного 
из терминальных узлов, шаблон найден.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
На считывание данных необходимо в среднем O(L + n) времени,
где L - суммарная длина слов во множестве, n - длина текста. 
Формирование префиксного дерева - O(L). Поиск в строке - 
O(n * M), где M — длина самого длинного из искомых шаблонов. 
Итого - O(L + n + n * M).


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
На хранение исходных данных необходимо O(L + n), для хранения 
бора O(M * ∣Σ∣). Также необходимо место для массива dp - O(n). 
Итого - O(L + n + M * ∣Σ∣).
*/
const readline = require("readline");
const fs = require("fs");
const path = require("path");

let patterns = [],
    text = null,
    currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine === 0) {
            text = line;
        } else if (currentLine > 1) {
            patterns.push(line);
        }
        currentLine++;
    })
    .on("close", () => solve(text, patterns));

class Node {
    constructor(value, isTerminate = false) {
        this.value = value;
        this.isTerminate = isTerminate;
        this.children = new Map();
    }
}

function makeTrie(strings) {
    const root = new Node(null);
    for (const string of strings) {
        let current = root;
        for (const letter of string) {
            if (!current.children.has(letter)) {
                current.children.set(letter, new Node(letter));
            }
            current = current.children.get(letter);
        }
        current.isTerminate = true;
    }
    return root;
}

function search(text, trie) {
    let pos = 0;
    const dp = new Array(text.length + 1).fill(false);
    dp[0] = true;
    while (pos < text.length) {
        if (!dp[pos]) {
            pos++;
            continue;
        } else {
            let current = trie;
            let offset = 0;
            let mismatchNotFound = true;
            while (mismatchNotFound && pos + offset < text.length) {
                const symbol = text[pos + offset];
                if (current.children.has(symbol)) {
                    current = current.children.get(symbol);
                    offset++;
                    if (current.isTerminate) {
                        dp[pos + offset] = true;
                    }
                } else {
                    mismatchNotFound = false;
                }
            }
            pos++;
        }
    }
    return dp[dp.length - 1];
}

function solve(text, patterns) {
    const trie = makeTrie(patterns);
    const result = search(text, trie);
    console.log(result ? "YES" : "NO");
}
