const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send(`Hello baby`);
});
let arr = [];
arr.push("hello");
arr.push("world");
arr.push("chh");
const operatorMap = {
  plus: "+",
  minus: "-",
  multiplication: "*",
};
app.get("/history", (req, res) => {
  arr.forEach((a) => {
    res.write(`${a}\n`);
  });
  res.end();
});

app.listen(5000, () => {
  console.log("Listening on this port");
});
