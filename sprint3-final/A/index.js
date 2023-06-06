/*
-- РЕШЕНИЕ --
https://contest.yandex.ru/contest/23815/run-report/88004603/

-- ПРИНЦИП РАБОТЫ --
1. Функция brokenSearch состоит из двух функций binarySearch и 
   searchBrokenIndex.
2. Функция binarySearch - обычный двоичный поиск в отсортированном 
   массиве. Поскольку исходный массив частично отсортирован - 
   состоит из двух отсортированных массивов, то на вход этой функции 
   необходимо передать как раз один из них.
3. Чтобы определить, в каком подмассиве искать, существует функция 
   searchBrokenIndex. Принцип ее работы: аналогично двоичному 
   поиску разбиваем массив, идем в первую половину и смотрим, 
   отсортирована ли она или нет (верхний if). Если да, проверяем, 
   входит ли в границы искомый элемент. Если да, возвращаем границы,
   нет - ищем в другой половине. И аналогично по верхнему условию,
   если первая половина не отсортирована, ищем во второй.


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Алгоритм двоичного поиска работает только на отсортированном массиве.
Нахождение места "поломки" (а по условию она одна) гарантирует получение
отсортированного подмассива, к которому двоичный поиск применим.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
На исходном массиве длинны n два раза запускается двоичный поиск, 
сложность каждого O(log n). Поскольку их два, то общая сложность 
O(log n + log n) = O(log n^2) = O(2 log n). Без учета констант 
итоговая сложность O(log n).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
В памяти содержится массив размера n. Никаких иных выделений памяти
не происходит. Т.о. пространственная сложность  O(n).
*/

function brokenSearch(arr, k) {
    function binarySearch(arr, k, left, right) {
        if (right <= left) {
            return -1;
        }
        const mid = Math.floor((right + left) / 2);
        if (arr[mid] === k) {
            return mid;
        } else if (k < arr[mid]) {
            return binarySearch(arr, k, left, mid);
        } else {
            return binarySearch(arr, k, mid + 1, right);
        }
    }

    function searchBrokenIndex(arr, k, left, right) {
        if (right - left === 1) {
            return [left, right];
        }
        const mid = Math.floor((right + left) / 2);
        if (arr[left] <= arr[mid]) {
            if (k >= arr[left] && k <= arr[mid]) {
                return [left, mid + 1];
            } else {
                return searchBrokenIndex(arr, k, mid, right);
            }
        } else {
            if (k >= arr[mid] && k <= arr[right - 1]) {
                return [mid, right];
            } else {
                return searchBrokenIndex(arr, k, left, mid);
            }
        }
    }

    const [left, right] = searchBrokenIndex(arr, k, 0, arr.length);
    return binarySearch(arr, k, left, right);
}

function test() {
    const arr = [19, 21, 100, 101, 1, 4, 5, 7, 12];
    if (brokenSearch(arr, 5) !== 6) {
        console.error("WA");
    }
}
