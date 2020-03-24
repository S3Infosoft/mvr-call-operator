const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Id: {
    type: Number,
    required: true
  },
  UserID: {
    type: String
  },
  Name: {
    type: String,
    required: true
  },
  RegisteredOn: {
    type: Date,
    required: true
  },
  Status: {
    type: String
  }
});

module.exports = mongoose.model("Users", userSchema);
