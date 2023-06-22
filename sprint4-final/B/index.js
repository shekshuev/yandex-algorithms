/*
-- РЕШЕНИЕ --
https://contest.yandex.ru/contest/24414/run-report/88440223/

-- ПРИНЦИП РАБОТЫ --
Для создания хэш-таблицы используется функция makeHashTable. Количество 
корзин равно 1009 (простое число). Корзины (_storage) реализованы 
в массиве JS. В качестве хэш-функции выбран полиномиальный хэш для строк. 
Ключ преобразуется в строку. Это удобно, так как можно использовать 
в качестве ключей объекты и массивы. Номер корзины вычисляется делением 
по модулю. Коллизии решаются методом цепочек. Вставка данных производится 
в начало списка либо заменой значения, если такое уже есть в корзине. 
Удаление аналогично удалению из связного списка. Для получения элемента 
по ключу сначала вычисляется корзина, затем поиском по связному списку
ищется нужный элемент по ключу.


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Количество корзин - 1009 - простое число. При вычислении номера корзины  
делением по модулю это гарантирует равномерность заполнения хэш-таблицы, 
что, в свою очередь, гарантирует O(1) лучшую сложность для записи 
и чтения и O(n) худшую.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
В соответствии с доказательством корректности, в лучшем случае сложность 
вставки O(1), если корзина пустая (обращение к элементу массива O(1) 
плюс вставка без проверки на наличие соответствующего элемента), 
в худшем - O(n) - если все n элементов находятся в одной корзине. Для
чтения O(1) в лучшем случае, если в корзине 1 элемент и O(n) в худшем,
если все n элементов в одной корзине. Удаление аналогично, если искомый
элемент оказался первым в корзине - O(1), если последним и все n
элементов в одной корзине - O(n).


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Для хранения хэш таблицы используется массив размером k, который содержит
либо голову связного списка, либо null. То есть для хранения необходимо
O(n + k) памяти. Дополнительно результат кэшируется в массив, размер 
которого равен m - количеству входных команд - O(m). Общая
пространственная сложность O(n + m + k);
*/

const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0;
let hashTable = null;
const output = [];

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt")),
    })
    .on("line", line => {
        if (currentLine === 0) {
            hashTable = makeHashTable(parseInt(line, 10));
        } else if (currentLine > 0) {
            const [command, key, value] = parseCommand(line);
            const result = hashTable[command](key, value);
            if (typeof result !== "undefined") {
                output.push(result);
            }
        }
        currentLine++;
    })
    .on("close", () => console.log(output.join("\n")));

function parseCommand(line) {
    const [command, key, value] = line.split(/\s/);
    if (command === "delete") {
        return ["del", +key, +value];
    } else {
        return [command, +key, +value];
    }
}

function makeHashTable() {
    const _HASH_TABLE_SIZE = 1009;
    const _HASH_BASE = 123;
    const _HASH_MODULO = 100003;
    const _NONE = "None";

    const _storage = new Array(_HASH_TABLE_SIZE).fill(null);

    const _getHash = key => {
        let hash = 0;
        const keyString = key.toString();
        for (let i = 0; i < keyString.length; i++) {
            hash = ((hash + keyString.charCodeAt(i)) * (i === keyString.length - 1 ? 1 : _HASH_BASE)) % _HASH_MODULO;
        }
        return hash;
    };

    const _getBucket = hash => {
        return hash % _HASH_TABLE_SIZE;
    };

    const _getBucketByKey = key => {
        return _getBucket(_getHash(key));
    };

    const _createNode = (key, value, next = null) => {
        return {
            key,
            value,
            next,
        };
    };

    const put = (key, value) => {
        const bucket = _getBucketByKey(key);
        if (!_storage[bucket]) {
            _storage[bucket] = _createNode(key, value);
        } else {
            const tmp = _storage[bucket];
            let head = tmp;
            while (head) {
                if (head.key === key) {
                    head.value = value;
                    return;
                }
                head = head.next;
            }
            _storage[bucket] = _createNode(key, value, tmp);
        }
    };

    const get = key => {
        const bucket = _getBucketByKey(key);
        let head = _storage[bucket];
        while (head) {
            if (head.key === key) {
                return head.value;
            }
            head = head.next;
        }
        return _NONE;
    };

    // delete - зарезервировано
    const del = key => {
        const bucket = _getBucketByKey(key);
        let head = _storage[bucket];
        let prev = null;
        while (head) {
            if (head.key === key) {
                if (prev) {
                    prev.next = head.next;
                } else if (head.next) {
                    _storage[bucket] = head.next;
                } else {
                    _storage[bucket] = null;
                }
                return head.value;
            }
            prev = head;
            head = head?.next;
        }
        return _NONE;
    };

    return {
        put,
        get,
        del,
    };
}
