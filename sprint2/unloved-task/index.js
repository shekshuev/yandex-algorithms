//Comment it before submitting
// class Node {
//     constructor(value = null, next = null) {
//         this.value = value;
//         this.next = next;
//     }
// }

// function print(node) {
//     while (node) {
//         console.log(node.value);
//         node = node.next;
//     }
// }

function solution(node, idx) {
    if (idx === 0) {
        return node.next;
    } else {
        const head = node;
        while (idx-- > 1) {
            if (node.next) {
                node = node.next;
            } else {
                break;
            }
        }
        if (node.next) {
            node.next = node.next.next;
        }
        return head;
    }
}

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    var newHead = solution(node0, 0);
    // print(newHead);
    // result is node0 -> node2 -> node3
}

// test();
