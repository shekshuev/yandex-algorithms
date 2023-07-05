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
    // Your code
    // “ヽ(´▽｀)ノ”
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
    const [deleteParent, deleteNode] = findNodeToDelete(node, key);

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

    const direction = deleteNode.left ? RIGHT_IN_LEFT_TREE : LEFT_IN_RIGHT_TREE;
    let [replaceParent, replaceNode] = findNodeToReplace(
        deleteNode.left || deleteNode.right,
        direction,
        deleteNode
    );

    if (direction === LEFT_IN_RIGHT_TREE) {
        if (!replaceNode.left && !replaceNode.right) {
            replaceParent.right = null;
        } else {
            replaceParent.right = null;
            replaceParent.left = replaceNode.right;
        }
    } else {
        if (!replaceNode.left && !replaceNode.right) {
            replaceParent.left = null;
        } else {
            replaceParent.left = null;
            replaceParent.right = replaceNode.left;
        }
    }
    if (deleteParent.left?.value === deleteNode.value) {
        deleteParent.left = replaceNode;
    } else {
        deleteParent.right = replaceNode;
    }
    if (replaceParent.value !== deleteNode.value) {
        replaceNode.left = deleteNode.left;
        replaceNode.right = deleteNode.right;
    }

    return node;
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
