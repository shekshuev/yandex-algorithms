/*
-- РЕШЕНИЕ --
https://contest.yandex.ru/contest/24810/run-report/88844137/

-- ПРИНЦИП РАБОТЫ --
1. Создан вспомогательный класс Participant для хранения данных
   об участниках соревнования. В нем реализован метод compare для 
   сравнения участников (чем больше баллов -> чем меньше штраф -> 
   имя в лексикографическом порядке).
2. Функций makeMaxHeap создает неубывающую кучу, сравнивая элементы
   по компаратору. 
3. Сортировка реализована посредством вызова функции pop, которая
   возвращает самый приоритетный (максимальный) оставшийся элемент.


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Считаю, что доказательство корректности приведено в описании задания.
Для корректной работы необходимо, чтобы была правильно реализована
функция-компаратор для сравнения элементов.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Здесь реализуются две ключевые операции - построение кучи и ее 
опустошение для сортировки элементов. Сложность построения кучи - 
O(log 1) + O(log 2) +...+ O(log n) = O(n*log n). Извлечение - 
аналогично - O(n*log n). Общая сложность - O(n*log n).


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Для хранение кучи используется массив размера n. Кроме того, для 
сортировки требуется дополнительный массив размера n. Стэк при 
рекурсии будет заполнен в худшем случае на log n (при просеивании).
Итого общая пространственная сложность O(n + n + log n) = O(n).
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
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
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

    static compare(first, second) {
        if (first.points !== second.points) {
            return second.points - first.points;
        }
        if (first.penalty !== second.penalty) {
            return first.penalty - second.penalty;
        }
        return first.name.localeCompare(second.name);
    }

    constructor(name, points, penalty) {
        this.name = name;
        this.points = points;
        this.penalty = penalty;
    }
}

function makeMaxHeap(elements, comparator) {
    const _heap = [null];
    let _size = 0;

    const _siftDown = idx => {
        let left = 2 * idx;
        let right = 2 * idx + 1;
        if (_heap.length - 1 < left) {
            return;
        }
        let max = -1;
        if (
            right <= _heap.length - 1 &&
            comparator(_heap[left], _heap[right]) > 0
        ) {
            max = right;
        } else {
            max = left;
        }
        if (comparator(_heap[idx], _heap[max]) > 0) {
            const tmp = _heap[idx];
            _heap[idx] = _heap[max];
            _heap[max] = tmp;
            _siftDown(max);
        }
    };

    const _siftUp = idx => {
        if (idx > 1) {
            let parentIndex = Math.floor(idx / 2);
            if (comparator(_heap[parentIndex], _heap[idx]) > 0) {
                const tmp = _heap[idx];
                _heap[idx] = _heap[parentIndex];
                _heap[parentIndex] = tmp;
                _siftUp(parentIndex);
            }
        }
    };

    const push = elem => {
        _heap.push(elem);
        _siftUp(_heap.length - 1);
        _size += 1;
    };

    const pop = () => {
        const result = _heap[1];
        _heap[1] = _heap.pop();
        _siftDown(1);
        _size -= 1;
        return result;
    };

    const getSize = () => _size;

    for (const element of elements) {
        push(element);
    }

    return {
        push,
        pop,
        getSize
    };
}

function solve(participants) {
    const heap = makeMaxHeap(participants, Participant.compare);
    const sorted = [];
    while (heap.getSize() > 0) {
        sorted.push(heap.pop());
    }
    console.log(sorted.map(p => p.name).join(os.EOL));
}
