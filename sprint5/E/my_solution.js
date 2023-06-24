/**
Comment it before submitting 
class CNode {  
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
*/

function solution(root) {
    // Your code
    // “ヽ(´▽｀)ノ”
    const search = (root, min, max) => {
        if (root.value >= max || root.value <= min) {
            return false;
        }
        if (!root.left && !root.right) {
            return true;
        }
        const left = root.left ? search(root.left, min, root.value) && root.value > root.left.value : true;
        const right = root.right ? search(root.right, root.value, max) && root.value < root.right.value : true;
        return left && right && root.value < max && root.value > min;
    };
    return search(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}

function test() {
    var node1 = new CNode(1, null, null);
    var node2 = new CNode(4, null, null);
    var node3 = new CNode(3, node1, node2);
    var node4 = new CNode(8, null, null);
    var node5 = new CNode(5, node3, node4);
    console.assert(solution(node5));
    node4.value = 5;
    console.assert(!solution(node5));
}
