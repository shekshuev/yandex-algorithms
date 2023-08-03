/*
-- РЕШЕНИЕ --
https://contest.yandex.ru/contest/25597/run-report/89430432/

-- ПРИНЦИП РАБОТЫ --
Задача похожа на задачу о рюкзаке, только вместо вместимости
рюкзака здесь полусумма исходного массива. Соответственно, 
за основу взял задачу L. Золото лепреконов
https://contest.yandex.ru/contest/25596/problems/L/.
Для оптимизации времени и памяти хранится не вся матрица, 
а только две строки длинны (сумма элементов массива) / 2.


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Метод математической индукции (для полной матрицы dp).
Пусть имеются массив points с n элементов и их суммой sum.

База индукции: 
1. Если длинна массива меньше 2 или если sum / 2 !== 0, 
   то невозможно разделить пополам по сумме элементов.
2. Если сумма равна 0 и первое условие не выполняется, 
   то такое разделение возможно.

Шаг индукции: 
Предположим, что для всех i < n и j < m значение dp[i][j] 
было правильно рассчитано. Необходимо доказать, что значение 
dp[n][m] также будет правильным. 

1. points[i - 1] > j: 
   В этом случае текущий элемент не включается в сумму,
   поскольку он больше суммы j
2. points[i - 1] <= j:
   В этом случае необходимо найти подмножество с суммой j, 
   исключая или включая i-й элемент.
Утверждение справедливо для всех i > 0, j > 0. 

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Для считывания входных данных необходимо O(n) времени.
Изменение значения элемента матрицы происходит за константное
время. Для того, чтобы пройти всю матрицу, необходимо
O(n * halfSum). Итоговая временная сложность O(n * halfSum).


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Для хранения входных данных необходимо O(n) памяти.
Для хранения матрицы необходимо O(n * halfSum) памяти. 
Поскольку данный вариант оптимизирован, вместо halfSum 
константа 2. Итоговая пространственная сложность O(n).
*/
const readline = require("readline");
const fs = require("fs");
const path = require("path");

let currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => {
        if (currentLine++ > 0) {
            solve(line.split(/\s/).map(s => parseInt(s, 10)));
        }
    });

function canDoPartitions(points) {
    const n = points?.length || 0;
    if (n < 2) {
        return false;
    }
    const sum = points?.reduce((acc, curr) => acc + curr, 0);
    if (sum % 2 !== 0) {
        return false;
    }
    const halfSum = sum / 2;
    const dp = Array.from(Array(2), () => new Array(halfSum + 1).fill(false));
    dp[0][0] = dp[1][0] = true;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= halfSum; j++) {
            if (points[i - 1] > j) {
                dp[1][j] = dp[0][j];
            } else {
                dp[1][j] = dp[0][j] || dp[0][j - points[i - 1]];
            }
        }
        let tmp = dp[0];
        dp[0] = dp[1];
        dp[1] = tmp;
    }
    return dp[0][halfSum];
}

function solve(points) {
    console.log(canDoPartitions(points) ? "True" : "False");
}
