/*
-- РЕШЕНИЕ --
https://contest.yandex.ru/contest/22781/run-report/87482616/

-- ПРИНЦИП РАБОТЫ --
1. Вместо реализации дека на классе здесь используется функциональный подход,
   реализованный через замыкание. "Замкнутыми" оказались переменные, содержащие 
   состояние дека (указатели _front, _back, размер _size и массив _storage). Это 
   позволило закрыть эти данные от изменения из вне.
2. Поскольку в качестве входных данных на вход подается фактически набор команд для дека, 
   чтобы снизить количество if..else или switch, здесь применяется скобочная нотация 
   для доступа к содержимому объекта дека. Так как входные команды написаны в snake_case, 
   а в мире js принято писать в camelCase, необходима функцию-helper для преобразования 
   команд (snakeCaseToCamelCase).
3. При инициализации дека массив _storage заполняется нулями в соответствии с размером. Указатель
   _front = 0 в начале, поскольку это начало дека, следующий будет 1, 2, и т.д., то есть 
   он увеличивается по модулю размена дека. Указатель _back = 1 в начале, поскольку далее 
   будет 0, max - 1, max - 2 и т.д, он уменьшается. Таким образом реализовано "движение" 
   в разные стороны при добавлении элементов в начало или в конец дека.
4. При возникновении условий, когда в соответствии с заданием необходимо вернуть значение "error"
   (pop на пустой дек или push на заполненный), программа бросает исключение. Можно было возвращать 
   строку, но плюс исключения в том, что оно проходит через все вызванные функции, в которых 
   нет try..catch. То есть если бы были еще некоторые функции посередине, то через них 
   пришлось бы возвращать значение, а тут кинул и забыл.
5. При добавлении элемента изменяется значение указателя (_front +, _back -), и в ячейку по этому 
   указателю записывается значение. При удалении наоборот. Постоянно изменяется размер дека.
6. Входные данные в буфер не записываются, так как они нужны только один раз. Поэтому считываются 
   построчно и применяются считанные команды к деку. Выходные же данные записываются в буфер, так как 
   без него при частом обращении к stdout программа работала медленно.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Стек -- это порядок LIFO, а очередь -- это FIFO. Дек - комбо. Поэтому тут используются два указателя, 
один отвечает за добавление в начало, второй в конец. Соответственно, одно время для записи и чтения
из начала дека и из конца.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Дек построен на массиве, доступ к элементу массива O(1). Никаких дополнительных операций не делается.
Поэтому общая временная сложность O(1).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
В условиях имеется два числа: n - количество команд и m - размер дека.
Размер дека строго ограничен, и в худшем случае он будет содержать m элементов.
Входные данные не сохраняются. 
Выходные данные записываются в буфер. Его объем не превышает m.
Таким образом, пространственная сложность составляет O(n+m).
*/
const readline = require("readline");
const fs = require("fs");

let currentLine = 0;

let deque = null;

const output = [];

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 1) {
            deque = makeDeque(parseInt(line, 10));
        } else if (currentLine > 1) {
            const [command, param] = parseLine(line);
            try {
                const result = deque[snakeCaseToCamelCase(command)](param);
                if (result) {
                    output.push(result);
                }
            } catch (e) {
                output.push(e.message);
            }
        }
        currentLine++;
    })
    .on("close", () => console.log(output.join("\n")));

function parseLine(line) {
    return line.split(/\s/);
}

function snakeCaseToCamelCase(cmd) {
    return {
        push_front: "pushFront",
        push_back: "pushBack",
        pop_front: "popFront",
        pop_back: "popBack",
    }[cmd];
}

function makeDeque(maxSize) {
    const _storage = new Array(maxSize).fill(0);

    let _front = 0,
        _back = 1,
        _size = 0;

    function pushBack(elem) {
        if (_size < maxSize) {
            _back = (_back || maxSize) - 1;
            _storage[_back] = elem;
            _size++;
        } else {
            throw new Error("error");
        }
    }

    function popBack() {
        if (_size === 0) {
            throw new Error("error");
        } else {
            const tmp = _storage[_back];
            _storage[_back] = 0;
            _back = (_back + 1) % maxSize;
            _size--;
            return tmp;
        }
    }

    function pushFront(elem) {
        if (_size < maxSize) {
            _front = (_front + 1) % maxSize;
            _storage[_front] = elem;
            _size++;
        } else {
            throw new Error("error");
        }
    }

    function popFront() {
        if (_size === 0) {
            throw new Error("error");
        } else {
            const tmp = _storage[_front];
            _storage[_front] = 0;
            _front = (_front || maxSize) - 1;
            _size--;
            return tmp;
        }
    }

    return { pushBack, popBack, pushFront, popFront };
}
