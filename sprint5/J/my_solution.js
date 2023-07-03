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

function insert(node, key) {
    // Your code
    // “ヽ(´▽｀)ノ”
    if (key < node.value) {
        if (!node.left) {
            node.left = new Node(key);
        } else {
            insert(node.left, key);
        }
    } else if (key >= node.value) {
        if (!node.right) {
            node.right = new Node(key);
        } else {
            insert(node.right, key)
        }
    }
    return node;
}

function test() {
    var node1 = new Node(7, null, null);
    var node2 = new Node(8, node1, null);
    var node3 = new Node(7, null, node2);
    var newHead = insert(node3, 6);
    console.assert(newHead === node3);
    console.assert(newHead.left.value === 6);
}