# J. Сумма четвёрок

У Гоши есть любимое число S. Помогите ему найти все уникальные четвёрки чисел в массиве, которые в сумме дают заданное число S.

## Формат ввода

В первой строке дано общее количество элементов массива n (0 ≤ n ≤ 1000).

Во второй строке дано целое число S.

В третьей строке задан сам массив. Каждое число является целым и не превосходит по модулю 10<sup>9</sup>.

## Формат вывода

В первой строке выведите количество найденных четвёрок чисел.

В последующих строках выведите найденные четвёрки. Числа внутри одной четверки должны быть упорядочены по возрастанию. Между собой четвёрки упорядочены лексикографически.

### Пример 1

<table><tr>
<td>
8<br>
10<br>
2 3 2 4 1 10 3 0<br>
<br>
</td>
<td>
3<br>
0 3 3 4<br>
1 2 3 4<br>
2 2 3 3
</td>
</tr></table>

### Пример 3

<table><tr>
<td>
6<br>
0<br>
1 0 -1 0 2 -2
<br>
</td>
<td>
3<br>
-2 -1 1 2<br>
-2 0 0 2<br>
-1 0 0 1
</td>
</tr></table>

### Пример 2

<table><tr>
<td>
5<br>
4<br>
1 1 1 1 1
</td>
<td>
1<br>
1 1 1 1<br>
<br>
</td>
</tr></table>