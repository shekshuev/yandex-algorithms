# B. Удали узел

Дано бинарное дерево поиска, в котором хранятся ключи. Ключи — уникальные целые числа. Найдите вершину с заданным ключом и удалите её из дерева так, чтобы дерево осталось корректным бинарным деревом поиска. Если ключа в дереве нет, то изменять дерево не надо.
На вход вашей функции подаётся корень дерева и ключ, который надо удалить. Функция должна вернуть корень изменённого дерева. Сложность удаления узла должна составлять
O(h), где h — высота дерева.

Создавать новые вершины (вдруг очень захочется) нельзя.

## Формат ввода

Ключи дерева – натуральные числа, не превышающие 10<sup>9</sup>.
В итоговом решении не надо определять свою структуру/свой класс, описывающий вершину дерева.

Используйте заготовки кода для данной задачи, расположенные по ссылкам:

-   [c++](https://github.com/Yandex-Practicum/algorithms-templates/tree/main/cpp/sprint5_final/B)
-   [Java](https://github.com/Yandex-Practicum/algorithms-templates/tree/main/java/sprint5_final/B)
-   [js](https://github.com/Yandex-Practicum/algorithms-templates/tree/main/js/sprint5_final/B)
-   [python](https://github.com/Yandex-Practicum/algorithms-templates/tree/main/python/sprint5_final/B)
-   [c#](https://github.com/Yandex-Practicum/algorithms-templates/tree/main/csharp/sprint5_final/B)
-   [go](https://github.com/Yandex-Practicum/algorithms-templates/tree/main/go/sprint5_final/B)

## Формат вывода

По умолчанию выбран компилятор Make. Решение нужно отправлять в виде файла с расширением, которое соответствует вашему языку программирования. Если вы пишете на Java, имя файла должно быть Solution.java, для C# – Solution.cs. Для остальных языков назовите файл my_solution.ext, заменив ext на необходимое расширение.
