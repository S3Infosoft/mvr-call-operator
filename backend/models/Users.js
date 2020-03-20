const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  Id: {
    type: Number,
    required: true
  },
  UserID: {
    type: String,
  },
  Name: {
    type: String,
    required: true
  },
  RegisteredOn: {
    type: Date,
    required: true,
  },
  Status: {
    type: String,
    Required: true
  }
})

module.exports = mongoose.model('Users', UsersSchema);