# C. Нелюбимое дело

ася размышляет, что ему можно не делать из того списка дел, который он составил.
Но, кажется, все пункты очень важные! Вася решает загадать число и удалить дело, которое идёт под этим номером. Список дел представлен в виде односвязного списка. Напишите функцию solution, которая принимает на вход голову списка и номер удаляемого дела и возвращает голову обновлённого списка.

**Внимание:** в этой задаче не нужно считывать входные данные. Нужно написать только функцию, которая принимает на вход голову списка и номер удаляемого элемента и возвращает голову обновлённого списка.

Используйте заготовки кода для данной задачи, расположенные по ссылкам:

-   [c++](https://github.com/Yandex-Practicum/algorithms-templates/tree/main/cpp/sprint2/C)
-   [Java](https://github.com/Yandex-Practicum/algorithms-templates/tree/main/java/sprint2/C)
-   [js](https://github.com/Yandex-Practicum/algorithms-templates/tree/main/js/sprint2/C)
-   [python](https://github.com/Yandex-Practicum/algorithms-templates/tree/main/python/sprint2/C)
-   [c#](https://github.com/Yandex-Practicum/algorithms-templates/tree/main/csharp/sprint2/C)
-   [go](https://github.com/Yandex-Practicum/algorithms-templates/tree/main/go/sprint2/C)

**Решение надо отправлять только в виде файла с расширением, которое соответствует вашему языку. Иначе даже корректно написанное решение не пройдет тесты.**

## Формат ввода

В качестве ответа сдайте только код функции, которая печатает элементы списка. Длина списка не превосходит 5000 элементов.
Список не бывает пустым.

Следуйте следующим правилам при отправке решений:

-   Нужно выбирать компилятор Make.
-   Решение нужно отправлять в виде файла с расширением соответствующем вашему языку программирования.
-   Для Java файл должен называться Solution.java, для C# – Solution.cs
-   Для остальных языков программирования это имя использовать нельзя (имя «solution» тоже).
-   Для Go укажите package main.

### JavaScript:

```js
/*
Comment it before submitting
class Node {  
  constructor(value = null, next = null) {  
    this.value = value;  
    this.next = next;  
  }  
}
*/

function solution(node, idx) {
    // Your code
    // ヽ(´▽`)/
}

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    var newHead = solution(node0, 1);
    // result is node0 -> node2 -> node3
}
```

## Формат вывода

Функция должна напечатать элементы списка по одному в строке.
