/*
-- РЕШЕНИЕ --
https://contest.yandex.ru/contest/26133/run-report/89463842/

-- ПРИНЦИП РАБОТЫ --
1. Для распаковки строки используется функция unpack, по принципу 
   похожая на алгоритм проверки скобочной последовательности
   с использованием стека.
2. После распаковки строк происходит поиск максимального префикса,
   сравнивая все строки посимвольно. 


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Алгоритм берет за базовую строку первую в массиве, и посимвольно
сравнивает остальные. При первом несоответствии поиск можно 
остановить. При это учитываются пограничные случаи - если
массив строк пустой или если строка там одна.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
На считывание данных необходимо в среднем O(n * l) времени,
где n - количество строк, l - средняя длина строки. Распаковка
работает за O(n * l). Поиск также работает за O(n * l) в худшем 
случае - если все строки равны и необходимо перебрать все
символы всех строк. Итого - O(n * l).


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
На хранение исходных данных необходимо O(n * l), для хранения 
распакованных строк еще O(n * l). Также отдельно хранится 
базовая строка - O(l). Итого - O(n * l).
*/
const readline = require("readline");
const fs = require("fs");
const path = require("path");

let strings = [],
    currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine > 0) {
            strings.push(line);
        }
        currentLine++;
    })
    .on("close", () => solve(strings));

const BEGIN_LETTER = "a";
const END_LETTER = "z";
const BEGIN_DIGIT = "1";
const END_DIGIT = "9";
const OPEN_BRACKET = "[";
const CLOSE_BRACKET = "]";

function unpack(str) {
    const cache = [];
    const multipliers = [];
    const insertions = [];
    for (const letter of str) {
        if (letter >= BEGIN_LETTER && letter <= END_LETTER) {
            if (multipliers.length === 0) {
                cache.push(letter);
            } else {
                insertions[insertions.length - 1].push(letter);
            }
        } else if (letter >= BEGIN_DIGIT && letter <= END_DIGIT) {
            multipliers.push(+letter);
        } else if (letter === OPEN_BRACKET) {
            insertions.push([]);
        } else if (letter === CLOSE_BRACKET) {
            const insertion = insertions.pop().join("");
            const multiplier = multipliers.pop();
            if (insertions.length === 0) {
                for (let _ = 0; _ < multiplier; _++) {
                    cache.push(insertion);
                }
            } else {
                const tmp = [];
                for (let _ = 0; _ < multiplier; _++) {
                    tmp.push(insertion);
                }
                insertions[insertions.length - 1].push(tmp.join(""));
            }
        }
    }
    return cache.join("");
}

function findMaxCommonPrefix(strings) {
    if (strings.length === 0) {
        return "";
    } else if (strings.length === 1) {
        return unpack(strings[0]);
    } else {
        let prefix = 0;
        const unpacked = strings.map(string => unpack(string));
        const base = unpacked[0];
        while (true) {
            let flag = false;
            for (let i = 1; i < strings.length; i++) {
                const current = unpacked[i];
                if (!current[prefix] || current[prefix] !== base[prefix]) {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                break;
            } else {
                prefix++;
            }
        }
        return base.substring(0, prefix);
    }
}

function solve(strings) {
    console.log(findMaxCommonPrefix(strings));
}
