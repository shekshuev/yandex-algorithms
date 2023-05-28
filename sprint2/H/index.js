const readline = require("readline");
const fs = require("fs");

readline
  .createInterface({
    input: fs.createReadStream("input.txt"),
  })
  .on("line", line => {
    solve(line);
  });

function solve(line) {
  if (line.length === 0) {
    console.log("True")
  } else {
    const stack = [];
    let error = false;
    const bracketsMap = {
      "}": "{",
      "]": "[",
      ")": "("
    }

    for (const s of line) {
      if ("({[".indexOf(s) >= 0) {
        stack.push(s)
      } else if (stack.slice(-1)?.[0] === bracketsMap[s]) {
        stack.pop()
      } else {
        error = true;
        break;
      }
    }
    console.log(stack.length === 0 && !error ? "True" : "False")
  }
}
