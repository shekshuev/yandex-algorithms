function merge_sort(arr, left, right) {
    if (right - left === 1) {
        return arr;
    }
    const mid = Math.floor((left + right) / 2);
    merge_sort(arr, left, mid);
    merge_sort(arr, mid, right);
    const result = merge(arr, left, mid, right);
    let j = 0;
    for (let i = left; i < right; i++) {
        arr[i] = result[j];
        j++;
    }
}

function merge(arr, left, mid, right) {
    const result = new Array(right - left).fill(null);
    let l = left,
        r = mid,
        k = 0;
    while (l < mid && r < right) {
        if (arr[l] <= arr[r]) {
            result[k] = arr[l];
            l++;
        } else {
            result[k] = arr[r];
            r++;
        }
        k++;
    }
    while (l < mid) {
        result[k] = arr[l];
        l++;
        k++;
    }
    while (r < right) {
        result[k] = arr[r];
        r++;
        k++;
    }
    return result;
}
