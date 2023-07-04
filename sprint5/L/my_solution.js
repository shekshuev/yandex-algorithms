function siftDown(heap, idx) {
    // Your code
    // “ヽ(´▽｀)ノ”
    let left = 2 * idx;
    let right = 2 * idx + 1;
    if (heap.length < left) {
        return idx;
    }
    let max = -1;
    if (right <= heap.length && heap[left] < heap[right]) {
        max = right;
    } else {
        max = left;
    }
    if (heap[idx] < heap[max]) {
        const tmp = heap[idx];
        heap[idx] = heap[max];
        heap[max] = tmp;
        return siftDown(heap, max);
    }
    return idx;
}

function test() {
    var sample = [-1, 12, 1, 8, 3, 4, 7];
    console.assert(siftDown(sample, 2) == 5);
}
