/*
-- РЕШЕНИЕ --
https://contest.yandex.ru/contest/24414/run-report/88434497/

-- ПРИНЦИП РАБОТЫ --
Для экономии памяти не используются дополнительные буферы. 
В процессе чтения строк из файла сначала создается индекс. Для этого 
инициализируется мапа index, в которой текста слово - это ключ, 
а каждое значение - также мапа с номерами документов по счету в качестве 
ключей и количеством слова (ключа index) в конкретном документе в качестве
значения. Затем, в процессе считывания поисковых строк считается 
релевантность и записывается в массив results. Значение релевантности - 
мапа, где ключ - номер исходного текста и значение - собственно 
релевантность. После считывания данных остается отсортировать результаты 
по релевантности. Для этого каждую мапу в массиве необходимо преобразовать 
в массив объектов, отсортировать в соответствии с заданием и вывести 
первые 5.


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Функции createIndex, countRelevance и printResults реализованы 
в соответствии с заданием. 

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
На входе имеются n текстов и m поисковых запросов. Каждый из них
необходимо считать (это O(n+m)) и соответствующим образом обработать. 
Операции с мапами в среднем обходятся за O(1). И при построении индекса, 
и при подсчете релевантности строка делится на слова по пробельным 
символам. Для этого нужно как минимум пройти всю строку. Поскольку длины 
строк разные, можно обозначить как k1 длину текста и как k2 длину 
поискового запроса. Для построения индекса необходимо пройтись по n 
текстам k1 раз, это O(k1 * n). Для каждого запроса нужно пройтись 
по каждому слову в запросе (количество слов). В худшем случае для каждого 
слова можно найти до n документов, и эти n документов нужно отсортировать 
на каждый запрос, то есть O(m * (k2 * n + n * log n)). Итоговая сложность 
O(k1 * n + m * (k2 * n + n * log n)).


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
В худшем (все слова во всех запросах уникальны или все слова повторяются 
во всех запросах) случае необходимо O(n * k1) памяти, где k1 - количество 
слов в тексте.
*/

const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0,
    countDocuments = 0,
    index = new Map(),
    results = [];

const MAX_SEARCH_RESULT_SIZE = 5;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt")),
    })
    .on("line", (line) => {
        if (currentLine === 0) {
            countDocuments = parseInt(line, 10);
        } else if (currentLine > 0 && currentLine <= countDocuments) {
            createIndex(line, currentLine);
        } else if (currentLine > countDocuments + 1) {
            results.push(countRelevance(line, index));
        }
        currentLine++;
    })
    .on("close", () => printResults(results));

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
    const words = new Set(searchString.split(/\s/));
    for (const word of words) {
        if (index.has(word)) {
            const textMap = index.get(word);
            for (const textNumber of textMap.keys()) {
                relevance.set(textNumber, (relevance.get(textNumber) || 0) + textMap.get(textNumber));
            }
        }
    }
    return relevance;
}

function printResults(results) {
    for (const map of results) {
        console.log(
            Array.from(map, ([key, value]) => ({ key, value }))
                .sort((a, b) => {
                    if (b.value === a.value) {
                        return a.key - b.key;
                    }
                    return b.value - a.value;
                })
                .slice(0, MAX_SEARCH_RESULT_SIZE)
                .map((elem) => elem.key)
                .join(" ")
        );
    }
}
