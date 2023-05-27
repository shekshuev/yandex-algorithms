const readline = require("readline");
const fs = require("fs");

readline
    .createInterface({
        input: fs.createReadStream("input.txt"),
    })
    .on("line", line => {
        solve(line.split("").map(s => parseInt(s, 10)));
    });

function solve(digits) {
    const keyboard = {
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz",
    };

    function generate(digits, combinations, prefix = "") {
        if (digits.length === 0) {
            combinations.push(prefix);
        } else {
            for (const c of keyboard[digits[0]]) {
                generate(digits.slice(1), combinations, prefix + c);
            }
        }
    }

    const combinations = [];
    generate(digits, combinations);

    console.log(combinations.join(" "));
}
