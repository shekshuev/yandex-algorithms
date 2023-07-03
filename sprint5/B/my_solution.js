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
    // Your code
    // “ヽ(´▽｀)ノ”
    return (
        (function check(root) {
            if (!root) {
                return 0;
            }
            const leftHeight = check(root.left);
            if (leftHeight === -1) {
                return -1;
            }
            const rightHeight = check(root.right);
            if (rightHeight === -1) {
                return -1;
            }
            if (Math.abs(leftHeight - rightHeight) > 1) {
                return -1;
            }
            return Math.max(leftHeight, rightHeight) + 1;
        })(root) !== -1
    );
}

function test() {
    var node1 = new CNode(1);
    var node2 = new CNode(-5);
    var node3 = new CNode(3);
    node3.left = node1;
    node3.right = node2;
    var node4 = new CNode(10);
    var node5 = new CNode(2);
    node5.left = node3;
    node5.right = node4;
    console.assert(solution(node5));
}
