/*
-- РЕШЕНИЕ --
https://contest.yandex.ru/contest/23815/run-report/88045353/

-- ПРИНЦИП РАБОТЫ --
Функция brokenSearch реализует поиск посредством метода двух указателей
поиск в сломанном массиве. На каждой итерации выбирается средний элемент, 
и проверяются левые и правые половины. Сломанная часть отбрасывается путем 
сдвига указателя left или right.


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Алгоритм реализует двоичный поиск без рекурсии. На каждой итерации цикла
отбрасывается половина элементов, которая "поломана" или которая точно
не содержит искомый элемент.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
На исходном массиве длинны n запускается итерационная версия двоичного 
поиска, сложность каждого O(log n). Итоговая сложность также O(log n).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
В памяти содержится массив размера n. Никаких иных выделений памяти
не происходит. Т.о. пространственная сложность  O(n).
*/

function brokenSearch(arr, k) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === k) {
            return mid;
        }
        if (arr[left] <= arr[mid]) {
            if (k >= arr[left] && k < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (k > arr[mid] && k <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

function test() {
    const arr = [19, 21, 100, 101, 1, 4, 5, 7, 12];
    if (brokenSearch(arr, 5) !== 6) {
        console.error("WA");
    }
}
