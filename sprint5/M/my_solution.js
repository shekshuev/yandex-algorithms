function siftUp(heap, idx) {
    // Your code
    // “ヽ(´▽｀)ノ”
    if (idx === 1) {
        return idx;
    }
    let parentIndex = Math.floor(idx / 2);
    if (heap[parentIndex] < heap[idx]) {
        const tmp = heap[idx];
        heap[idx] = heap[parentIndex];
        heap[parentIndex] = tmp;
        return siftUp(heap, parentIndex);
    }
    return idx;
}

function test() {
    var sample = [-1, 12, 6, 8, 3, 15, 7];
    console.assert(siftUp(sample, 5) == 1);
}
