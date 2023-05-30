# K. Сортировка слиянием

Гоше дали задание написать красивую сортировку слиянием. Поэтому Гоше обязательно надо реализовать отдельно функцию merge и функцию `merge_sort`.

-   Функция merge принимает два отсортированных массива, сливает их в один отсортированный массив и возвращает его. Если требуемая сигнатура имеет вид merge(array, left, mid, right), то первый массив задаётся полуинтервалом [left,mid)
    массива array, а второй – полуинтервалом [mid,right) массива array.
-   Функция merge_sort принимает некоторый подмассив, который нужно отсортировать. Подмассив задаётся полуинтервалом — его началом и концом. Функция должна отсортировать передаваемый в неё подмассив, она ничего не возвращает.
-   Функция merge_sort разбивает полуинтервал на две половинки и рекурсивно вызывает сортировку отдельно для каждой. Затем два отсортированных массива сливаются в один с помощью merge.

Заметьте, что в функции передаются именно полуинтервалы[begin,end), то есть правый конец не включается. Например, если вызвать merge_sort(arr, 0, 4), где arr=[4,5,3,0,1,2], то будут отсортированы только первые четыре элемента, изменённый массив будет выглядеть как arr=[0,3,4,5,1,2].

Реализуйте эти две функции.

Мы рекомендуем воспользоваться заготовками кода для данной задачи, расположенными по [ссылке](https://disk.yandex.ru/d/ZZUss9NZoyRwwg).

## Формат ввода

Передаваемый в функции массив состоит из целых чисел, не превосходящих по модулю 10<sup>9</sup>
. Длина сортируемого диапазона не превосходит 10<sup>5</sup>.

## Формат вывода

При написании и отправке решений соблюдайте следующие правила:

-   Отправляйте решение в виде файла. Если текст решения будет вставлен в форму, то будет возвращена ошибка.
-   В качестве компилятора выберите Make.
-   На Java назовите файл с решением Solution.java и реализуйте внутри класса указанные функции, для C# – Solution.cs
-   Для остальных решений не используйте в качестве имени файла слово solution
-   Укажите правильное разрешение для файла (.cpp, .java, .go. .js, .py). Для решений на C++ разрешение .h не поддерживается.

Ниже приведены сигнатуры функций, которые необходимо реализовать, для различных языков программирования.

C++

```c++
using Iterator = std::vector<int>::iterator;
using CIterator = std::vector<int>::const_iterator;
std::vector<int> merge(CIterator left_begin, CIterator left_end,
                       CIterator right_begin, CIterator right_end);
void merge_sort(Iterator begin, Iterator end);
```

Java

```java
public class Solution {
        public static int[] merge(int[] arr, int left, int mid, int right);
        public static void merge_sort(int[] arr, int left, int right);
}
```

Python

```python
merge(arr: list, left: int, mid: int, right: int) -> array
merge_sort(arr: list, left: int, right: int) -> None
```

Go

```go
package main
func merge(arr []int, lf int, mid int, rg int) []int
func merge_sort(arr []int, lf int, rg int)
```

JavaScript

```javascript
merge :: (Array arr, Number lf, Number mid, Number rg) -> Array
merge_sort :: (Array arr, Number lf, Number rg) -> void
```
