function brokenSearch(arr, k) {
    // Your code
    // “ヽ(´▽｀)ノ”
    return (function binarySearch(arr, left = 0, right = arr.length) {
        if (right <= left) {
            return -1;
        }
        const mid = Math.floor((right - left) / 2);
        if (arr[mid] === k) {
            return mid;
        }
        const leftResult = binarySearch(arr, left, mid);
        if (leftResult > -1) {
            return leftResult;
        } else {
            return binarySearch(arr, mid + 1, right);
        }
    })(arr);
}

function test() {
    const arr = [19, 21, 100, 101, 1, 4, 5, 7, 12];
    if (brokenSearch(arr, 5) !== 6) {
        console.error("WA");
    }
}

test();
