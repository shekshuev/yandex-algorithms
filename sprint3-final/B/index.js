/*
-- РЕШЕНИЕ --
https://contest.yandex.ru/contest/23815/run-report/88029801/

-- ПРИНЦИП РАБОТЫ --
1. Создан вспомогательный класс Participant для хранения данных
   об участниках соревнования. В нем реализован метод compareTo для 
   сравнения участников (чем больше баллов -> чем меньше штраф -> 
   имя в лексикографическом порядке).
2. Для удобства вынесена функция swap для обмена местами элементов
   массива и функция getPivotValue для получения опорного элемента.
   В текущей реализации в качестве опорного выступает средний элемент.
3. Функция sort работает аналогично описанию в задании. Сначала 
   двигается левый указатель до элемента, не большего опорного, 
   затем правый до элемента, не меньшего опорного. Затем меняются местами
   элементы, на которые указывают указатели. Так до тех пор, пока левый и
   правый указатели не встретятся. После встречи рекурсивно запускается 
   этот же алгоритм на левой и правой части.


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Считаю, что доказательство корректности приведено в описании задания.
Для корректной работы необходимо, чтобы была правильно реализована
функция-компаратор для сравнения элементов.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
На исходном массиве длинны n два раза запускается двоичный поиск, 
сложность каждого O(log n). Однако перед запуском двоичного поиска 
необходимо пройти весь массив, чтобы раскидать элементы относительно
опорного, т.е. сделать n шагов. Итоговая сложность - O(n log n). 
Если опорный элемент будет выбран неудачно, то сложность может 
дойти до O(n^2), если на каждом шаге не будет получаться разбить массив.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
В памяти содержится массив размера n. Никаких иных выделений памяти
не происходит. Т.о. пространственная сложность O(n).
*/
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const os = require("os");

let participants = [],
    totalLines = 0,
    currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt")),
    })
    .on("line", (line) => {
        if (currentLine === 0) {
            totalLines = parseInt(line, 10);
        } else if (currentLine > 0 && currentLine <= totalLines) {
            participants.push(Participant.parse(line));
        }
        currentLine++;
    })
    .on("close", () => solve(participants));

class Participant {
    static parse(line) {
        const [name, points, penalty] = line.split(/\s/);
        return new Participant(name, parseInt(points, 10), parseInt(penalty));
    }

    constructor(name, points, penalty) {
        this.name = name;
        this.points = points;
        this.penalty = penalty;
    }

    compareTo(participant) {
        if (this.name === participant.name) {
            return 0;
        } else {
            if (this.points === participant.points) {
                if (this.penalty === participant.penalty) {
                    return participant.name < this.name ? 1 : -1;
                } else {
                    return participant.penalty < this.penalty ? 1 : -1;
                }
            } else {
                return participant.points < this.points ? -1 : 1;
            }
        }
    }
}

function solve(participants) {
    const getPivotValue = (arr, start, end) => {
        return arr[Math.floor((start + end) / 2)];
    };

    const swap = (arr, i, j) => {
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    };

    const sort = (arr, start, end) => {
        const pivot = getPivotValue(arr, start, end);
        let left = start,
            right = end;
        while (left <= right) {
            while (arr[left].compareTo(pivot) < 0) {
                left++;
            }
            while (arr[right].compareTo(pivot) > 0) {
                right--;
            }
            if (left <= right) {
                swap(arr, left, right);
                left++;
                right--;
            }
        }
        if (start < right) {
            sort(arr, start, right);
        }
        if (end > left) {
            sort(arr, left, end);
        }
    };

    sort(participants, 0, participants.length - 1);

    console.log(participants.map((p) => p.name).join(os.EOL));
}
