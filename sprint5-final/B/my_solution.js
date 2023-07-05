/*
-- РЕШЕНИЕ --
https://contest.yandex.ru/contest/24810/run-report/88842463/

-- ПРИНЦИП РАБОТЫ --
Функция содержит две вложенные функции - для поиска вершины для удаления
во всем дереве и для поиска вершины, которой можно заменить удаляемую.
В зависимости от наличия потомков выбирается либо самая правая вершина
в левом поддереве, либо самая левая в правом.


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Алгоритм реализован в соответствии с описанием. При удалении вершины
порядок в BST не нарушается.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Сложность операций по удалению или вставке вершины O(1). Сложность
поиска - O(H). В худшем случае удаляемая вершина будет самым удаленным 
от корня листом.


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Для хранение дерева используется O(n) памяти, гдн n - количество 
вершин в дереве. В худшем случае, когда удаляемая вершина будет 
самым удаленным от корня листом, стэк заполнится на H. Также в памяти 
хранится константное число переменных. Общая пространственная сложность 
O(n + H).
*/

/**
Comment it before submitting 
class Node { 
    constructor(value, left = null, right = null) { 
        this.value = value; 
        this.left = left; 
        this.right = right; 
    } 
}
**/

function remove(node, key) {
    if (!node) {
        return null;
    }
    const LEFT_IN_RIGHT_TREE = 1;
    const RIGHT_IN_LEFT_TREE = 2;

    const findNodeToDelete = (node, key, parent = null) => {
        if (node.left && node.value > key) {
            return findNodeToDelete(node.left, key, node);
        } else if (node.right && node.value < key) {
            return findNodeToDelete(node.right, key, node);
        } else if (node.value === key) {
            return [parent, node];
        }
        return [null, null];
    };

    const findNodeToReplace = (node, direction, parent = null) => {
        if (!node) {
            return [null, null];
        }
        if (direction === LEFT_IN_RIGHT_TREE) {
            if (!node.left) {
                return [parent, node];
            } else {
                return findNodeToReplace(node.left, direction, node);
            }
        } else {
            if (!node.right) {
                return [parent, node];
            } else {
                return findNodeToReplace(node.right, direction, node);
            }
        }
    };
    // получаем вершину для удаления и ее родителя
    const [deleteParent, deleteNode] = findNodeToDelete(node, key);
    // нет такой вершины
    if (!deleteNode) {
        return node;
    }
    // дерево состоит из одной вершины, нет ни родителей, ни предков, ее и удаляем
    if (!deleteParent && !deleteNode.left && !deleteNode.right) {
        return null;
    }
    // если вершина - лист, то просто удаляем информацию о ней у родителя
    if (!deleteNode.left && !deleteNode.right) {
        if (deleteParent.left && deleteParent.left.value === deleteNode.value) {
            deleteParent.left = null;
        } else {
            deleteParent.right = null;
        }
        return node;
        // далее общий случай
    } else {
        const direction = deleteNode.left
            ? RIGHT_IN_LEFT_TREE
            : LEFT_IN_RIGHT_TREE;
        // получаем вершину для замены и ее родителя
        // если родитель равен null, то вершина для замены replaceNode -
        // это потомок вершины для удаления deleteNode
        const [replaceParent, replaceNode] = findNodeToReplace(
            deleteNode.left || deleteNode.right,
            direction
        );
        // удаляем у текущего родителя сведения о вершине для замены
        if (replaceParent) {
            if (direction === LEFT_IN_RIGHT_TREE) {
                replaceParent.left = replaceNode.right;
            } else {
                replaceParent.right = replaceNode.left;
            }
        }
        // удаляем вершину, которую требуется удалить
        if (deleteNode.left && deleteNode.left.value !== replaceNode.value) {
            replaceNode.left = deleteNode.left;
        }
        if (deleteNode.right && deleteNode.right.value !== replaceNode.value) {
            replaceNode.right = deleteNode.right;
        }
        // если вершина, которую требуется удалить, не корень дерева,
        // то необходимо внести изменения в ее родителя
        if (deleteParent) {
            if (
                deleteParent.left &&
                deleteParent.left.value === deleteNode.value
            ) {
                deleteParent.left = replaceNode;
            } else {
                deleteParent.right = replaceNode;
            }
        } else {
            // частный случай - если удалили корень дерева, нужно вернуть новый корень
            return replaceNode;
        }
        return node;
    }
}

function test() {
    var node1 = new Node(2, null, null);
    var node2 = new Node(3, node1, null);
    var node3 = new Node(1, null, node2);
    var node4 = new Node(6, null, null);
    var node5 = new Node(8, node4, null);
    var node6 = new Node(10, node5, null);
    var node7 = new Node(5, node3, node6);
    var newHead = remove(node7, 10);
    console.assert(newHead.value === 5);
    console.assert(newHead.right === node5);
    console.assert(newHead.right.value === 8);
}
