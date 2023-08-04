const readline = require("readline");
const fs = require("fs");
const path = require("path");

readline
    .createInterface({
        input: fs.createReadStream(path.join(__dirname, "input.txt"))
    })
    .on("line", line => solve(line));

function solve(str) {
    const prefix = new Array(str.length).fill(null);
    prefix[0] = 0;
    for (let i = 1; i < prefix.length; i++) {
        let k = prefix[i - 1];
        while (k > 0 && str[k] !== str[i]) {
            k = prefix[k - 1];
        }
        if (str[k] === str[i]) {
            k += 1;
        }
        prefix[i] = k;
    }
    console.log(prefix.join(" "));
}
