//Comment it before submitting
// class Node {
//     constructor(value = null, next = null) {
//         this.value = value;
//         this.next = next;
//     }
// }

function solution(node, elem) {
    let idx = 0;
    while (node) {
        if (node.value === elem) {
            return idx;
        }
        node = node.next;
        idx++;
    }
    return -1;
}

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    var idx = solution(node0, "node0");
    // console.log(idx);
    // result is idx === 2
}

// test();
