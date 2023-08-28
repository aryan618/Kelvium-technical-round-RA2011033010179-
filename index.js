const express = require("express");
const HistoryEntry = require("./models/historyy");
const app = express();
const math = require("mathjs");
const connectionDB = require("./db/connect"); // required to connect to the database
require("dotenv").config();
// app.get("/", (req, res) => {
//   res.send(`Hello baby`);
// });
app.enable("strict");
let history = [];
const operators = {
  plus: "+",
  minus: "-",
  into: "*",
  divide: "/",
};
// app.get("/history", (req, res) => {
//   arr.forEach((a) => {
//     res.write(`${a}\n`);
//   });
//   res.end();
// });

app.get("/:expressions*", async (req, res) => {
  const ele1 = req.params.expressions;
  if (ele1 == "history") {
    try {
      const historyEntries = await HistoryEntry.find()
        .sort({ timestamp: -1 })
        .limit(20);
      const formattedHistory = historyEntries.map((entry, index) => {
        return `<p>${index + 1}. Expression: ${entry.expression}, Result: ${
          entry.result
        }</p>`;
      });
      res.send(formattedHistory.join(""));
    } catch (error) {
      res.status(500).send("Error retrieving history");
    }
    return;
  }
  const ele2 = req.params[0];
  const ele = ele1 + ele2;
  console.log(ele);
  const eleArray = ele.split("/");
  if (eleArray.length % 2 == 0) {
    res.status(404).send("Wrong URL cannot perform calculation");
    return;
  }
  let number = Number(eleArray[0]);
  let operator = "+";
  for (let i = 1; i < eleArray.length; i++) {
    const element = eleArray[i];
    if (element in operators) {
      operator = operators[element];
    } else {
      const operand = Number(eleArray[i]);
      if (!isNaN(operand)) {
        number = math.evaluate(`${number} ${operator} ${operand}`);
      } else {
        res.status(404).send("Wrong URL cannot perform calculation");
        return;
      }
    }
  }
  const expression = `${ele1}${eleArray.slice(1).join("")}`;
  try {
    const historyEntry = new HistoryEntry({
      expression: expression,
      result: number,
    });
    await historyEntry.save();

    res.send(`Answer is ${number}`);
  } catch (error) {
    res.status(500).send("Error saving history entry");
  }
});

const PORT = 5000;
const start = async () => {
  try {
    await connectionDB(process.env.MONGO_URI);
    app.listen(
      PORT,
      console.log(
        `Database started and henceforth server is listening on ${PORT}`
      )
    );
  } catch (err) {
    console.log(
      `dabatase connection error: '${err}' hence no use of connecting to the server`
    );
  }
};
start();
