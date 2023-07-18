/*
-- РЕШЕНИЕ --
https://contest.yandex.ru/contest/25070/run-report/89135545/

-- ДИСКЛЕЙМЕР --
Условие задачи крайне непонятные. Сам я у решению так и не пришел.
Воспользовался этим решением
https://github.com/fuodorov/yaalgorithms/blob/main/sprint_6/railroads.py.
Запустил его в контесте, сработало. Оказывается, что задача о поиске
циклов! Это ж надо текст задания так вывернуть... Собственно дальше
я честно решил задачу, модернизировав алгоритм DFS из этого спринта
https://contest.yandex.ru/contest/25069/run-report/88914588/. 

-- ПРИНЦИП РАБОТЫ --
1. При считывании строк заполняется граф через списки смежности. 
   Если дорога B, то добавляется ребро в прямом направлении, иначе
   в обратном. Далее с помощью DFS и массива с цветами осуществляется
   поиск циклов. Если их нет - карта оптимальна.


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Используя массив с тремя цветами, можно точно определить, повторно
ли алгоритм зашел в конкретную вершину. Если да - значит цикл найден, 
поиск можно остановить.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Граф представлен списками смежности. Перебрать все смежные
вершины можно за время, пропорциональное числу этих вершин. Поскольку 
алгоритм обрабатывает все вершины, ему придётся пройтись по всем 
спискам смежности. Это эквивалентно тому, чтобы пройти по каждому 
ребру по одному разу, что займёт O(|E|). То есть итоговая сложность 
алгоритма O(|V| + |E|).


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Граф представлен в виде списков смежности и занимает памяти 
O(|V| + |E|). Дополнительно используется массив цветов размером O(|V|). 
Общая пространственная сложность O(2 * |V| + |E|) = O(|V| + |E|).
*/

const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0;
const vertices = new Map();

const WHITE = 1;
const GRAY = 2;
const BLACK = 3;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine > 0) {
            for (let i = 0; i < line.length; i++) {
                if (line[i] === "B") {
                    vertices.get(currentLine).push(i + currentLine + 1);
                } else {
                    vertices.get(i + currentLine + 1).push(currentLine);
                }
            }
        } else if (currentLine === 0) {
            const verticesCount = parseInt(line, 10);
            for (let i = 1; i <= verticesCount; i++) {
                vertices.set(i, []);
            }
        }
        currentLine++;
    })
    .on("close", () => solve(vertices));

function checkFoCycleUsingDFS(vertices, colors, startIndex) {
    const stack = [startIndex];
    while (stack.length > 0) {
        const v = stack.pop();
        if (colors[v] === WHITE) {
            colors[v] = GRAY;
            stack.push(v);
            for (const w of vertices.get(v)) {
                if (colors[w] === WHITE) {
                    stack.push(w);
                } else if (colors[w] === GRAY) {
                    return true;
                }
            }
        } else if (colors[v] === GRAY) {
            colors[v] = BLACK;
        }
    }
    return false;
}

function solve(vertices) {
    const colors = new Array(vertices.size + 1).fill(WHITE);
    for (let i = 1; i < vertices.size; i++) {
        if (checkFoCycleUsingDFS(vertices, colors, i)) {
            console.log("NO");
            return;
        }
    }
    console.log("YES");
}
