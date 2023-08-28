const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  expression: String,
  result: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HistoryEntry", historySchema);
