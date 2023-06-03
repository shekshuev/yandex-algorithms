// this solution i used as a template
// https://dev.to/cod3pineapple/leetcode-719-find-k-th-smallest-pair-distance-javascript-solution-3lpp
// Binary search + sliding window
// var smallestDistancePair = function(nums, k) {
//     nums.sort((a,b) => a-b);
//     let lo = 0;
//     let hi = nums[nums.length - 1] - nums[0];
//     while (lo < hi) {
//         let mi = lo + Math.floor((hi-lo) / 2);
//         // Sliding window
//         let count = 0, left = 0;
//         for (let right = 1; right < nums.length; ++right) {
//             // Keep moving left pointer until we reach a difference between two pointers that is less than mi
//             while (nums[right] - nums[left] > mi) left++;
//             // Add the amount of pairs in the window to the count
//             count += right - left;
//         }
//         //count = number of pairs with distance <= mi
//         if (count >= k) hi = mi;
//         else lo = mi + 1;
//     }
//     return lo;
// };
const readline = require("readline");
const fs = require("fs");

let idx = null,
    k = 0,
    currentLine = 0;

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        if (currentLine === 1) {
            idx = line.split(/\s/).map(s => parseInt(s, 10));
        } else if (currentLine === 2) {
            k = parseInt(line, 10);
        }
        currentLine++;
    })
    .on("close", () => solve(idx, k));

function solve(idx, k) {
    idx.sort((a, b) => a - b);
    let low = 0,
        high = idx[idx.length - 1] - idx[0];
    function binarySearch(idx, low, high) {
        if (high <= low) {
            return low;
        }
        const mid = low + Math.floor((high - low) / 2);
        let left = 0,
            right = 0,
            count = 0;
        while (++right < idx.length) {
            while (idx[right] - idx[left] > mid) {
                left++;
            }
            count += right - left;
        }
        if (count < k) {
            low = binarySearch(idx, mid + 1, high);
        } else {
            low = binarySearch(idx, low, mid);
        }
        return low;
    }
    console.log(binarySearch(idx, low, high));
}
