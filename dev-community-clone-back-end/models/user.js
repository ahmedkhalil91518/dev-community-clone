const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  passwordHash: String,
  photo: String,
  uid: { type: String, required: true, unique: true },
  provider: String,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
