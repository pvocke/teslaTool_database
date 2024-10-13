const mongoose = require("mongoose");

const toolSchema = mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  partNumber: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Tool", toolSchema);
