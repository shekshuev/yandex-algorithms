/**
Comment it before submitting
class CNode {  
    constructor(value) {  
        this.value = value;  
        this.left = null;  
        this.right = null;  
    }  
}
*/

function solution(root) {
    const search = (node, max) => {
        if (!node.left && !node.right) {
            return node.value > max ? node.value : max;
        }
        const left = node.left ? search(node.left, max) : Number.MIN_SAFE_INTEGER;
        const right = node.right ? search(node.right, max) : Number.MIN_SAFE_INTEGER;
        const max2 = left > right ? left : right;
        const max3 = max > max2 ? max : max2;
        return node.value > max3 ? node.value : max3;
    };
    return search(root, Number.MIN_SAFE_INTEGER);
}

function test() {
    var node1 = new CNode(1);
    var node2 = new CNode(-5);
    var node3 = new CNode(3);
    node3.left = node1;
    node3.right = node2;
    var node4 = new CNode(2);
    node4.left = node3;
    console.assert(solution(node4) === 3);
}
