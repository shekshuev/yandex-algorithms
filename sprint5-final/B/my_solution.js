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

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

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

    const [deleteParent, deleteNode] = findNodeToDelete(node, key);
    if (!deleteNode) {
        return node;
    }
    if (!deleteNode.left && !deleteNode.right) {
        if (deleteParent) {
            if (
                deleteParent.left &&
                deleteParent.left.value === deleteNode.value
            ) {
                deleteParent.left = null;
            } else {
                deleteParent.right = null;
            }
            return node;
        } else {
            return null;
        }
    } else {
        const direction = deleteNode.left
            ? RIGHT_IN_LEFT_TREE
            : LEFT_IN_RIGHT_TREE;
        let [replaceParent, replaceNode] = findNodeToReplace(
            deleteNode.left || deleteNode.right,
            direction,
            deleteNode
        );

        if (direction === LEFT_IN_RIGHT_TREE) {
            replaceParent.left = replaceNode.right;
        } else {
            replaceParent.right = replaceNode.left;
        }
        if (deleteParent) {
            if (
                deleteParent.left &&
                deleteParent.left.value === deleteNode.value
            ) {
                deleteParent.left = replaceNode;
            } else {
                deleteParent.right = replaceNode;
            }
        }
        // if (replaceParent.value !== deleteNode.value) {
        //     replaceNode.left = deleteNode.left;
        //     replaceNode.right = deleteNode.right;
        // }
        if (replaceParent.value === deleteNode.value) {
            if (
                replaceParent.left &&
                replaceParent.left.value === replaceNode.value
            ) {
                replaceNode.right = deleteNode.right;
            } else {
                replaceNode.left = deleteNode.left;
            }
        } else {
            replaceNode.left = deleteNode.left;
            replaceNode.right = deleteNode.right;
        }
        return node.value === deleteNode.value ? replaceNode : node;
    }
}

function test() {
    // 10
    // 1 41 2 3
    // 2 20 4 5
    // 3 65 7 8
    // 4 11 -1 -1
    // 5 29 -1 6
    // 6 32 -1 -1
    // 7 50 -1 -1
    // 8 91 9 10
    // 9 72 -1 -1
    // 10 99 -1 -1
    // 41
    // var node10 = new Node(99, null, null);
    // var node9 = new Node(72, null, null);
    // var node8 = new Node(91, node9, node10);
    // var node7 = new Node(50, null, null);
    // var node6 = new Node(32, null, null);
    // var node5 = new Node(29, null, node6);
    // var node4 = new Node(11, null, null);
    // var node3 = new Node(65, node7, node8);
    // var node2 = new Node(20, node4, node5);
    // var node1 = new Node(41, node2, node3);
    // var newHead = remove(node1, 41);
    // 1 668 2 5
    // 2 298 3 -1
    // 3 191 -1 4
    // 4 266 -1 -1
    // 5 702 6 7
    // 6 701 -1 -1
    // 7 870 8 9
    // 8 822 -1 -1
    // 9 912 -1 10
    // 10 932 -1 -1
    // 545
    // var node10 = new Node(932, null, null);
    // var node9 = new Node(912, null, node10);
    // var node8 = new Node(822, null, null);
    // var node7 = new Node(870, node8, node9);
    // var node6 = new Node(701, null, null);
    // var node5 = new Node(702, node6, node7);
    // var node4 = new Node(266, null, null);
    // var node3 = new Node(191, null, node4);
    // var node2 = new Node(298, node3, null);
    // var node1 = new Node(668, node2, node5);
    // var newHead = remove(node1, 545);
    // 1 31 -1 2
    // 2 624 3 7
    // 3 220 4 5
    // 4 130 -1 -1
    // 5 302 -1 6
    // 6 442 -1 -1
    // 7 858 8 10
    // 8 763 9 -1
    // 9 701 -1 -1
    // 10 867 -1 -1
    // 701
    // var node10 = new Node(867, null, null);
    // var node9 = new Node(701, null, null);
    // var node8 = new Node(763, node9, null);
    // var node7 = new Node(858, node8, node10);
    // var node6 = new Node(442, null, null);
    // var node5 = new Node(302, null, node6);
    // var node4 = new Node(130, null, null);
    // var node3 = new Node(220, node4, node5);
    // var node2 = new Node(624, node3, node7);
    // var node1 = new Node(31, null, node2);
    // var newHead = remove(node1, 701);
    // var node1 = new Node(2, null, null);
    // var node2 = new Node(3, node1, null);
    // var node3 = new Node(1, null, node2);
    // var node4 = new Node(6, null, null);
    // var node5 = new Node(8, node4, null);
    // var node6 = new Node(10, node5, null);
    // var node7 = new Node(5, node3, node6);
    // var newHead = remove(node7, 10);
    // console.assert(newHead.value === 5);
    // console.assert(newHead.right === node5);
    // console.assert(newHead.right.value === 8);
    // 1 4 2 3
    // 2 2 4 5
    // 3 6 6 7
    // 4 1 -1 -1
    // 5 3 -1 -1
    // 6 5 -1 -1
    // 7 7 -1 -1
    // 2
    var node7 = new Node(7, null, null);
    var node6 = new Node(5, null, null);
    var node5 = new Node(3, null, null);
    var node4 = new Node(1, null, null);
    var node3 = new Node(6, node6, node7);
    var node2 = new Node(2, node4, node5);
    var node1 = new Node(4, node2, node3);
    var newHead = remove(node1, 6);
}

test();
