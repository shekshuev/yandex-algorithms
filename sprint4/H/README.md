# H. Странное сравнение

Жители Алгосского архипелага придумали новый способ сравнения строк. Две строки считаются равными, если символы одной из них можно заменить на символы другой так, что первая строка станет точной копией второй строки.

При этом необходимо соблюдение двух условий:

-   Порядок вхождения символов должен быть сохранён.
-   Одинаковым символам первой строки должны соответствовать одинаковые символы второй строки. Разным символам —– разные.

Например, если строка s = «abacaba», то ей будет равна строка t = «xhxixhx», так как все вхождения «a» заменены на «x», «b» –— на «h», а «c» –— на «i». Если же первая строка s=«abc», а вторая t=«aaa», то строки уже не будут равны, так как разные буквы первой строки соответствуют одинаковым буквам второй.

## Формат ввода

В первой строке записана строка s, во второй –— строка t. Длины обеих строк не превосходят 10<sup>6</sup>.

Обе строки содержат хотя бы по одному символу и состоят только из маленьких латинских букв.

Строки могут быть разной длины.

## Формат вывода

Выведите «YES», если строки равны (согласно вышеописанным правилам), и «NO» в ином случае.

### Пример 1

<table><tr>
<td>
mxyskaoghi<br>
qodfrgmslc
</td>
<td>
YES<br>
<br>
</td>
</tr></table>

### Пример 2

<table><tr>
<td>
agg<br>
xdd
</td>
<td>
YES<br>
<br>
</td>
</tr></table>

### Пример 3

<table><tr>
<td>
agg<br>
xda
</td>
<td>
NO<br>
<br>
</td>
</tr></table>