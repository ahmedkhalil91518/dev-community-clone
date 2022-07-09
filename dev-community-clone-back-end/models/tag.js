const  mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  value: String,
  label: String,
});

module.exports = mongoose.model("Tag", tagSchema);

